import { useQuery } from 'react-query';

import { request } from '../http/api';

const fetchWallets = () => request({ method: 'GET', url: '/wallets' });

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
