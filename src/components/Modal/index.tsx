import { IconButton, Modal, Typography } from "@mui/material";
import { ModalContainer, ModalContent, TitleContent } from "./style";
import CloseIcon from "@mui/icons-material/Close";

interface ICustomModalProps {
  handleClose: () => void;
  open: boolean;
  title: string;
  children: React.ReactNode;
}
export const CustomModal = ({
  handleClose,
  open,
  title,
  children,
}: ICustomModalProps) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <TitleContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </TitleContent>

        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Modal>
  );
};
