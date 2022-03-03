import React, { useEffect, useState } from 'react';

import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import TextError from '../components/TextError';
import api, { handleApiError } from '../api';
import Select from '../components/forms/Select';

export default function Bills() {
  const [walletOptions, setWalletOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    loadWallets();
    loadCategories();
  }, []);

  const loadWallets = async () => {
    const walletsResponse = await api.get('/wallets');
    console.log('walletsResponse', walletsResponse);

    setWalletOptions(
      [{ key: 'Select a wallet', value: '' }, ...walletsResponse.data.map((wallet) => ({ key: wallet.name, value: wallet.id }))]
    );
  };

  const intervalTypeOptions = [
    { key: 'Day', value: '0' },
    { key: 'Week', value: '1' },
    { key: 'Month', value: '2' },
    { key: 'Year', value: '3' }
  ];

  const loadCategories = async () => {
    const categoriesResponse = await api.get('/categories');
    console.log('categoriesResponse', categoriesResponse);

    setCategoryOptions(
      [{ key: 'Select a category', value: '' }, ...categoriesResponse.data.map((category) => ({ key: category.name, value: category.id }))]
    );
  };

  const initialValues = {
    description: '',
    date: new Date(),
    value: 0.0,
    walletId: '',
    categoryId: '',
    isDebt: true,
    isPaid: false,
    note: '',
    isPeriodic: false,
    periodicity: {
      type: 2,
      interval: 1,
      part: 1,
      endPart: 2
    }
  };

  const validationSchema = Yup.object({
    description: Yup.string().required('Required'),
    date: Yup.date()
      .required('Required')
      .nullable(),
    value: Yup.number().positive('Value must be greater than 0.').required('Required'),
    walletId: Yup.string().required('Required'),
    categoryId: Yup.string().required('Required'),
    isDebt: Yup.boolean().required('Required'),
    isPaid: Yup.boolean().required('Required'),
    note: Yup.string(),
    periodicity: Yup.object({
      type: Yup.number(),
      interval: Yup.number().positive('Interval must be greater than 0.'),
      part: Yup.number().positive('Part must be greater than 0.'),
      endPart: Yup.number().positive('End Part must be greater than 0.')
    }).nullable(),
  });

  const addBill = async (bill) => {
    try {
      await api.post('/bills', bill);
    } catch (error) {
      handleApiError(error);
    }
  };

  const onSubmit = async (formData, submitProps) => {
    console.log('Form data', formData);
    console.log('submitProps', submitProps);
    await addBill(formData);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // enableReinitialize
    >
      {(formik) => {
        console.log('formik', formik);
        return (
          <Form>

            <div className="form-control">
              <label htmlFor="date">Date</label>
              <Field type="date" id="date" name="date" />
              <ErrorMessage name="date" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="description">Description</label>
              <Field type="text" id="description" name="description" />
              <ErrorMessage name="description" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="value">Value</label>
              <Field type="number" id="value" name="value" />
              <ErrorMessage name="value" component={TextError} />
            </div>

            <Select label="Wallet" name="walletId" options={walletOptions} />

            <Select label="Category" name="categoryId" options={categoryOptions} />

            <div className="form-control">
              <label htmlFor="note">Note</label>
              <Field type="text" id="note" name="note" />
              <ErrorMessage name="note" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="isDebt">Is Debt</label>
              <input
                type="checkbox"
                id="isDebt"
                name="isDebt"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isDebt}
                checked={formik.values.isDebt}
              />
              <ErrorMessage name="isDebt" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="isPaid">Is Paid</label>
              <input
                type="checkbox"
                id="isPaid"
                name="isPaid"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isPaid}
                checked={formik.values.isPaid}
              />
              <ErrorMessage name="isPaid" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="isPeriodic">Is Periodic</label>
              <input
                type="checkbox"
                id="isPeriodic"
                name="isPeriodic"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.isPeriodic}
                checked={formik.values.isPeriodic}
              />
            </div>

            {formik.values.isPeriodic
            && (<Select label="Interval Type" name="periodicity.type" options={intervalTypeOptions} />)}

            {formik.values.isPeriodic
            && (
            <div className="form-control">
              <label htmlFor="interval">Interval</label>
              <Field type="number" id="interval" name="periodicity.interval" />
              <ErrorMessage name="periodicity.interval" component={TextError} />
            </div>
            )}

            {formik.values.isPeriodic
            && (
            <div className="form-control">
              <label htmlFor="part">Part</label>
              <Field type="number" id="part" name="periodicity.part" />
              <ErrorMessage name="periodicity.part" component={TextError} />
            </div>
            )}

            {formik.values.isPeriodic
          && (
          <div className="form-control">
            <label htmlFor="endPart">End Part</label>
            <Field type="number" id="endPart" name="periodicity.endPart" />
            <ErrorMessage name="periodicity.endPart" component={TextError} />
          </div>
          )}

            <button type="reset">Reset</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Add Bill
            </button>

          </Form>
        );
      }}
    </Formik>

  );
}
