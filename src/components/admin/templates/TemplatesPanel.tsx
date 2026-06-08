import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import useAllVmTemplates from "../../../hooks/useAllVMTemplates";
import TemplateCard from "./TemplateCard";
import TemplateCardSkeleton from "./TemplateCardSkeleton";
import TemplateFormModal from "./TemplateFormModal";
import type { VMTemplate } from "../../../interfaces";

const TemplatesPanel = () => {
  const { data: templates = [], isLoading, isError } = useAllVmTemplates();
  const [editingTemplate, setEditingTemplate] = useState<VMTemplate | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const openCreateModal = () => {
    setEditingTemplate(null);
    setModalOpen(true);
  };

  const openEditModal = (template: VMTemplate) => {
    setEditingTemplate(template);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <Stack spacing={2.5}>
      <Stack
        direction="row"
        useFlexGap
        spacing={1.5}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {isLoading
            ? "Loading templates…"
            : `${templates.length} templates available`}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddRoundedIcon fontSize="small" />}
          onClick={openCreateModal}
          sx={{
            borderColor: "divider",
            color: "text.primary",
            "&:hover": { borderColor: "primary.main", color: "primary.main" },
          }}
        >
          New template
        </Button>
      </Stack>

      {isError ? (
        <Stack
          spacing={1}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "background.paper",
            minHeight: 160,
            color: "error.main",
          }}
        >
          <Typography variant="body2">Failed to load templates</Typography>
        </Stack>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            },
          }}
        >
          {isLoading ? (
            Array.from({ length: 3 }, (_, i) => (
              <TemplateCardSkeleton key={i} />
            ))
          ) : (
            <>
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onEdit={openEditModal}
                />
              ))}

              {templates.length === 0 && (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  No templates available yet
                </Typography>
              )}
            </>
          )}
        </Box>
      )}

      <TemplateFormModal
        open={modalOpen}
        onClose={closeModal}
        template={editingTemplate}
      />
    </Stack>
  );
};

export default TemplatesPanel;
