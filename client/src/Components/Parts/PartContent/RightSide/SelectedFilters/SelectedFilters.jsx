import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Chip, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { removeFilter, clearFilters } from '@/redux/slices/filtersStateSlice';
import { clearUpgrade } from '@/redux/slices/upgradesStateSlice';
import { selectedFiltersForPart } from '@/redux/selectors/filtersSelectors';

const SelectedFilters = ({ partIdnt }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const selectedFilters = useSelector((state) =>
    selectedFiltersForPart(state, partIdnt),
  );

  const groupedFilters = selectedFilters.reduce((acc, item) => {
    const { title } = item;
    acc[title] = acc[title] || [];
    acc[title].push(item);
    return acc;
  }, {});

  if (!selectedFilters.length) return null;

  const handleClearAll = () => {
    dispatch(clearFilters(partIdnt));
    dispatch(clearUpgrade({ partIdnt }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
        gap: 2,
      }}
    >
      {/* Левая часть — все фильтры */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: theme.spacing(2),
          flex: 1,
          minWidth: 0,
        }}
      >
        {Object.entries(groupedFilters).map(([groupTitle, chips]) => (
          <Stack
            key={groupTitle}
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            gap={1}
          >
            <Typography
              variant="body1"
              fontWeight={600}
              color={theme.palette.customColors.black}
              sx={{ mr: 1 }}
            >
              {groupTitle}:
            </Typography>

            {chips.map((chip) => (
              <Chip
                key={chip.tag}
                label={chip.tagName}
                onDelete={() =>
                  dispatch(
                    removeFilter({
                      partIdnt,
                      tag: chip.tag,
                    }),
                  )
                }
              />
            ))}
          </Stack>
        ))}
      </Box>

      {/* Правая часть — фиксированный Chip */}
      <Box sx={{ flexShrink: 0 }}>
        <Chip label="Clear filters" color="error" onDelete={handleClearAll} />
      </Box>
    </Box>
  );
};

export default SelectedFilters;
