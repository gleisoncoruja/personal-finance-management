import { Button, Typography } from "@mui/material";
import { CustomModal } from "..";
import { ConfirmButtonContent } from "../style";

interface IConfirmDeleteModalProps {
  handleClose: () => void;
  open: boolean;
  handleConfirm: () => void;
}
export const ConfirmDeleteModal = ({
  handleClose,
  open,
  handleConfirm,
}: IConfirmDeleteModalProps) => {
  const confirm = () => {
    handleConfirm();
    handleClose();
  };
  return (
    <CustomModal handleClose={handleClose} open={open} title="Confirmação">
      <Typography>Deseja mesmo apagar?</Typography>
      <ConfirmButtonContent>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button fullWidth variant="contained" color="error" onClick={confirm}>
          Confirmar
        </Button>
      </ConfirmButtonContent>
    </CustomModal>
  );
};
