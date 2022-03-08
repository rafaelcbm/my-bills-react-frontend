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
import { formatCurrency, formatDate } from '../util/format-util';

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
  const {
    categories, getCategories, setCategories
  } = useContext(CategoriesContext);

  const classes = useStyles();

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({ fn: (items) => items });
  const [records, setRecords] = useState([]);
  // TODO: move to a Context
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    getCategories(setCategories);
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

      const bills = billsResponse.data.map((bill) => {
        bill.formattedDate = formatDate(bill.date);
        bill.formattedValue = formatCurrency(bill.value);
        bill.category = categories.find((c) => c.id === bill.categoryId).name;
        bill.wallet = wallets.find((w) => w.id === bill.walletId).name;
        return bill;
      });

      setRecords(bills);
    } catch (error) {
      handleApiError(error);
      setNotify({
        isOpen: true,
        message: 'Error on searching bills.',
        type: 'error'
      });
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
      setConfirmDialog({
        isOpen: true,
        title: 'Are you sure to add this bill?',
        subTitle: "You can't undo this operation",
        onConfirm: () => { insertBill(bill, resetForm); }
      });
    } else {
      updateBill(bill);
    }
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const updateBill = (bill) => {
    console.log('updateBill called with', bill);
  };

  const insertBill = async (bill, resetForm) => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });

    try {
      const newBill = {
        ...bill,
        periodicity: bill.isPeriodic ? {
          type: +bill.type,
          interval: +bill.interval,
          part: +bill.part,
          endPart: +bill.endPart
        } : {}
      };

      await api.post('/bills', newBill);

      setNotify({
        isOpen: true,
        message: `Bill ${bill.description} Added Successfully`,
        type: 'success'
      });

      resetForm();
      setRecordForEdit(null);
      setOpenPopup(false);

      getBills('2022-03');
    } catch (error) {
      handleApiError(error);
      setNotify({
        isOpen: true,
        message: `Error on adding Bill ${bill.description}.`,
        type: 'error'
      });
    }

    // resetForm();
  };

  const onDelete = (bill) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure to delete this bill?',
      subTitle: "You can't undo this operation",
      onConfirm: () => { deleteBill(bill.id); }
    });
  };

  const deleteBill = (id) => {
    console.log('deleteBill id', id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    // employeeService.deleteEmployee(id);
    // setRecords(employeeService.getAllEmployees())
    // setNotify({
    //     isOpen: true,
    //     message: 'Deleted Successfully',
    //     type: 'error'
    // })
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
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>

  );
}
