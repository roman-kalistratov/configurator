import { Grid, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LaunchIcon from '@mui/icons-material/Launch';
import { styled } from '@mui/material/styles';

export const GridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.secondary.dark}`,
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  borderRadius: 0,
}));

export const ResponsiveLinkIcon = styled(LinkIcon)(({ theme }) => ({
  fontSize: 24,
  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}));

export const ResponsiveLaunchIcon = styled(LaunchIcon)(({ theme }) => ({
  fontSize: 24,
  [theme.breakpoints.down('sm')]: {
    fontSize: 18,
  },
}));
