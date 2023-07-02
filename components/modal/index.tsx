import { Modal } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import Photo from '../frame';

export default function AppModal({ photo }: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Photo photo={photo} />
  </Modal>
  );
  }


