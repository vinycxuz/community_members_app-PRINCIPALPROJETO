import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreatePost = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
});
  return (
    <div>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;