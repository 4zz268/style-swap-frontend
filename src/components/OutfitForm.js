	
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const OutfitForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    title: Yup.string().min(3, 'Title must be at least 3 characters').required('Required'),
    description: Yup.string(),
    category: Yup.string().required('Required'),
    image: Yup.mixed().required('Image is required')
  });

  return (
    <Formik
      initialValues={{ title: '', description: '', category: '', image: null }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="p-4 bg-white text-black rounded shadow">
          <div>
            <label>Title</label>
            <Field name="title" className="border p-2 w-full" />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>
          <div>
            <label>Description</label>
            <Field name="description" as="textarea" className="border p-2 w-full" />
          </div>
          <div>
            <label>Category</label>
            <Field name="category" className="border p-2 w-full" />
            <ErrorMessage name="category" component="div" className="text-red-500" />
          </div>
          <div>
            <label>Image</label>
            <input
              type="file"
              name="image"
              onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
              className="border p-2 w-full"
            />
            <ErrorMessage name="image" component="div" className="text-red-500" />
          </div>
          <button type="submit" className="bg-purple-600 text-white p-2 mt-4">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default OutfitForm;