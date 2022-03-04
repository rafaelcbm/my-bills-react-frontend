import React, { useEffect, useState } from 'react';

import {
  Button, Checkbox, FormControlLabel, Grid, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import api, { handleApiError } from '../api';
import MaterialSelect from '../components/forms/MaterialSelect';

export default function BillsMonth() {
  const [walletOptions, setWalletOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState('');
  const [walletId, setWalletId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isDebt, setIsDebt] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [note, setNote] = useState('');
  const [isPeriodic, setIsPeriodic] = useState(false);
  const [type, setType] = useState(0);
  const [interval, setInterval] = useState(0);
  const [part, setPart] = useState(0);
  const [endPart, setEndPart] = useState(0);

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
      categoriesResponse.data.map((category) => ({ key: category.name, value: category.id }))
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newBill = {
      description,
      date,
      value: +value,
      walletId,
      categoryId,
      isDebt,
      isPaid,
      note,
      periodicity: isPeriodic ? {
        type: +type,
        interval: +interval,
        part: +part,
        endPart: +endPart
      } : {}
    };

    console.log('newBill', newBill);

    addBill(newBill);
  };

  const addBill = async (bill) => {
    try {
      await api.post('/bills', bill);

      alert(`Bill ${bill.description} added.`);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => <TextField fullWidth variant="standard" {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="description"
            name="description"
            label="Description"
            variant="standard"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <MaterialSelect
            id="walletId"
            value={walletId}
            label="Wallets"
            name="walletId"
            onChange={(event) => {
              setWalletId(event.target.value);
            }}
            options={walletOptions}
          />
        </Grid>

        <Grid item xs={6}>
          <MaterialSelect
            id="categoryId"
            value={categoryId}
            label="Categories"
            name="categories"
            onChange={(event) => {
              setCategoryId(event.target.value);
            }}
            options={categoryOptions}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            type="number"
            id="value"
            name="value"
            label="Value"
            variant="standard"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            required
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            type="number"
            id="note"
            name="note"
            label="Note"
            variant="standard"
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
            required
            fullWidth
            multiline
            maxRows={3}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControlLabel
            label="Is Debt"
            control={(
              <Checkbox
                checked={isDebt}
                onChange={(event) => {
                  setIsDebt(event.target.checked);
                }}
              />
          )}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControlLabel
            label="Is Paid"
            control={(
              <Checkbox
                checked={isPaid}
                onChange={(event) => {
                  setIsPaid(event.target.checked);
                }}
              />
          )}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControlLabel
            label="Is Periodic"
            control={(
              <Checkbox
                checked={isPeriodic}
                onChange={(event) => {
                  setIsPeriodic(event.target.checked);
                }}
              />
          )}
          />
        </Grid>

        {isPeriodic && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MaterialSelect
              id="typeId"
              value={type}
              label="Interval Type"
              name="typeId"
              onChange={(event) => {
                setType(event.target.value);
              }}
              options={intervalTypeOptions}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              type="number"
              id="interval"
              name="interval"
              label="Interval"
              variant="standard"
              value={interval}
              onChange={(event) => {
                setInterval(event.target.value);
              }}
              required
              fullWidth
              multiline
              maxRows={3}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              type="number"
              id="part"
              name="part"
              label="Part"
              variant="standard"
              value={part}
              onChange={(event) => {
                setPart(event.target.value);
              }}
              required
              fullWidth
              multiline
              maxRows={3}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              type="number"
              id="endPart"
              name="endPart"
              label="End Part"
              variant="standard"
              value={endPart}
              onChange={(event) => {
                setEndPart(event.target.value);
              }}
              required
              fullWidth
              multiline
              maxRows={3}
            />
          </Grid>
        </Grid>
        ) }

        <Grid item xs={12}>
          <Button type="submit" variant="contained">Add Bill</Button>
        </Grid>
      </Grid>
    </form>
  );
}
