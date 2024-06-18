import { React, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { createPost } from '../../../API/posts/postsAPI';

const CreatePost = () => {

  const [description, setDescription] = useState("");

  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPost,
  });
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      const post = {
        description: values.description,
      };

      console.log(post);
      postMutation.mutate(post);
    },
});

  const isLoading = postMutation.isPending;

  const isError = postMutation.isError;

  const isSuceess = postMutation.isSuccess;

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {isSuceess && <div>Post created</div>}
      <form onSubmit={formik.handleSubmit}>
        <ReactQuill
          value={formik.values.description}
          onChange={(value) => {
            setDescription(value)
            formik.setFieldValue("description", value)
          }} 
          />
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;