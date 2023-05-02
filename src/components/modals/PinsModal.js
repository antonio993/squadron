import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid
} from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import './pinsModal.scss';

export const PinsModal = ({ open, handleClose, data }) => {
  const firstConnectorId = data[0];
  const secondConnectorId = data[1];
  const fPins = useSelector(state => state.connector.connectorsList.find(connector => connector.id == firstConnectorId).pins);
  const sPins = useSelector(state => state.connector.connectorsList.find(connector => connector.id == secondConnectorId).pins);
  const elementRef = useCallback(node => {
    if (node !== null) {
      // console.log('ref', node); // node = elRef.current
      enableDragList(node);
    }
  }, []);

  const enableDragList = list => {
    Array.prototype.map.call(list.children, item => {
      enableDragItem(item);
    });
  };

  const enableDragItem = item => {
    item.setAttribute('draggable', true);
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
  };

  const handleDrag = item => {
    const selectedItem = item.target,
      list = selectedItem.parentNode,
      x = event.clientX,
      y = event.clientY;

    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

    if (list === swapItem.parentNode) {
      swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(selectedItem, swapItem);
    }
  };

  const handleDrop = item => {
    item.target.classList.remove('drag-sort-active');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Connect the pins (unavailable) - Only reorder is possible
      </DialogTitle>
      <DialogContent sx={{ position: 'relative' }} dividers>
        <Grid container spacing={4} sx={{ width: '100%', height: '100%', ml: 0 }}>
          <Grid item xs={6} sx={{ position: 'relative' }}>
            <ul className="drag-sort-enable" ref={elementRef}>
              {fPins.map(fPin => (
                <li key={fPin.id}>
                  <div className="pin2"></div>{fPin.name}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={6} sx={{ position: 'relative' }}>
            <ul className="drag-sort-enable" ref={elementRef}>
              {sPins.map(sPin => (
                <li key={sPin.id}>
                  <div className="pin2"></div>{sPin.name}
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => handleClose()}
        >Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PinsModal;