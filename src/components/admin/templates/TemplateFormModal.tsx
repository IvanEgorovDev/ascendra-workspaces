import { useState, type ChangeEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { mono } from "../../../theme";
import useCreateVMTemplate from "../../../hooks/useCreateVMTemplate";
import useUpdateVMTemplate from "../../../hooks/useUpdateVMTemplate";
import type { VMTemplate } from "../../../interfaces";

interface TemplateFormModalProps {
  open: boolean;
  onClose: () => void;
  template?: VMTemplate | null;
}

interface FormState {
  name: string;
  description: string;
  baseImage: string;
  vCpu: string;
  memoryGb: string;
  diskSizeGb: string;
  preinstalledTools: string;
}

const toFormState = (template?: VMTemplate | null): FormState =>
  template
    ? {
        name: template.name,
        description: template.description,
        baseImage: template.baseImage,
        vCpu: String(template.vCpu),
        memoryGb: String(template.memoryGb),
        diskSizeGb: String(template.diskSizeGb),
        preinstalledTools: template.preinstalledTools.join(", "),
      }
    : {
        name: "",
        description: "",
        baseImage: "",
        vCpu: "",
        memoryGb: "",
        diskSizeGb: "",
        preinstalledTools: "",
      };

const fieldLabelProps = {
  variant: "monoLabel" as const,
  component: "label" as const,
  sx: { display: "block", mb: 0.75 },
};

// Mounted only while the dialog is open, so its state always starts fresh
// for the template being created/edited — no reset effect required.
const TemplateFormContent = ({
  onClose,
  template,
}: {
  onClose: () => void;
  template?: VMTemplate | null;
}) => {
  const isEditing = Boolean(template);
  const [form, setForm] = useState<FormState>(() => toFormState(template));

  const createTemplate = useCreateVMTemplate();
  const updateTemplate = useUpdateVMTemplate();
  const mutation = isEditing ? updateTemplate : createTemplate;

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleNumberChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value !== "" && Number(value) < 0) return;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const isValid =
    form.name.trim().length > 0 && form.baseImage.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      baseImage: form.baseImage.trim(),
      vCpu: Math.max(0, Number(form.vCpu) || 0),
      memoryGb: Math.max(0, Number(form.memoryGb) || 0),
      diskSizeGb: Math.max(0, Number(form.diskSizeGb) || 0),
      preinstalledTools: form.preinstalledTools
        .split(",")
        .map((tool) => tool.trim())
        .filter(Boolean),
    };

    if (isEditing && template) {
      updateTemplate.mutate(
        { id: template.id, updates: payload },
        { onSuccess: onClose },
      );
    } else {
      createTemplate.mutate(payload, { onSuccess: onClose });
    }
  };

  return (
    <>
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {isEditing ? template?.name : "New template"}
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "text.secondary",
              mt: -0.5,
              mr: -0.5,
              "&:hover": { color: "primary.main" },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <DialogContent sx={{ px: 3, pb: 1 }}>
        <Stack spacing={2.5}>
          <Box>
            <Typography {...fieldLabelProps}>Name</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. GPU Compute"
              value={form.name}
              onChange={handleChange("name")}
            />
          </Box>

          <Box>
            <Typography {...fieldLabelProps}>Description</Typography>
            <TextField
              fullWidth
              size="small"
              multiline
              minRows={2}
              placeholder="What this profile is best suited for…"
              value={form.description}
              onChange={handleChange("description")}
            />
          </Box>

          <Box>
            <Typography {...fieldLabelProps}>Base image</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. ubuntu-22.04"
              value={form.baseImage}
              onChange={handleChange("baseImage")}
              slotProps={{ htmlInput: { sx: { fontFamily: mono } } }}
            />
          </Box>

          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography {...fieldLabelProps}>vCPU</Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={form.vCpu}
                onChange={handleNumberChange("vCpu")}
                slotProps={{ htmlInput: { min: 0, sx: { fontFamily: mono } } }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography {...fieldLabelProps}>Memory (GB)</Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={form.memoryGb}
                onChange={handleNumberChange("memoryGb")}
                slotProps={{ htmlInput: { min: 0, sx: { fontFamily: mono } } }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography {...fieldLabelProps}>Disk (GB)</Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={form.diskSizeGb}
                onChange={handleNumberChange("diskSizeGb")}
                slotProps={{ htmlInput: { min: 0, sx: { fontFamily: mono } } }}
              />
            </Box>
          </Stack>

          <Box>
            <Typography {...fieldLabelProps}>Preinstalled tools</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="vscode-server, docker, node…"
              helperText="Comma-separated"
              value={form.preinstalledTools}
              onChange={handleChange("preinstalledTools")}
              slotProps={{ htmlInput: { sx: { fontFamily: mono } } }}
            />
          </Box>

          {mutation.isError && (
            <Alert severity="error" variant="outlined">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Something went wrong. Please try again."}
            </Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!isValid || mutation.isPending}
          onClick={handleSubmit}
        >
          {mutation.isPending
            ? "Saving…"
            : isEditing
              ? "Save changes"
              : "Create template"}
        </Button>
      </DialogActions>
    </>
  );
};

const TemplateFormModal = ({
  open,
  onClose,
  template,
}: TemplateFormModalProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    slotProps={{ paper: { variant: "outlined" } }}
  >
    {open && <TemplateFormContent onClose={onClose} template={template} />}
  </Dialog>
);

export default TemplateFormModal;
