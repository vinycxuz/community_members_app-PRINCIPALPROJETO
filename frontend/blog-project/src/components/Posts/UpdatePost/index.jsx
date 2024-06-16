import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getPost } from '../../../API/posts/postsAPI';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UpdatePost = () => {
  const { id }  = useParams();

  const { data } = useQuery({
    queryKey: ['post-details'],
    queryFn: () => getPost(id),
  });
  console.log(data);

  const postMutation = useMutation({
    mutationKey: ['update-post'],
    mutationFn: ()=> {},
  });
  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      const post = {
        title: values.title,
        description: values.description,
      };

      console.log(post);
      postMutation.mutate(post);
    },
  });

  return (
    <div>
      {data && (
        <div>
          <h2>{data.title}</h2>
          <div>
            <form>
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
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePost;