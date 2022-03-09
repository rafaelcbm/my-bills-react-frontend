import { useState } from 'react';

export function useConfirmDialog() {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const showConfirmDialog = (title, subTitle, onConfirm) => {
    setConfirmDialog({
      isOpen: true,
      title,
      subTitle,
      onConfirm
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
  };

  return {
    confirmDialog, showConfirmDialog, closeConfirmDialog
  };
}
