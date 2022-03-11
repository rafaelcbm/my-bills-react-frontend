/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react';

import {
  Grid, Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment
} from '@mui/material';
import { Search } from '@mui/icons-material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

import api, { handleApiError } from '../api';
import Controls from '../components/forms/controls/Controls';
import Notification from '../components/forms/Notification';
import ConfirmDialog from '../components/forms/ConfirmDialog';
import Popup from '../components/forms/Popup';
import BillForm from './BillForm';
import PageHeader from '../components/PageHeader';
import useTable from '../hooks/useTable';
import { CategoriesContext } from '../Context/CategoriesContext';
import { transformToForm, transformToSend } from '../services/billService';
import { useNotification } from '../hooks/useNotification';
import { useConfirmDialog } from '../hooks/useConfirmDialog';
import useCategories from '../hooks/useCategories';

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    pageContent: {
      margin: theme.spacing(0),
      marginTop: theme.spacing(1),
      padding: theme.spacing(1)
    },
    searchInput: {
      width: '75%'
    },
    newButton: {
      position: 'absolute',
      right: '10px'
    }
  };
});

const headCells = [
  { id: 'id', label: 'Id' },
  { id: 'formattedDate', label: 'Date' },
  { id: 'wallet', label: 'Wallet' },
  { id: 'category', label: 'Category' },
  { id: 'description', label: 'Description' },
  { id: 'value', label: 'Value' },
  { id: 'actions', label: 'Actions' }
];

export default function MonthlyBills() {
  const { categories, setCategories } = useContext(CategoriesContext);
  const { queryCategories } = useCategories();

  const classes = useStyles();

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [records, setRecords] = useState([]);
  // TODO: move to a Context
  const [wallets, setWallets] = useState([]);

  const {
    notify, showSuccessMessage, showWarningMessage, showErrorMessage, closeNotification
  } = useNotification();

  const { confirmDialog, showConfirmDialog, closeConfirmDialog } = useConfirmDialog();

  const onSuccessQueryCategories = (data) => setCategories(data?.data);

  const onErrorQueryCategories = console.log;

  queryCategories(onSuccessQueryCategories, onErrorQueryCategories);

  useEffect(() => {
    getWallets();
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0 && wallets && wallets.length > 0) {
      getBills('2022-03');
    }
  }, [categories, wallets]);

  const getWallets = async () => {
    const walletsResponse = await api.get('/wallets');
    setWallets(
      walletsResponse.data.map((wallet) => ({ id: wallet.id, name: wallet.name }))
    );
  };

  const getBills = async (yearMonth) => {
    try {
      const billsResponse = await api.get(`/bills/month/${yearMonth}`);

      const bills = billsResponse.data.map((bill) => transformToForm(bill, categories, wallets));
      setRecords(bills);
    } catch (error) {
      handleApiError(error);
      showErrorMessage('Error on searching bills.');
    }
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    setPage
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    setPage(0);
    const { target } = e;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') {
          return items;
        }
        return items.filter((i) => i.description.toLowerCase().includes(target.value));
      }
    });
  };

  const addOrEdit = (bill, resetForm) => {
    if (!bill.id) {
      insertBill(bill, resetForm);
    } else {
      updateBill(bill);
    }
  };

  const insertBill = async (bill, resetForm) => {
    try {
      const newBill = transformToSend(bill);

      await api.post('/bills', newBill);

      showSuccessMessage(`Bill ${bill.description} Added Successfully`);

      resetForm();
      setRecordForEdit(null);
      setOpenPopup(false);

      getBills('2022-03');
    } catch (error) {
      handleApiError(error);
      showErrorMessage(`Error on adding Bill ${bill.description}.`);
    }
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const updateBill = (bill) => {
    const newBill = transformToSend(bill);
    console.log('updateBill called with', newBill);
    showWarningMessage(`Update Bill ${bill.description} not implemented.`);
  };

  const onDelete = (bill) => {
    showConfirmDialog(
      'Are you sure to delete this bill?',
      "You can't undo this operation",
      () => { deleteBill(bill); }
    );
  };

  const deleteBill = async (bill) => {
    closeConfirmDialog();

    const deleteBillResponse = await api.delete(`/bills/${bill.id}`);
    await getBills('2022-03');

    showSuccessMessage(`Bill ${bill.description} Deleted Successfully`);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PageHeader
            title="Monthly Bills"
            subTitle="Bills relative to a specific month"
            icon={<AttachMoneyIcon fontSize="large" />}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={1} className={classes.pageContent}>

            <Toolbar>
              <Controls.MuiInput
                label="Search Bills"
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>)
                }}
                onChange={handleSearch}
              />
              <Controls.MuiButton
                text="Add Bill"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </Toolbar>

            <TblContainer>
              <TblHead />
              <TableBody>
                {
              recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.formattedDate}</TableCell>
                  <TableCell>{item.wallet}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.formattedValue}</TableCell>
                  <TableCell>
                    <Controls.MuiActionButton
                      color="primary"
                      onClick={() => { openInPopup(item); }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.MuiActionButton>
                    <Controls.MuiActionButton
                      color="secondary"
                      onClick={() => onDelete(item)}
                    >
                      <CloseIcon fontSize="small" />
                    </Controls.MuiActionButton>
                  </TableCell>
                </TableRow>
              ))
          }
              </TableBody>
            </TblContainer>
            <TblPagination />

          </Paper>
        </Grid>
      </Grid>

      <Popup
        title="Bill Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <BillForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>

      <Notification
        notify={notify}
        closeNotification={closeNotification}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        closeConfirmDialog={closeConfirmDialog}
      />
    </>

  );
}
