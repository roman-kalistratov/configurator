import { Box, Skeleton } from '@mui/material';

const UpgradesSkeleteon = () => {
  // Кол-во скелетонов для имитации загрузки списка
  const count = 5;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[...Array(count)].map((_, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 1,
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 1,
            backgroundColor: 'background.paper',
          }}
        >
          {/* Чекбокс */}
          <Skeleton variant="rectangular" width={24} height={24} />

          {/* Картинка (аватар/иконка) */}
          <Skeleton
            variant="rectangular"
            width={64}
            height={64}
            sx={{ borderRadius: 1, ml: 2 }}
          />

          {/* Текстовые поля: название и цена */}
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="30%" height={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default UpgradesSkeleteon;
