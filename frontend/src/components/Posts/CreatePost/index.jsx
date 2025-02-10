import { React, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery, useMutation } from '@tanstack/react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';

import { createPost } from '../../../API/posts/postsAPI';
import AlertMessage from '../../Alert/AlertMessage';
import { getCategory } from '../../../API/categories/categoriesAPI';

const CreatePost = () => {

  const [description, setDescription] = useState("");

  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPost,
  });
  const formik = useFormik({
    initialValues: {
      description: "",
      category: ""
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required")
    }),
    onSubmit: (values) => {
      const post = {
        description: values.description,
        category: values.category,
      };

      console.log(post);
      postMutation.mutate(post);
    },
  });

  const { data } = useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategory,
  });

  console.log(data);

  const isLoading = postMutation.isPending;

  const error = postMutation.isError;

  const isSuccess = postMutation.isSuccess;

  if (isLoading) {
    return <AlertMessage type='loading' message='Loading '/>;
  }
  if (error) {
    return <AlertMessage type='error' message='error' />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Criar novo post
        </h2>
        
        {isSuccess && (
          <AlertMessage type='success' message='Post created successfully' />
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          
          <div className='mb-10'>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => {
                setDescription(value);
                formik.setFieldValue("description", value);
              }}
              className='h-40'
            />
            
            {formik.touched.description && formik.errors.description && (
              <span style={{ color: "red" }}>{formik.errors.description}</span>
            )}
          </div>

          
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Selecione a categoria do post
            </label>
            <Select 
              name='category'
              options={data?.map((category) => {
                return {
                  value: category._id,
                  label: category.categoryName
                }
              })}
              onChange={(option) => {
                return formik.setFieldValue("category", option.value);
              }}
              value={data?.find((option) => option.value === formik.values.category)}
              className='mt-1 block w-full'
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-600">{formik.errors.category}</p>
            )}
          </div>

          {/*
          <div className="flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <div className="flex justify-center items-center w-full">
              <input
                id="images"
                type="file"
                name="image"
                accept="image/*"
                // onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              >
                Choose a file
              </label>
            </div>
            
            {formik.touched.image && formik.errors.image && (
              <p className="text-sm text-red-600">{formik.errors.image}</p>
            )}

            
            {/* {imageError && <p className="text-sm text-red-600">{imageError}</p>} */}

            

            {/* {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full"
                />
                <button
                  onClick={removeImage}
                  className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )}
          </div>
          */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Postar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;