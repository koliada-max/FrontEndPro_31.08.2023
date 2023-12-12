import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Spinner from './Spinner';

const fields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{12}$/, 'Phone must contain only numbers and be 12 characters long')
    .required('Phone is required'),
});

const MyForm = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    
        console.log(values);
        resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}:</label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.name]}
          />
          {formik.touched[field.name] && formik.errors[field.name] ? (
            <div>{formik.errors[field.name]}</div>
          ) : null}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
