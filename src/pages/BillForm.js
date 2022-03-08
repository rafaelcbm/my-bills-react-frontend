import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import api, { handleApiError } from '../api';
import { useForm, Form } from '../hooks/useForm';
import Controls from '../components/forms/controls/Controls';

const intervalTypeOptions = [
  { key: 'Day', value: '0' },
  { key: 'Week', value: '1' },
  { key: 'Month', value: '2' },
  { key: 'Year', value: '3' }
];

const initialFormValues = {
  description: '',
  date: new Date(),
  value: 0,
  walletId: '',
  categoryId: '',
  isDebt: true,
  isPaid: false,
  note: '',
  isPeriodic: false,
  type: 0,
  interval: 0,
  part: 0,
  endPart: 0
};

export default function BillForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const [walletOptions, setWalletOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ('description' in fieldValues) {
      temp.description = fieldValues.description ? '' : 'This field is required.';
    }
    if ('date' in fieldValues) {
      temp.date = fieldValues.date ? '' : 'This field is required.';
    }
    if ('value' in fieldValues) {
      temp.value = fieldValues.value ? '' : 'This field is required.';
    }
    if ('walletId' in fieldValues) {
      temp.walletId = fieldValues.walletId ? '' : 'This field is required.';
    }
    if ('categoryId' in fieldValues) {
      temp.categoryId = fieldValues.categoryId ? '' : 'This field is required.';
    }
    setErrors({
      ...temp
    });

    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
    return undefined;
  };

  const {
    values, setValues, errors, setErrors, handleInputChange, resetForm
  } = useForm(initialFormValues, validate, true);

  useEffect(() => {
    loadWallets();
    loadCategories();
  }, []);

  const loadWallets = async () => {
    const walletsResponse = await api.get('/wallets');
    console.log('walletsResponse', walletsResponse);

    setWalletOptions(
      walletsResponse.data.map((wallet) => ({ key: wallet.name, value: wallet.id }))
    );
  };

  const loadCategories = async () => {
    const categoriesResponse = await api.get('/categories');
    console.log('categoriesResponse', categoriesResponse);

    setCategoryOptions(
      categoriesResponse.data.map((category) => ({ key: category.name, value: category.id }))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null) {
      console.log('recordForEdit', recordForEdit);
      setValues({
        ...recordForEdit
      });
    }
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.MuiDatePicker
            name="date"
            label="Date"
            value={values.date}
            onChange={handleInputChange}
            error={errors.date}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.MuiInput
            name="description"
            label="Description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.MuiSelect
            name="walletId"
            label="Wallets"
            value={values.walletId}
            onChange={handleInputChange}
            options={walletOptions}
            error={errors.walletId}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.MuiSelect
            name="categoryId"
            label="Categories"
            value={values.categoryId}
            onChange={handleInputChange}
            options={categoryOptions}
            error={errors.categoryId}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.MuiInput
            name="value"
            label="Value"
            value={values.value}
            onChange={handleInputChange}
            error={errors.value}
          />
        </Grid>

        <Grid item xs={2}>
          <Controls.MuiCheckbox
            name="isDebt"
            label="Is Debt"
            value={values.isDebt}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={2}>
          <Controls.MuiCheckbox
            name="isPaid"
            label="Is Paid"
            value={values.isPaid}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Controls.MuiCheckbox
            name="isPeriodic"
            label="Is Periodic"
            value={values.isPeriodic}
            onChange={handleInputChange}
          />
        </Grid>

        {values.isPeriodic && (
          <Grid container>

            <Grid item xs={3}>
              <Controls.MuiSelect
                name="type"
                label="Interval Type"
                value={values.type}
                onChange={handleInputChange}
                options={intervalTypeOptions}
                error={errors.type}
              />
            </Grid>

            <Grid item xs={3}>
              <Controls.MuiInput
                name="interval"
                label="Interval"
                value={values.interval}
                onChange={handleInputChange}
                error={errors.interval}
              />
            </Grid>

            <Grid item xs={3}>
              <Controls.MuiInput
                name="part"
                label="Part"
                value={values.part}
                onChange={handleInputChange}
                error={errors.part}
              />
            </Grid>

            <Grid item xs={3}>
              <Controls.MuiInput
                name="endPart"
                label="End Part"
                value={values.endPart}
                onChange={handleInputChange}
                error={errors.endPart}
              />
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <div>
            <Controls.MuiButton
              type="submit"
              text="Save Bill"
            />
            <Controls.MuiButton
              text="Reset"
              variant="outlined"
              onClick={resetForm}
            />
          </div>
        </Grid>

      </Grid>
    </Form>

  );
}
