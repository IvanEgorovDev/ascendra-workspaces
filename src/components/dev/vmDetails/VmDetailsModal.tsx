import { Dialog } from "@mui/material";
import type { VM } from "../../../interfaces";
import VmDetailsBody from "./VmDetailsBody";

interface Props {
  open: boolean;
  onClose: () => void;
  vm: VM | null;
}

const VmDetailsModal = ({ open, onClose, vm }: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    slotProps={{ paper: { variant: "outlined" } }}
  >
    {open && vm && <VmDetailsBody vm={vm} onClose={onClose} />}
  </Dialog>
);

export default VmDetailsModal;
