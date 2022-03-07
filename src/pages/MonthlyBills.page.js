import React, { useEffect, useState } from 'react';

import { Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

import api, { handleApiError } from '../api';
import Controls from '../components/forms/controls/Controls';
import Notification from '../components/forms/Notification';
import ConfirmDialog from '../components/forms/ConfirmDialog';
import Popup from '../components/forms/Popup';
import BillForm from './BillForm';
import PageHeader from '../components/PageHeader';

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

export default function MonthlyBills() {
  const classes = useStyles();

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [openPopup, setOpenPopup] = useState(false);

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

    // TODO: when list component...
    // setRecords(employeeService.getAllEmployees());
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
            <Controls.MuiButton
              text="Add Bill"
              variant="outlined"
              startIcon={<AddIcon />}
              // className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />

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
