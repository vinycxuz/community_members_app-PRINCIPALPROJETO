import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getPost, updatePost } from '../../../API/posts/postsAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UpdatePost = () => {
  const { id }  = useParams();

  const { data } = useQuery({
    queryKey: ['post-details'],
    queryFn: () => getPost(id),
  });

  const postMutation = useMutation({
    mutationKey: ['update-post'],
    mutationFn: updatePost,
  });
  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      description: data?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      const post = {
        title: values.title,
        description: values.description,
        id,
      };

      console.log(post?.id);
      postMutation.mutate(post);
    },
  });

  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;

  return (
    <div>
      {data && (
        <div>
          <h2>{data.title}</h2>
          <div>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error...</div>}
            {isSuccess && <div>Post updated</div>}
            <form onSubmit={formik.handleSubmit}>
              <input 
                type='text' 
                name='title'
                {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div>{formik.errors.title}</div>
                ) : null}
                <input
                  type='text'
                  name='description'
                  {...formik.getFieldProps('description')}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePost;