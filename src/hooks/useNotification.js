import { useState } from 'react';

export function useNotification() {
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  const showSuccessMessage = (message) => {
    setNotify({
      isOpen: true,
      message,
      type: 'success'
    });
  };

  const showWarningMessage = (message) => {
    setNotify({
      isOpen: true,
      message,
      type: 'warning'
    });
  };

  const showErrorMessage = (message) => {
    setNotify({
      isOpen: true,
      message,
      type: 'error'
    });
  };

  const closeNotification = () => {
    setNotify({
      ...notify,
      isOpen: false
    });
  };

  return {
    notify, showSuccessMessage, showWarningMessage, showErrorMessage, closeNotification
  };
}
