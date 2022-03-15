import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  HTTP_DELETE, HTTP_POST, HTTP_PUT, request
} from '../http/api';
import { QUERY_WALLETS } from '../http/query-names';
import { RESOURCE_WALLETS } from '../http/resources-names';

const getWalletsRequest = () => request({ url: RESOURCE_WALLETS, method: 'GET' });

const addWalletRequest = (name) => request({
  url: RESOURCE_WALLETS,
  method: HTTP_POST,
  data: { name }
});

const updateWalletRequest = ({ walletName, walletId }) => request({
  url: `${RESOURCE_WALLETS}/${walletId}`,
  method: HTTP_PUT,
  data: { name: walletName }
});

const deleteWalletRequest = (walletId) => request({
  url: `${RESOURCE_WALLETS}/${walletId}`,
  method: HTTP_DELETE
});

export default function useWallets() {
  const queryWallets = (onSuccess, onError) => useQuery(QUERY_WALLETS, getWalletsRequest, {
    refetchOnWindowFocus: false,
    onSuccess,
    onError
  });

  const queryClient = useQueryClient();

  const addWalletMutation = useMutation(addWalletRequest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_WALLETS);
    }
  });

  const addWallet = (newWalletName) => addWalletMutation.mutate(newWalletName);

  const updateWalletMutation = useMutation(updateWalletRequest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_WALLETS);
    }
  });

  const updateWallet = (walletName, walletId) => updateWalletMutation.mutate(
    { walletName, walletId }
  );

  const deleteWalletMutation = useMutation(deleteWalletRequest, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(QUERY_WALLETS);
    }
  });

  const deleteWallet = (walletId) => deleteWalletMutation.mutate(walletId);

  return {
    addWallet, updateWallet, deleteWallet, queryWallets
  };
}
