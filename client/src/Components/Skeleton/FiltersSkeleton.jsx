import { Box, Skeleton, Stack } from '@mui/material';
import { FiltersContainer, StyledAppBar } from './style';

const FiltersSkeleton = () => {
  return (
    <Stack direction='row' spacing={3}>
      <FiltersContainer overflowy='hidden'>
        {Array.from({ length: 7 }).map((_, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Skeleton variant='rectangular' height={35} />
            {Array.from({ length: 3 }).map((__, i) => (
              <Skeleton
                key={i}
                variant='text'
                width={'95%'}
                height={40}
                sx={{ m: 'auto', borderRadius: 1 }}
              />
            ))}
          </Box>
        ))}
      </FiltersContainer>

      <Box
        sx={{
          flexGrow: 1,
          height: 'calc(95vh - 144px)',
          border: (theme) => `1px solid ${theme.palette.secondary.dark}`,
          overflowY: 'hidden',
        }}
      >
        <StyledAppBar position='sticky' sx={{ p: 2 }}>
          <Stack spacing={2} direction={'row'}>
            <Skeleton
              variant='rectangular'
              height={40}
              width='90%'
              sx={{ mb: 2 }}
            />
            <Skeleton variant='rectangular' height={40} width='10%' />
          </Stack>
        </StyledAppBar>

        <Box sx={{ p: 2 }}>
          {Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant='rectangular'
              height={80}
              sx={{ mb: 2, borderRadius: 1 }}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default FiltersSkeleton;
