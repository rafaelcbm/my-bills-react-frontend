import { useQuery } from 'react-query';

import api from '../api';

const fetchWallets = () => api.get('/wallets');

export default function useWallets() {
  const queryWallets = (onSuccess, onError) => useQuery('wallets', fetchWallets, {
    refetchOnWindowFocus: false,
    onSuccess,
    onError
  });

  return {
    queryWallets
  };
}
