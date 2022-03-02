import React, { useContext } from 'react';

import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../Context/AuthContext';
import TextError from '../components/TextError';

export default function Login() {
  const { handleLogin } = useContext(AuthContext);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string().required('Required')
  });

  const onSubmit = (formData) => {
    handleLogin(formData.email, formData.password);
  };

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="text" id="email" name="email" />
            <ErrorMessage name="email" component={TextError} />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component={TextError} />
          </div>
          <button type="reset">Reset</button>
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Submit
          </button>

        </Form>
      )}
    </Formik>

  );
}
