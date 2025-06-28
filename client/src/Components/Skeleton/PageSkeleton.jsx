import { useEffect, useState } from 'react';
import { Box, Container, Stack, Skeleton, useTheme } from '@mui/material';

const PageSkeleton = () => {
  const theme = useTheme();
  const [skeletonCount, setSkeletonCount] = useState(10); // по умолчанию

  useEffect(() => {
    const calculateSkeletonCount = () => {
      const screenHeight = window.innerHeight;
      const blockHeight = 100; // 100px + mb: 2 (≈16px)
      const count = Math.floor(screenHeight / blockHeight);
      setSkeletonCount(count);
    };

    calculateSkeletonCount();

    window.addEventListener('resize', calculateSkeletonCount);
    return () => window.removeEventListener('resize', calculateSkeletonCount);
  }, []);

  return (
    <Container
      sx={{
        position: 'fixed',
        zIndex: 9999,
        p: 4,
        minHeight: '100vh',
        height: '100dvh',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        sx={{ width: '100%', flexGrow: 1, alignItems: 'center' }}
        alignItems="flex-start"
      >
        {/* Левая часть - список скелетонов */}
        <Box sx={{ flexGrow: 1 }}>
          <Box>
            {[...Array(skeletonCount)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={80}
                sx={{
                  mb: 2,
                  border: `1px solid ${theme.palette.secondary.dark}`,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Правая часть - сводка */}
        <Box
          sx={{
            width: '33.3333%',
            border: `1px solid ${theme.palette.secondary.dark}`,
            alignSelf: 'flex-start',
            p: '2rem',
          }}
        >
          <Box>
            <Skeleton variant="rectangular" height={350} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={70} />

            <Stack direction="row" spacing={1} mt={0}>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={180} width="33.3333%" />
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default PageSkeleton;
