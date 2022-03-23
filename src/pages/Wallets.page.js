import React, { useContext } from 'react';

import { Button, Grid, TextField } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import PageHeader from '../components/PageHeader';
import { WalletsContext } from '../Context/WalletsContext';
import Wallet from '../components/Wallet';
import useWallets from '../hooks/useWallets';

export function Wallets() {
  const { wallets, setWallets } = useContext(WalletsContext);

  const { addWallet, queryWallets } = useWallets();

  const onSuccessQueryWallets = (data) => setWallets(data?.data);

  const onErrorQueryWallets = console.log;

  const {
    isLoading, data, isError, error, refetch
  } = queryWallets(onSuccessQueryWallets, onErrorQueryWallets);

  const schema = yup.object().shape({
    name: yup.string().required()
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), });

  const onSubmit = (frmData) => {
    addWallet(frmData.name);
    reset();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader
          title="Wallets"
          subTitle="Wallets CRUD"
          icon={<AttachMoneyIcon fontSize="large" />}
        />
      </Grid>

      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <ul>
              {wallets.map((wallet) => (
                <Wallet
                  key={wallet.id}
                  wallet={wallet}
                />
              ))}
            </ul>
          </div>

          <div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name?.message : ''}
                  fullWidth
                  margin="dense"
                />
              )}
            />
          </div>

          <Button
            variant="outlined"
            size="large"
            color="primary"
            type="submit"
          >
            Add
          </Button>
        </form>
      </Grid>

    </Grid>

  );
}

export default Wallets;
