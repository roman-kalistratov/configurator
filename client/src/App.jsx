import { Box, Container, Stack, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import Parts from './Components/Parts/Parts';
import ModalContent from './Components/Modal/ModalContent';
import PartContent from './Components/Parts/PartContent/PartContent';
import Summary from './Components/Summary/Summary';

const App = () => {
  const theme = useTheme();

  const partIdnt = useSelector((state) => state.part.selectedPart.idnt);
  const partTitle = useSelector((state) => state.part.selectedPart.title);

  console.log('%c[RENDER] App', 'color: red');

  return (
    <>
      <Container sx={{ p: 2 }}>
        <Stack direction="row" spacing={3}>
          <Box sx={{ flexGrow: 1 }}>
            <Parts />
          </Box>
          <Box
            sx={{
              width: '33.3333%',
              border: `1px solid ${theme.palette.secondary.dark}`,
              p: '2rem',
              position: 'sticky',
              top: 0,
            }}
          >
            <Summary />
          </Box>
        </Stack>
      </Container>

      <ModalContent title={partTitle}>
        <PartContent partIdnt={partIdnt} />
      </ModalContent>
    </>
  );
};

export default App;
