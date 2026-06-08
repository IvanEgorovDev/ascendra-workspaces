import { Box, Button, Stack, Typography } from "@mui/material";
import { mono } from "../../../theme";
import type { VMTemplate } from "../../../interfaces";

const SpecChip = ({ label }: { label: string }) => (
  <Box
    sx={{
      border: 1,
      borderColor: "divider",
      borderRadius: 0.5,
      px: 1,
      py: 0.375,
      fontFamily: mono,
      fontSize: "0.75rem",
      color: "text.secondary",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </Box>
);

interface TemplateCardProps {
  template: VMTemplate;
  onEdit?: (template: VMTemplate) => void;
}

const TemplateCard = ({ template, onEdit }: TemplateCardProps) => (
  <Stack
    spacing={2}
    sx={{
      border: 1,
      borderColor: "divider",
      borderRadius: 1,
      bgcolor: "background.paper",
      p: 2.5,
    }}
  >
    <Stack spacing={0.5}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "baseline" }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {template.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: mono, color: "text.secondary" }}
        >
          {template.baseImage}
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {template.description}
      </Typography>
    </Stack>

    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
      <SpecChip label={`${template.vCpu} vCPU`} />
      <SpecChip label={`${template.memoryGb} GB RAM`} />
      <SpecChip label={`${template.diskSizeGb} GB disk`} />
    </Stack>

    <Stack spacing={0.75}>
      <Typography
        variant="caption"
        sx={{
          fontFamily: mono,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        Preinstalled
      </Typography>
      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
        {template.preinstalledTools.map((tool) => (
          <Typography
            key={tool}
            variant="caption"
            sx={{
              fontFamily: mono,
              color: "primary.main",
              bgcolor: "rgba(255,180,84,0.08)",
              borderRadius: 0.5,
              px: 1,
              py: 0.25,
            }}
          >
            {tool}
          </Typography>
        ))}
      </Stack>
    </Stack>

    <Button
      size="small"
      onClick={() => onEdit?.(template)}
      sx={{
        alignSelf: "flex-start",
        color: "text.secondary",
        "&:hover": { color: "primary.main" },
      }}
    >
      Edit template
    </Button>
  </Stack>
);

export default TemplateCard;
