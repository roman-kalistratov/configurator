import { useTheme } from '@emotion/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';
import { memo } from 'react';

const FilterAccordion = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Accordion
      sx={{
        boxShadow: 'none',
        margin: '0 !important',
      }}
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          borderBottom: `1px solid ${theme.palette.secondary.dark}`,
        }}
      >
        <Typography variant="h2">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: '8px 20px',
        }}
      >
        <Stack>{children}</Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(FilterAccordion);
