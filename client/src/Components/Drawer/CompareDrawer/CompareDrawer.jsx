import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
  Button,
  ButtonGroup,
} from '@mui/material';
import TopDrawer from '../TopDrawer';
import { memo, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItemFromCompare,
  closeCompareDrawer,
} from '@/redux/slices/compareStateSlice';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import * as S from './style';

const COLUMN_WIDTH = 350;

export function parseSpecificationHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html || '', 'text/html');
  const result = {};
  const bolds = doc.querySelectorAll('b');

  bolds.forEach((b) => {
    const key = (b.textContent || '').trim();
    let value = '';
    let node = b.nextSibling;
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = (node.textContent || '').trim();
        if (text) {
          value = text;
          break;
        }
      }
      node = node.nextSibling;
    }
    if (key && value) result[key] = value;
  });

  return result;
}

const norm = (v) =>
  String(v ?? '—')
    .trim()
    .replace(/\s+/g, ' ');

const CompareDrawer = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { openPartIdnt, list, error } = useSelector((state) => state.compare);

  const isOpen = openPartIdnt !== null;
  const currentEntry = list?.find?.((e) => e.partIdnt === openPartIdnt) || null;

  // ⬇️ ВАЖНО: НЕ диспатчить в рендере. Закрываем дровер эффектом.
  useEffect(() => {
    if (isOpen && !currentEntry) {
      dispatch(closeCompareDrawer());
    }
  }, [isOpen, currentEntry, dispatch]);

  const itemsUins = (currentEntry?.items || []).map((u) => Number(u));

  const specsByUin = useMemo(() => {
    const map = new Map();
    itemsUins.forEach((uin) => {
      const item = demoItems?.find?.((d) => d.uin === uin);
      if (!item) {
        map.set(uin, {});
        return;
      }
      const spec = (item.specification?.items || []).reduce(
        (acc, i) => ({ ...acc, ...parseSpecificationHtml(i.body) }),
        {},
      );
      map.set(uin, spec);
    });
    return map;
  }, [itemsUins]);

  const allKeys = useMemo(() => {
    return Array.from(
      new Set(
        itemsUins.flatMap((uin) => Object.keys(specsByUin.get(uin) || {})),
      ),
    );
  }, [itemsUins, specsByUin]);

  const valuesForKey = (key) =>
    itemsUins.map((uin) => norm((specsByUin.get(uin) || {})[key] ?? '—'));

  const diffKeys = useMemo(() => {
    return allKeys.filter((key) => {
      const vals = valuesForKey(key);
      return vals.length > 1 && !vals.every((v) => v === vals[0]);
    });
  }, [allKeys, specsByUin]);

  const [mode, setMode] = useState('all');
  const keysToRender = mode === 'diff' ? diffKeys : allKeys;

  const columnsCount = Math.max(2, itemsUins.length);

  const __handleRemoveItem = (uin) => {
    // удаляем ТО значение, что лежит в сторе (могла быть строка)
    const storedItem =
      currentEntry?.items?.find((i) => Number(i) === Number(uin)) ?? uin;

    dispatch(
      removeItemFromCompare({ partIdnt: openPartIdnt, item: storedItem }),
    );

    setMode('all');

    // закрыть, если это был последний — ОК вызывать из обработчика
    if ((currentEntry?.items?.length || 0) <= 1) {
      dispatch(closeCompareDrawer());
    }
  };

  // Если модалка закрыта, можно не рендерить вовсе (убирает лишние фокус-гонки)
  if (!isOpen) return null;

  return (
    <TopDrawer
      open={isOpen}
      onClose={() => dispatch(closeCompareDrawer())}
      sx={{ maxWidth: '100%' }}
    >
      <S.HeaderStack>
        <Typography variant="h1" fontSize={24}>
          Сравнение товаров
        </Typography>
        <S.CloseButton onClick={() => dispatch(closeCompareDrawer())}>
          <CloseIcon />
        </S.CloseButton>
      </S.HeaderStack>

      {error && (
        <Typography color="error" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      {(currentEntry?.items?.length || 0) > 1 && (
        <ButtonGroup size="small" sx={{ mb: 1 }}>
          <Button
            variant={mode === 'all' ? 'contained' : 'outlined'}
            onClick={() => setMode('all')}
            sx={{ textTransform: 'capitalize' }}
            aria-label="Показать все характеристики"
          >
            Показать Все
          </Button>
          <Button
            variant={mode === 'diff' ? 'contained' : 'outlined'}
            onClick={() => setMode('diff')}
            sx={{ textTransform: 'capitalize' }}
            aria-label="Показать только различающиеся характеристики"
          >
            Только различия {diffKeys.length ? `(${diffKeys.length})` : ''}
          </Button>
        </ButtonGroup>
      )}

      <Box sx={{ pb: 2 }}>
        {/* Шапка */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: 2,
            background: theme.palette.background.default,
          }}
        >
          {itemsUins.map((uin) => {
            const item = demoItems?.find?.((d) => d.uin === uin);
            if (!item) return null;

            const mainImg =
              item.images?.find((img) => img.img_id === '4')?.sizes?.l?.src ||
              item.images?.[0]?.sizes?.l?.src ||
              'https://via.placeholder.com/120x80?text=No+Image';

            return (
              <Box
                key={uin}
                sx={{ width: `${COLUMN_WIDTH}px`, flex: '0 0 auto', p: 2 }}
              >
                <img
                  src={mainImg}
                  alt={item.title}
                  style={{
                    objectFit: 'contain',
                    maxWidth: '90%',
                    maxHeight: '400px',
                    display: 'block',
                    marginInline: 'auto',
                  }}
                />

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}
                >
                  <Typography
                    variant="body1"
                    noWrap
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Tooltip title="Удалить из списка сравнений" placement="top">
                    <IconButton
                      size="small"
                      onClick={() => __handleRemoveItem(uin)}
                    >
                      <DeleteIcon
                        fontSize="small"
                        sx={{ color: 'error.main' }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Typography variant="body1" fontWeight={600}>
                  Price: ₪{item.data?.price}
                </Typography>
              </Box>
            );
          })}

          {Array.from({ length: columnsCount - itemsUins.length }).map(
            (_, idx) => (
              <Box
                key={`stub-header-${idx}`}
                sx={{ width: `${COLUMN_WIDTH}px`, flex: '0 0 auto' }}
              />
            ),
          )}
        </Box>

        {/* Характеристики */}
        {keysToRender.map((key) => {
          const vals = valuesForKey(key);
          const allSame = vals.every((v) => v === vals[0]);

          return (
            <Box key={key} sx={{ my: 1 }}>
              <Box sx={{ background: theme.palette.secondary?.dark, p: 1 }}>
                <Typography variant="body1">{key}</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 2, mt: 1 }}>
                {itemsUins.map((uin) => {
                  const spec = specsByUin.get(uin) || {};
                  const raw = spec[key];
                  const display = raw ?? '—';
                  const baseline = vals[0];
                  const thisVal = norm(display);
                  const differsHere = !allSame && thisVal !== baseline;

                  return (
                    <Box
                      key={`${uin}-${key}`}
                      sx={{
                        width: `${COLUMN_WIDTH}px`,
                        flex: '0 0 auto',
                        textAlign: 'center',
                        borderRadius: 1,
                        p: 1,
                        background: differsHere
                          ? 'rgba(244, 67, 54, 0.12)'
                          : 'transparent',
                      }}
                    >
                      <Typography variant="body1">{display || '—'}</Typography>
                    </Box>
                  );
                })}

                {Array.from({ length: columnsCount - itemsUins.length }).map(
                  (_, idx) => (
                    <Box
                      key={`stub-spec-${key}-${idx}`}
                      sx={{
                        width: `${COLUMN_WIDTH}px`,
                        flex: '0 0 auto',
                        border: `1px dashed ${theme.palette.secondary.dark}`,
                        borderRadius: 1,
                      }}
                    />
                  ),
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </TopDrawer>
  );
};

export default memo(CompareDrawer);

export const demoItems = [
  {
    uin: 290917,
    title: 'Видеокарта ASUS GeForce RTX 4080 Ti',
    subtitle: 'ASUS RTX 4080 Ti 16GB GDDR6X',
    mainImg: 'https://example.com/images/asus-rtx4080ti.jpg',
    upgradeMainLink: 'https://example.com/item/4080ti',
    data: {
      price: 615,
    },
    specification: {
      items: [
        {
          head: '\u05d0\u05d7\u05e8\u05d9\u05d5\u05ea ',
          body: '<div class="alignright">3 \u05e9\u05e0\u05d9\u05dd \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea, \u05de\u05d9\u05de\u05d5\u05e9 \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea \u05d1\u05e1\u05e0\u05d9\u05e4\u05d9 KSP<div></div>\n</div>',
        },
        {
          head: '\u05d3\u05d2\u05dd',
          body: '<p>VCG509032TFXXPB1-O</p>',
        },
        {
          head: '\u05e1\u05e7\u05d9\u05e8\u05d4',
          body: '<center><div style="padding: 10px;">\n<b style="color:black;font-size: 2em;">\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY GeForce RTX\u2122 5090</b><br>\u05d4-NVIDIA\u00ae GeForce RTX\u2122 5090 \u05d4\u05d5\u05d0 \u05de\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05d4\u05de\u05e1\u05da \u05d4\u05e2\u05d5\u05e6\u05de\u05ea\u05d9\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05e9-NVIDIA \u05d9\u05e6\u05e8\u05d4 \u05d0\u05d9 \u05e4\u05e2\u05dd \u05d5\u05de\u05d1\u05d9\u05d0\u05d4 \u05d9\u05db\u05d5\u05dc\u05d5\u05ea \u05de\u05d4\u05e4\u05db\u05e0\u05d9\u05d5\u05ea \u05dc\u05d2\u05d9\u05d9\u05de\u05e8\u05d9\u05dd \u05d5\u05d9\u05d5\u05e6\u05e8\u05d9\u05dd. \u05d4\u05ea\u05de\u05d5\u05d3\u05d3\u05d5 \u05e2\u05dd \u05d4\u05de\u05d5\u05d3\u05dc\u05d9\u05dd \u05d4\u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05d5\u05e2\u05dd \u05e2\u05d5\u05de\u05e1\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d9\u05e6\u05d9\u05e8\u05ea\u05d9\u05d9\u05dd \u05d4\u05de\u05d0\u05ea\u05d2\u05e8\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8, \u05e2\u05dd \u05e2\u05d5\u05e6\u05de\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea \u05d7\u05e1\u05e8\u05ea \u05ea\u05e7\u05d3\u05d9\u05dd. \u05e9\u05d7\u05e7\u05d5 \u05e2\u05dd Ray Tracing \u05de\u05dc\u05d0 \u05d5\u05e2\u05dd \u05d4\u05e9\u05d4\u05d9\u05d4 \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05ea. \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da GeForce RTX 5090 \u05de\u05d5\u05e4\u05e2\u05dc \u05e2\u05dc \u05d9\u05d3\u05d9 \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA\u00ae Blackwel1l \u05d5\u05de\u05e6\u05d5\u05d9\u05d3 \u05d1\u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05e1\u05d5\u05d2 GDDR7 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u2013 \u05db\u05da \u05e9\u05ea\u05d5\u05db\u05dc\u05d5 \u05dc\u05e2\u05e9\u05d5\u05ea \u05d4\u05db\u05dc.<br><img src="https://media.ksp.co.il/zwxttpbp53kisnh28gatr.png" alt="3-PNY-RTX-5090-ARGB-OC-EPIC-X-Triple-Fan-top.png" endimg=""><br>\u05de\u05e2\u05d1\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d4\u05de\u05e8\u05e9\u05d9\u05de\u05d9\u05dd \u05db\u05d1\u05e8\u05d9\u05e8\u05ea \u05de\u05d7\u05d3\u05dc, \u05d4-RTX 5090 \u05de\u05e6\u05d9\u05e2 \u05d2\u05dd \u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc \u05d0\u05d3\u05d9\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2 \u05d0\u05d5\u05d1\u05e8\u05e7\u05dc\u05d5\u05e7 (Overclock), \u05d4\u05de\u05d0\u05e4\u05e9\u05e8 \u05dc\u05d4\u05e2\u05dc\u05d5\u05ea \u05d0\u05ea \u05ea\u05d3\u05e8\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e2\u05d1\u05e8 \u05dc\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d4\u05d9\u05e6\u05e8\u05df, \u05d5\u05dc\u05e7\u05d1\u05dc \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d2\u05d1\u05d5\u05d4\u05d9\u05dd \u05d0\u05e3 \u05d9\u05d5\u05ea\u05e8 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d2\u05e8\u05e4\u05d9\u05d5\u05ea \u05db\u05d1\u05d3\u05d5\u05ea. \u05ea\u05d4\u05dc\u05d9\u05da \u05d6\u05d4 \u05e0\u05ea\u05de\u05da \u05e2\u05dc \u05d9\u05d3\u05d9 \u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05d7\u05d5\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d5\u05ea, \u05d5\u05de\u05d9\u05d5\u05e2\u05d3 \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05e9\u05de\u05d1\u05e7\u05e9\u05d9\u05dd \u05dc\u05d3\u05d7\u05d5\u05e3 \u05d0\u05ea \u05d2\u05d1\u05d5\u05dc\u05d5\u05ea \u05d4\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05e9\u05dc \u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05dc\u05d4\u05dd \u05ea\u05d5\u05da \u05e9\u05dc\u05d9\u05d8\u05d4 \u05de\u05dc\u05d0\u05d4 \u05e2\u05dc \u05d4\u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d5\u05d4\u05d9\u05e6\u05d9\u05d1\u05d5\u05ea.<br><img src="https://media.ksp.co.il/hvq2lv6g9er5tghuu2jna.png" alt="c] 10) (e15 RTX Powering Advanced Al" endimg=""><br>\n</div></center>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05e0\u05d5\u05ea \u05d1\u05d5\u05dc\u05d8\u05d5\u05ea',
          body: '<p>\u25cf  \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA Blackwell \u05d4\u05d7\u05d3\u05e9\u05d4 \u05d4\u05de\u05e1\u05e4\u05e7\u05ea \u05e9\u05d3\u05e8\u05d5\u05d2 \u05de\u05e9\u05de\u05e2\u05d5\u05ea\u05d9 \u05d1\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d1\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05d1\u05d0\u05e0\u05e8\u05d2\u05d9\u05d4.<br>\u25cf GDDR7 - \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05d2\u05e8\u05e4\u05d9 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u05dc\u05d0\u05d7\u05e1\u05d5\u05df \u05d5\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05de\u05d3\u05d4\u05d9\u05de\u05d9\u05dd.  <br>\u25cf DLSS 4 - \u05de\u05d0\u05e4\u05e9\u05e8 \u05e9\u05d9\u05e4\u05d5\u05e8 \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05d1\u05e2\u05d6\u05e8\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea.  <br>\u25cf NVIDIA Reflex 2 - \u05de\u05e6\u05de\u05e6\u05dd \u05d0\u05ea \u05d6\u05de\u05df \u05d4\u05d4\u05e9\u05d4\u05d9\u05d4 \u05d5\u05de\u05e1\u05e4\u05e7 \u05e8\u05d9\u05e1\u05e4\u05d5\u05e0\u05e1\u05d9\u05d1\u05d9\u05d5\u05ea \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd.  <br>\u25cf \u05de\u05de\u05e9\u05e7 PCI Express Gen 5 - \u05ea\u05d5\u05de\u05da \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea \u05d7\u05d9\u05d1\u05d5\u05e8 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8 \u05dc\u05d4\u05e2\u05d1\u05e8\u05ea \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d1\u05d9\u05df \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da \u05dc\u05de\u05e2\u05e8\u05db\u05ea.  <br>\u25cf \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05d1\u05e2\u05dc\u05ea 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd - \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05de\u05ea\u05e7\u05d3\u05de\u05ea \u05dc\u05e9\u05dc\u05d9\u05d8\u05d4 \u05e2\u05dc \u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1.  <br>\u25cf \u05db\u05d5\u05dc\u05dc 21,760 \u05dc\u05d9\u05d1\u05d5\u05ea \u00aeCUDA - \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9 \u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05d9\u05dd \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05d9\u05d9\u05e9\u05d5\u05de\u05d9 \u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd.<br>\u25cf \u05e6\u05e8\u05d9\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05e9\u05dc 600W - \u05de\u05e6\u05d1\u05d9\u05e2\u05d4 \u05e2\u05dc \u05e2\u05d5\u05e6\u05de\u05d4 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d5\u05d3\u05d5\u05e8\u05e9\u05ea \u05de\u05e2\u05e8\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05ea\u05d5\u05d0\u05de\u05ea.</p>',
        },
        {
          head: '\u05de\u05e4\u05e8\u05d8',
          body: '<div class="alignleft">\n<b>Architecture</b><br>Blackwell2<br><b>CUDA\u00ae Cores</b><br>21,760<br><b>Clock Speed</b><br>2.01 GHz<br><b>Memory Speed (Gbps)</b><br>32<br><b>Memory Size</b><br>32GB GDDR7<br><b>Memory Interface</b><br>512-bit<br><b>Memory Bandwidth (GB/sec)</b><br>1792<br><b>TDP</b><br>600 W<br><b>NVLink</b><br>Not Supported<br><b>Outputs</b><br>DisplayPort 2.1b (x3), HDMI 2.1b<br><b>Multi-Screen</b><br>4<br><b>Resolution</b><br>4K at 480Hz or 8K at 120Hz with DSC 3<br><b>Power Input</b><br>16-pin (One 16-pin to Four 8-pin)<br><b>Bus Type</b><br>PCI-Express 5.0 x16<br><b>Card Dimensions</b><br>12.94" x 5.42" x 2.8"; 3.5 Slot<br><b>System Requirements</b><br>PCI Express-compliant motherboard with one 3.5-width x16 graphics slot<br>Four 8-pin supplementary power connectors<br>Total graphics power 575 W<br>Required system power 1000 W2<br>Microsoft Windows\u00ae\u202f11 64-bit, Windows 10 (November 2018 or later) 64-bit, Linux 64-bit</div>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05dc\u05d4',
          body: '<p>PNY GeForce asfgag RTX\u2122 5090 ARGB OC<br>2x Auxiliary Power123 Cable</p>',
        },
        {
          head: '\u05de\u05d9\u05d3\u05e2 \u05de\u05d4\u05d9\u05e6\u05e8\u05df\n',
          body: '<div class="alignright"><a href="https://www.pny.com/geforce-rtx-5091-models?sku=VCG509032TFXXPB1-O" target="_system" rel="_nofollow">\u05e7\u05d9\u05e9\u05d5\u05e8 \u05dc\u05de\u05d9\u05d3\u05e2 \u05e0\u05d5\u05e1\u05e3 \u05de\u05d0\u05ea\u05e8 \u05d4\u05d9\u05e6\u05e8\u05df \u05dc\u05d7\u05e6\u05d5 \u05db\u05d0\u05df</a></div>',
        },
      ],
      links: [
        {
          type: 'manufacturer',
          url: 'https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O',
        },
      ],
      modalName: 'VCG509032TFXXPB1-O',
    },
    images: [
      {
        img_id: '1',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_1.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '90',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_1.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '498',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_1.jpg?v=1744116695',
            metadata: {
              width: '724',
              height: '656',
            },
          },
        },
      },
      {
        img_id: '2',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_2.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '87',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_2.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '483',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_2.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '632',
            },
          },
        },
      },
      {
        img_id: '3',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_3.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '78',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_3.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '434',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_3.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '568',
            },
          },
        },
      },
      {
        img_id: '4',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_4.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_4.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '246',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_4.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '322',
            },
          },
        },
      },
      {
        img_id: '5',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_5.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '60',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_5.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '332',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_5.jpg?v=1744116695',
            metadata: {
              width: '718',
              height: '434',
            },
          },
        },
      },
      {
        img_id: '6',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_6.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '55',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_6.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '306',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_6.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '401',
            },
          },
        },
      },
      {
        img_id: '7',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_7.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '38',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_7.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '213',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_7.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '280',
            },
          },
        },
      },
      {
        img_id: '8',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_8.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '21',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_8.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '115',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_8.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '151',
            },
          },
        },
      },
      {
        img_id: '9',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_9.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '46',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_9.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '258',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_9.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '338',
            },
          },
        },
      },
      {
        img_id: '10',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_10.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_10.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '245',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_10.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '321',
            },
          },
        },
      },
    ],
  },
  {
    uin: 289975,
    title:
      '\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY RTX 5090 ARGB OC Triple Fan 32GB GDDR7',
    subtitle: 'MSI RTX 4070 Gaming X 12GB',
    mainImg: 'https://example.com/images/msi-rtx4070.jpg',
    upgradeMainLink: 'https://example.com/item/4070',
    data: {
      price: 615,
    },
    specification: {
      items: [
        {
          head: '\u05d0\u05d7\u05e8\u05d9\u05d5\u05ea ',
          body: '<div class="alignright">3 \u05e9\u05e0\u05d9\u05dd \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea, \u05de\u05d9\u05de\u05d5\u05e9 \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea \u05d1\u05e1\u05e0\u05d9\u05e4\u05d9 KSP<div></div>\n</div>',
        },
        {
          head: '\u05d3\u05d2\u05dd',
          body: '<p>VCG509032TFXXPB1-O</p>',
        },
        {
          head: '\u05e1\u05e7\u05d9\u05e8\u05d4',
          body: '<center><div style="padding: 10px;">\n<b style="color:black;font-size: 2em;">\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY GeForce RTX\u2122 5090</b><br>\u05d4-NVIDIA\u00ae GeForce RTX\u2122 5090 \u05d4\u05d5\u05d0 \u05de\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05d4\u05de\u05e1\u05da \u05d4\u05e2\u05d5\u05e6\u05de\u05ea\u05d9\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05e9-NVIDIA \u05d9\u05e6\u05e8\u05d4 \u05d0\u05d9 \u05e4\u05e2\u05dd \u05d5\u05de\u05d1\u05d9\u05d0\u05d4 \u05d9\u05db\u05d5\u05dc\u05d5\u05ea \u05de\u05d4\u05e4\u05db\u05e0\u05d9\u05d5\u05ea \u05dc\u05d2\u05d9\u05d9\u05de\u05e8\u05d9\u05dd \u05d5\u05d9\u05d5\u05e6\u05e8\u05d9\u05dd. \u05d4\u05ea\u05de\u05d5\u05d3\u05d3\u05d5 \u05e2\u05dd \u05d4\u05de\u05d5\u05d3\u05dc\u05d9\u05dd \u05d4\u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05d5\u05e2\u05dd \u05e2\u05d5\u05de\u05e1\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d9\u05e6\u05d9\u05e8\u05ea\u05d9\u05d9\u05dd \u05d4\u05de\u05d0\u05ea\u05d2\u05e8\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8, \u05e2\u05dd \u05e2\u05d5\u05e6\u05de\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea \u05d7\u05e1\u05e8\u05ea \u05ea\u05e7\u05d3\u05d9\u05dd. \u05e9\u05d7\u05e7\u05d5 \u05e2\u05dd Ray Tracing \u05de\u05dc\u05d0 \u05d5\u05e2\u05dd \u05d4\u05e9\u05d4\u05d9\u05d4 \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05ea. \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da GeForce RTX 5090 \u05de\u05d5\u05e4\u05e2\u05dc \u05e2\u05dc \u05d9\u05d3\u05d9 \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA\u00ae Blackwell \u05d5\u05de\u05e6\u05d5\u05d9\u05d3 \u05d1\u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05e1\u05d5\u05d2 GDDR7 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u2013 \u05db\u05da \u05e9\u05ea\u05d5\u05db\u05dc\u05d5 \u05dc\u05e2\u05e9\u05d5\u05ea \u05d4\u05db\u05dc.<br><img src="https://media.ksp.co.il/zwxttpbp53kisnh28gatr.png" alt="3-PNY-RTX-5090-ARGB-OC-EPIC-X-Triple-Fan-top.png" endimg=""><br>\u05de\u05e2\u05d1\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d4\u05de\u05e8\u05e9\u05d9\u05de\u05d9\u05dd \u05db\u05d1\u05e8\u05d9\u05e8\u05ea \u05de\u05d7\u05d3\u05dc, \u05d4-RTX 5090 \u05de\u05e6\u05d9\u05e2 \u05d2\u05dd \u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc \u05d0\u05d3\u05d9\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2 \u05d0\u05d5\u05d1\u05e8\u05e7\u05dc\u05d5\u05e7 (Overclock), \u05d4\u05de\u05d0\u05e4\u05e9\u05e8 \u05dc\u05d4\u05e2\u05dc\u05d5\u05ea \u05d0\u05ea \u05ea\u05d3\u05e8\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e2\u05d1\u05e8 \u05dc\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d4\u05d9\u05e6\u05e8\u05df, \u05d5\u05dc\u05e7\u05d1\u05dc \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d2\u05d1\u05d5\u05d4\u05d9\u05dd \u05d0\u05e3 \u05d9\u05d5\u05ea\u05e8 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d2\u05e8\u05e4\u05d9\u05d5\u05ea \u05db\u05d1\u05d3\u05d5\u05ea. \u05ea\u05d4\u05dc\u05d9\u05da \u05d6\u05d4 \u05e0\u05ea\u05de\u05da \u05e2\u05dc \u05d9\u05d3\u05d9 \u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05d7\u05d5\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d5\u05ea, \u05d5\u05de\u05d9\u05d5\u05e2\u05d3 \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05e9\u05de\u05d1\u05e7\u05e9\u05d9\u05dd \u05dc\u05d3\u05d7\u05d5\u05e3 \u05d0\u05ea \u05d2\u05d1\u05d5\u05dc\u05d5\u05ea \u05d4\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05e9\u05dc \u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05dc\u05d4\u05dd \u05ea\u05d5\u05da \u05e9\u05dc\u05d9\u05d8\u05d4 \u05de\u05dc\u05d0\u05d4 \u05e2\u05dc \u05d4\u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d5\u05d4\u05d9\u05e6\u05d9\u05d1\u05d5\u05ea.<br><img src="https://media.ksp.co.il/hvq2lv6g9er5tghuu2jna.png" alt="c] 10) (e15 RTX Powering Advanced Al" endimg=""><br>\n</div></center>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05e0\u05d5\u05ea \u05d1\u05d5\u05dc\u05d8\u05d5\u05ea',
          body: '<p>\u25cf  \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA Blackwell \u05d4\u05d7\u05d3\u05e9\u05d4 \u05d4\u05de\u05e1\u05e4\u05e7\u05ea \u05e9\u05d3\u05e8\u05d5\u05d2 \u05de\u05e9\u05de\u05e2\u05d5\u05ea\u05d9 \u05d1\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d1\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05d1\u05d0\u05e0\u05e8\u05d2\u05d9\u05d4.<br>\u25cf GDDR7 - \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05d2\u05e8\u05e4\u05d9 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u05dc\u05d0\u05d7\u05e1\u05d5\u05df \u05d5\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05de\u05d3\u05d4\u05d9\u05de\u05d9\u05dd.  <br>\u25cf DLSS 4 - \u05de\u05d0\u05e4\u05e9\u05e8 \u05e9\u05d9\u05e4\u05d5\u05e8 \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05d1\u05e2\u05d6\u05e8\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea.  <br>\u25cf NVIDIA Reflex 2 - \u05de\u05e6\u05de\u05e6\u05dd \u05d0\u05ea \u05d6\u05de\u05df \u05d4\u05d4\u05e9\u05d4\u05d9\u05d4 \u05d5\u05de\u05e1\u05e4\u05e7 \u05e8\u05d9\u05e1\u05e4\u05d5\u05e0\u05e1\u05d9\u05d1\u05d9\u05d5\u05ea \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd.  <br>\u25cf \u05de\u05de\u05e9\u05e7 PCI Express Gen 5 - \u05ea\u05d5\u05de\u05da \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea \u05d7\u05d9\u05d1\u05d5\u05e8 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8 \u05dc\u05d4\u05e2\u05d1\u05e8\u05ea \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d1\u05d9\u05df \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da \u05dc\u05de\u05e2\u05e8\u05db\u05ea.  <br>\u25cf \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05d1\u05e2\u05dc\u05ea 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd - \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05de\u05ea\u05e7\u05d3\u05de\u05ea \u05dc\u05e9\u05dc\u05d9\u05d8\u05d4 \u05e2\u05dc \u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1.  <br>\u25cf \u05db\u05d5\u05dc\u05dc 21,760 \u05dc\u05d9\u05d1\u05d5\u05ea \u00aeCUDA - \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9 \u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05d9\u05dd \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05d9\u05d9\u05e9\u05d5\u05de\u05d9 \u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd.<br>\u25cf \u05e6\u05e8\u05d9\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05e9\u05dc 600W - \u05de\u05e6\u05d1\u05d9\u05e2\u05d4 \u05e2\u05dc \u05e2\u05d5\u05e6\u05de\u05d4 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d5\u05d3\u05d5\u05e8\u05e9\u05ea \u05de\u05e2\u05e8\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05ea\u05d5\u05d0\u05de\u05ea.</p>',
        },
        {
          head: '\u05de\u05e4\u05e8\u05d8',
          body: '<div class="alignleft">\n<b>Architecture</b><br>Blackwell<br><b>CUDA\u00ae Cores</b><br>21,760<br><b>Clock Speed</b><br>2.01 GHz<br><b>Memory Speed (Gbps)</b><br>28<br><b>Memory Size</b><br>32GB GDDR7<br><b>Memory Interface</b><br>512-bit<br><b>Memory Bandwidth (GB/sec)</b><br>1792<br><b>TDP</b><br>600 W<br><b>NVLink</b><br>Not Supported<br><b>Outputs</b><br>DisplayPort 2.1b (x3), HDMI 2.1b<br><b>Multi-Screen</b><br>4<br><b>Resolution</b><br>4K at 480Hz or 8K at 120Hz with DSC 3<br><b>Power Input</b><br>16-pin (One 16-pin to Four 8-pin)<br><b>Bus Type</b><br>PCI-Express 5.0 x16<br><b>Card Dimensions</b><br>12.94" x 5.42" x 2.8"; 3.5 Slot<br><b>System Requirements</b><br>PCI Express-compliant motherboard with one 3.5-width x16 graphics slot<br>Four 8-pin supplementary power connectors<br>Total graphics power 575 W<br>Required system power 1000 W2<br>Microsoft Windows\u00ae\u202f11 64-bit, Windows 10 (November 2018 or later) 64-bit, Linux 64-bit</div>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05dc\u05d4',
          body: '<p>PNY GeForce RTX\u2122 5090 ARGB OC<br>1x Auxiliary Power Cable</p>',
        },
        {
          head: '\u05de\u05d9\u05d3\u05e2 \u05de\u05d4\u05d9\u05e6\u05e8\u05df\n',
          body: '<div class="alignright"><a href="https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O" target="_system" rel="_nofollow">\u05e7\u05d9\u05e9\u05d5\u05e8 \u05dc\u05de\u05d9\u05d3\u05e2 \u05e0\u05d5\u05e1\u05e3 \u05de\u05d0\u05ea\u05e8 \u05d4\u05d9\u05e6\u05e8\u05df \u05dc\u05d7\u05e6\u05d5 \u05db\u05d0\u05df</a></div>',
        },
      ],
      links: [
        {
          type: 'manufacturer',
          url: 'https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O',
        },
      ],
      modalName: 'VCG509032TFXXPB1-O',
    },
    images: [
      {
        img_id: '1',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_1.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '90',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_1.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '498',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_1.jpg?v=1744116695',
            metadata: {
              width: '724',
              height: '656',
            },
          },
        },
      },
      {
        img_id: '2',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_2.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '87',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_2.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '483',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_2.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '632',
            },
          },
        },
      },
      {
        img_id: '3',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_3.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '78',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_3.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '434',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_3.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '568',
            },
          },
        },
      },
      {
        img_id: '4',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_4.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_4.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '246',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_4.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '322',
            },
          },
        },
      },
      {
        img_id: '5',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_5.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '60',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_5.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '332',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_5.jpg?v=1744116695',
            metadata: {
              width: '718',
              height: '434',
            },
          },
        },
      },
      {
        img_id: '6',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_6.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '55',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_6.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '306',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_6.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '401',
            },
          },
        },
      },
      {
        img_id: '7',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_7.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '38',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_7.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '213',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_7.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '280',
            },
          },
        },
      },
      {
        img_id: '8',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_8.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '21',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_8.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '115',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_8.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '151',
            },
          },
        },
      },
      {
        img_id: '9',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_9.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '46',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_9.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '258',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_9.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '338',
            },
          },
        },
      },
      {
        img_id: '10',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_10.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_10.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '245',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_10.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '321',
            },
          },
        },
      },
    ],
  },
  {
    uin: 289988,
    title: 'Видеокарта Gigabyte AORUS RTX 4060 Elite',
    subtitle: 'Gigabyte AORUS RTX 4060 8GB',
    mainImg: 'https://example.com/images/gigabyte-rtx4060.jpg',
    upgradeMainLink: 'https://example.com/item/4060',
    data: {
      price: 615,
    },
    specification: {
      items: [
        {
          head: '\u05d0\u05d7\u05e8\u05d9\u05d5\u05ea ',
          body: '<div class="alignright">3 \u05e9\u05e0\u05d9\u05dd \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea, \u05de\u05d9\u05de\u05d5\u05e9 \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea \u05d1\u05e1\u05e0\u05d9\u05e4\u05d9 KSP<div></div>\n</div>',
        },
        {
          head: '\u05d3\u05d2\u05dd',
          body: '<p>VCG509032TFXXPB1-O</p>',
        },
        {
          head: '\u05e1\u05e7\u05d9\u05e8\u05d4',
          body: '<center><div style="padding: 10px;">\n<b style="color:black;font-size: 2em;">\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY GeForce RTX\u2122 5090</b><br>\u05d4-NVIDIA\u00ae GeForce RTX\u2122 5090 \u05d4\u05d5\u05d0 \u05de\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05d4\u05de\u05e1\u05da \u05d4\u05e2\u05d5\u05e6\u05de\u05ea\u05d9\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05e9-NVIDIA \u05d9\u05e6\u05e8\u05d4 \u05d0\u05d9 \u05e4\u05e2\u05dd \u05d5\u05de\u05d1\u05d9\u05d0\u05d4 \u05d9\u05db\u05d5\u05dc\u05d5\u05ea \u05de\u05d4\u05e4\u05db\u05e0\u05d9\u05d5\u05ea \u05dc\u05d2\u05d9\u05d9\u05de\u05e8\u05d9\u05dd \u05d5\u05d9\u05d5\u05e6\u05e8\u05d9\u05dd. \u05d4\u05ea\u05de\u05d5\u05d3\u05d3\u05d5 \u05e2\u05dd \u05d4\u05de\u05d5\u05d3\u05dc\u05d9\u05dd \u05d4\u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05d5\u05e2\u05dd \u05e2\u05d5\u05de\u05e1\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d9\u05e6\u05d9\u05e8\u05ea\u05d9\u05d9\u05dd \u05d4\u05de\u05d0\u05ea\u05d2\u05e8\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8, \u05e2\u05dd \u05e2\u05d5\u05e6\u05de\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea \u05d7\u05e1\u05e8\u05ea \u05ea\u05e7\u05d3\u05d9\u05dd. \u05e9\u05d7\u05e7\u05d5 \u05e2\u05dd Ray Tracing \u05de\u05dc\u05d0 \u05d5\u05e2\u05dd \u05d4\u05e9\u05d4\u05d9\u05d4 \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05ea. \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da GeForce RTX 5090 \u05de\u05d5\u05e4\u05e2\u05dc \u05e2\u05dc \u05d9\u05d3\u05d9 \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA\u00ae Blackwell \u05d5\u05de\u05e6\u05d5\u05d9\u05d3 \u05d1\u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05e1\u05d5\u05d2 GDDR7 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u2013 \u05db\u05da \u05e9\u05ea\u05d5\u05db\u05dc\u05d5 \u05dc\u05e2\u05e9\u05d5\u05ea \u05d4\u05db\u05dc.<br><img src="https://media.ksp.co.il/zwxttpbp53kisnh28gatr.png" alt="3-PNY-RTX-5090-ARGB-OC-EPIC-X-Triple-Fan-top.png" endimg=""><br>\u05de\u05e2\u05d1\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d4\u05de\u05e8\u05e9\u05d9\u05de\u05d9\u05dd \u05db\u05d1\u05e8\u05d9\u05e8\u05ea \u05de\u05d7\u05d3\u05dc, \u05d4-RTX 5090 \u05de\u05e6\u05d9\u05e2 \u05d2\u05dd \u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc \u05d0\u05d3\u05d9\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2 \u05d0\u05d5\u05d1\u05e8\u05e7\u05dc\u05d5\u05e7 (Overclock), \u05d4\u05de\u05d0\u05e4\u05e9\u05e8 \u05dc\u05d4\u05e2\u05dc\u05d5\u05ea \u05d0\u05ea \u05ea\u05d3\u05e8\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e2\u05d1\u05e8 \u05dc\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d4\u05d9\u05e6\u05e8\u05df, \u05d5\u05dc\u05e7\u05d1\u05dc \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d2\u05d1\u05d5\u05d4\u05d9\u05dd \u05d0\u05e3 \u05d9\u05d5\u05ea\u05e8 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d2\u05e8\u05e4\u05d9\u05d5\u05ea \u05db\u05d1\u05d3\u05d5\u05ea. \u05ea\u05d4\u05dc\u05d9\u05da \u05d6\u05d4 \u05e0\u05ea\u05de\u05da \u05e2\u05dc \u05d9\u05d3\u05d9 \u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05d7\u05d5\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d5\u05ea, \u05d5\u05de\u05d9\u05d5\u05e2\u05d3 \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05e9\u05de\u05d1\u05e7\u05e9\u05d9\u05dd \u05dc\u05d3\u05d7\u05d5\u05e3 \u05d0\u05ea \u05d2\u05d1\u05d5\u05dc\u05d5\u05ea \u05d4\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05e9\u05dc \u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05dc\u05d4\u05dd \u05ea\u05d5\u05da \u05e9\u05dc\u05d9\u05d8\u05d4 \u05de\u05dc\u05d0\u05d4 \u05e2\u05dc \u05d4\u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d5\u05d4\u05d9\u05e6\u05d9\u05d1\u05d5\u05ea.<br><img src="https://media.ksp.co.il/hvq2lv6g9er5tghuu2jna.png" alt="c] 10) (e15 RTX Powering Advanced Al" endimg=""><br>\n</div></center>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05e0\u05d5\u05ea \u05d1\u05d5\u05dc\u05d8\u05d5\u05ea',
          body: '<p>\u25cf  \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA Blackwell \u05d4\u05d7\u05d3\u05e9\u05d4 \u05d4\u05de\u05e1\u05e4\u05e7\u05ea \u05e9\u05d3\u05e8\u05d5\u05d2 \u05de\u05e9\u05de\u05e2\u05d5\u05ea\u05d9 \u05d1\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d1\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05d1\u05d0\u05e0\u05e8\u05d2\u05d9\u05d4.<br>\u25cf GDDR7 - \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05d2\u05e8\u05e4\u05d9 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u05dc\u05d0\u05d7\u05e1\u05d5\u05df \u05d5\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05de\u05d3\u05d4\u05d9\u05de\u05d9\u05dd.  <br>\u25cf DLSS 4 - \u05de\u05d0\u05e4\u05e9\u05e8 \u05e9\u05d9\u05e4\u05d5\u05e8 \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05d1\u05e2\u05d6\u05e8\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea.  <br>\u25cf NVIDIA Reflex 2 - \u05de\u05e6\u05de\u05e6\u05dd \u05d0\u05ea \u05d6\u05de\u05df \u05d4\u05d4\u05e9\u05d4\u05d9\u05d4 \u05d5\u05de\u05e1\u05e4\u05e7 \u05e8\u05d9\u05e1\u05e4\u05d5\u05e0\u05e1\u05d9\u05d1\u05d9\u05d5\u05ea \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd.  <br>\u25cf \u05de\u05de\u05e9\u05e7 PCI Express Gen 5 - \u05ea\u05d5\u05de\u05da \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea \u05d7\u05d9\u05d1\u05d5\u05e8 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8 \u05dc\u05d4\u05e2\u05d1\u05e8\u05ea \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d1\u05d9\u05df \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da \u05dc\u05de\u05e2\u05e8\u05db\u05ea.  <br>\u25cf \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05d1\u05e2\u05dc\u05ea 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd - \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05de\u05ea\u05e7\u05d3\u05de\u05ea \u05dc\u05e9\u05dc\u05d9\u05d8\u05d4 \u05e2\u05dc \u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1.  <br>\u25cf \u05db\u05d5\u05dc\u05dc 21,760 \u05dc\u05d9\u05d1\u05d5\u05ea \u00aeCUDA - \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9 \u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05d9\u05dd \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05d9\u05d9\u05e9\u05d5\u05de\u05d9 \u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd.<br>\u25cf \u05e6\u05e8\u05d9\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05e9\u05dc 600W - \u05de\u05e6\u05d1\u05d9\u05e2\u05d4 \u05e2\u05dc \u05e2\u05d5\u05e6\u05de\u05d4 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d5\u05d3\u05d5\u05e8\u05e9\u05ea \u05de\u05e2\u05e8\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05ea\u05d5\u05d0\u05de\u05ea.</p>',
        },
        {
          head: '\u05de\u05e4\u05e8\u05d8',
          body: '<div class="alignleft">\n<b>Architecture</b><br>Blackwell<br><b>CUDA\u00ae Cores</b><br>21,760<br><b>Clock Speed</b><br>2.01 GHz<br><b>Memory Speed (Gbps)</b><br>28<br><b>Memory Size</b><br>32GB GDDR7<br><b>Memory Interface</b><br>512-bit<br><b>Memory Bandwidth (GB/sec)</b><br>1792<br><b>TDP</b><br>600 W<br><b>NVLink</b><br>Not Supported<br><b>Outputs</b><br>DisplayPort 2.1b (x3), HDMI 2.1b<br><b>Multi-Screen</b><br>4<br><b>Resolution</b><br>4K at 480Hz or 8K at 120Hz with DSC 3<br><b>Power Input</b><br>16-pin (One 16-pin to Four 8-pin)<br><b>Bus Type</b><br>PCI-Express 5.0 x16<br><b>Card Dimensions</b><br>12.94" x 5.42" x 2.8"; 3.5 Slot<br><b>System Requirements</b><br>PCI Express-compliant motherboard with one 3.5-width x16 graphics slot<br>Four 8-pin supplementary power connectors<br>Total graphics power 575 W<br>Required system power 1000 W2<br>Microsoft Windows\u00ae\u202f11 64-bit, Windows 10 (November 2018 or later) 64-bit, Linux 64-bit</div>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05dc\u05d4',
          body: '<p>PNY GeForce RTX\u2122 5090 ARGB OC<br>1x Auxiliary Power Cable</p>',
        },
        {
          head: '\u05de\u05d9\u05d3\u05e2 \u05de\u05d4\u05d9\u05e6\u05e8\u05df\n',
          body: '<div class="alignright"><a href="https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O" target="_system" rel="_nofollow">\u05e7\u05d9\u05e9\u05d5\u05e8 \u05dc\u05de\u05d9\u05d3\u05e2 \u05e0\u05d5\u05e1\u05e3 \u05de\u05d0\u05ea\u05e8 \u05d4\u05d9\u05e6\u05e8\u05df \u05dc\u05d7\u05e6\u05d5 \u05db\u05d0\u05df</a></div>',
        },
      ],
      links: [
        {
          type: 'manufacturer',
          url: 'https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O',
        },
      ],
      modalName: 'VCG509032TFXXPB1-O',
    },
    images: [
      {
        img_id: '1',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_1.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '90',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_1.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '498',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_1.jpg?v=1744116695',
            metadata: {
              width: '724',
              height: '656',
            },
          },
        },
      },
      {
        img_id: '2',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_2.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '87',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_2.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '483',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_2.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '632',
            },
          },
        },
      },
      {
        img_id: '3',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_3.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '78',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_3.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '434',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_3.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '568',
            },
          },
        },
      },
      {
        img_id: '4',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_4.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_4.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '246',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_4.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '322',
            },
          },
        },
      },
      {
        img_id: '5',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_5.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '60',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_5.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '332',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_5.jpg?v=1744116695',
            metadata: {
              width: '718',
              height: '434',
            },
          },
        },
      },
      {
        img_id: '6',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_6.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '55',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_6.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '306',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_6.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '401',
            },
          },
        },
      },
      {
        img_id: '7',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_7.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '38',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_7.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '213',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_7.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '280',
            },
          },
        },
      },
      {
        img_id: '8',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_8.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '21',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_8.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '115',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_8.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '151',
            },
          },
        },
      },
      {
        img_id: '9',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_9.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '46',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_9.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '258',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_9.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '338',
            },
          },
        },
      },
      {
        img_id: '10',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_10.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_10.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '245',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_10.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '321',
            },
          },
        },
      },
    ],
  },
  {
    uin: 289977,
    title: 'Видеокарта PNY RTX 4090 XLR8',
    subtitle: 'PNY RTX 4090 XLR8 24GB',
    mainImg: 'https://example.com/images/pny-rtx4090.jpg',
    upgradeMainLink: 'https://example.com/item/4090',
    data: {
      price: 615,
    },
    specification: {
      items: [
        {
          head: '\u05d0\u05d7\u05e8\u05d9\u05d5\u05ea ',
          body: '<div class="alignright">3 \u05e9\u05e0\u05d9\u05dd \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea, \u05de\u05d9\u05de\u05d5\u05e9 \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea \u05d1\u05e1\u05e0\u05d9\u05e4\u05d9 KSP<div></div>\n</div>',
        },
        {
          head: '\u05d3\u05d2\u05dd',
          body: '<p>VCG509032TFXXPB1-O</p>',
        },
        {
          head: '\u05e1\u05e7\u05d9\u05e8\u05d4',
          body: '<center><div style="padding: 10px;">\n<b style="color:black;font-size: 2em;">\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e1\u05da PNY GeForce RTX\u2122 5090</b><br>\u05d4-NVIDIA\u00ae GeForce RTX\u2122 5090 \u05d4\u05d5\u05d0 \u05de\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05d4\u05de\u05e1\u05da \u05d4\u05e2\u05d5\u05e6\u05de\u05ea\u05d9\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05e9-NVIDIA \u05d9\u05e6\u05e8\u05d4 \u05d0\u05d9 \u05e4\u05e2\u05dd \u05d5\u05de\u05d1\u05d9\u05d0\u05d4 \u05d9\u05db\u05d5\u05dc\u05d5\u05ea \u05de\u05d4\u05e4\u05db\u05e0\u05d9\u05d5\u05ea \u05dc\u05d2\u05d9\u05d9\u05de\u05e8\u05d9\u05dd \u05d5\u05d9\u05d5\u05e6\u05e8\u05d9\u05dd. \u05d4\u05ea\u05de\u05d5\u05d3\u05d3\u05d5 \u05e2\u05dd \u05d4\u05de\u05d5\u05d3\u05dc\u05d9\u05dd \u05d4\u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8 \u05d5\u05e2\u05dd \u05e2\u05d5\u05de\u05e1\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05d4\u05d9\u05e6\u05d9\u05e8\u05ea\u05d9\u05d9\u05dd \u05d4\u05de\u05d0\u05ea\u05d2\u05e8\u05d9\u05dd \u05d1\u05d9\u05d5\u05ea\u05e8, \u05e2\u05dd \u05e2\u05d5\u05e6\u05de\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea \u05d7\u05e1\u05e8\u05ea \u05ea\u05e7\u05d3\u05d9\u05dd. \u05e9\u05d7\u05e7\u05d5 \u05e2\u05dd Ray Tracing \u05de\u05dc\u05d0 \u05d5\u05e2\u05dd \u05d4\u05e9\u05d4\u05d9\u05d4 \u05de\u05d9\u05e0\u05d9\u05de\u05dc\u05d9\u05ea. \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da GeForce RTX 5090 \u05de\u05d5\u05e4\u05e2\u05dc \u05e2\u05dc \u05d9\u05d3\u05d9 \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA\u00ae Blackwell \u05d5\u05de\u05e6\u05d5\u05d9\u05d3 \u05d1\u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05de\u05e1\u05d5\u05d2 GDDR7 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u2013 \u05db\u05da \u05e9\u05ea\u05d5\u05db\u05dc\u05d5 \u05dc\u05e2\u05e9\u05d5\u05ea \u05d4\u05db\u05dc.<br><img src="https://media.ksp.co.il/zwxttpbp53kisnh28gatr.png" alt="3-PNY-RTX-5090-ARGB-OC-EPIC-X-Triple-Fan-top.png" endimg=""><br>\u05de\u05e2\u05d1\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d4\u05de\u05e8\u05e9\u05d9\u05de\u05d9\u05dd \u05db\u05d1\u05e8\u05d9\u05e8\u05ea \u05de\u05d7\u05d3\u05dc, \u05d4-RTX 5090 \u05de\u05e6\u05d9\u05e2 \u05d2\u05dd \u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc \u05d0\u05d3\u05d9\u05e8 \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2 \u05d0\u05d5\u05d1\u05e8\u05e7\u05dc\u05d5\u05e7 (Overclock), \u05d4\u05de\u05d0\u05e4\u05e9\u05e8 \u05dc\u05d4\u05e2\u05dc\u05d5\u05ea \u05d0\u05ea \u05ea\u05d3\u05e8\u05d9 \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc \u05d4\u05db\u05e8\u05d8\u05d9\u05e1 \u05de\u05e2\u05d1\u05e8 \u05dc\u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d4\u05d9\u05e6\u05e8\u05df, \u05d5\u05dc\u05e7\u05d1\u05dc \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d2\u05d1\u05d5\u05d4\u05d9\u05dd \u05d0\u05e3 \u05d9\u05d5\u05ea\u05e8 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d2\u05e8\u05e4\u05d9\u05d5\u05ea \u05db\u05d1\u05d3\u05d5\u05ea. \u05ea\u05d4\u05dc\u05d9\u05da \u05d6\u05d4 \u05e0\u05ea\u05de\u05da \u05e2\u05dc \u05d9\u05d3\u05d9 \u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05d7\u05d5\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d5\u05ea, \u05d5\u05de\u05d9\u05d5\u05e2\u05d3 \u05dc\u05de\u05e9\u05ea\u05de\u05e9\u05d9\u05dd \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd \u05e9\u05de\u05d1\u05e7\u05e9\u05d9\u05dd \u05dc\u05d3\u05d7\u05d5\u05e3 \u05d0\u05ea \u05d2\u05d1\u05d5\u05dc\u05d5\u05ea \u05d4\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05e9\u05dc \u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05e9\u05dc\u05d4\u05dd \u05ea\u05d5\u05da \u05e9\u05dc\u05d9\u05d8\u05d4 \u05de\u05dc\u05d0\u05d4 \u05e2\u05dc \u05d4\u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d5\u05d4\u05d9\u05e6\u05d9\u05d1\u05d5\u05ea.<br><img src="https://media.ksp.co.il/hvq2lv6g9er5tghuu2jna.png" alt="c] 10) (e15 RTX Powering Advanced Al" endimg=""><br>\n</div></center>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05e0\u05d5\u05ea \u05d1\u05d5\u05dc\u05d8\u05d5\u05ea',
          body: '<p>\u25cf  \u05d0\u05e8\u05db\u05d9\u05d8\u05e7\u05d8\u05d5\u05e8\u05ea NVIDIA Blackwell \u05d4\u05d7\u05d3\u05e9\u05d4 \u05d4\u05de\u05e1\u05e4\u05e7\u05ea \u05e9\u05d3\u05e8\u05d5\u05d2 \u05de\u05e9\u05de\u05e2\u05d5\u05ea\u05d9 \u05d1\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d1\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05d1\u05d0\u05e0\u05e8\u05d2\u05d9\u05d4.<br>\u25cf GDDR7 - \u05d6\u05d9\u05db\u05e8\u05d5\u05df \u05d2\u05e8\u05e4\u05d9 \u05de\u05d4\u05d9\u05e8 \u05d1\u05de\u05d9\u05d5\u05d7\u05d3 \u05dc\u05d0\u05d7\u05e1\u05d5\u05df \u05d5\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05de\u05d3\u05d4\u05d9\u05de\u05d9\u05dd.  <br>\u25cf DLSS 4 - \u05de\u05d0\u05e4\u05e9\u05e8 \u05e9\u05d9\u05e4\u05d5\u05e8 \u05d1\u05d9\u05e6\u05d5\u05e2\u05d9\u05dd \u05d5\u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05d1\u05e2\u05d6\u05e8\u05ea \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea.  <br>\u25cf NVIDIA Reflex 2 - \u05de\u05e6\u05de\u05e6\u05dd \u05d0\u05ea \u05d6\u05de\u05df \u05d4\u05d4\u05e9\u05d4\u05d9\u05d4 \u05d5\u05de\u05e1\u05e4\u05e7 \u05e8\u05d9\u05e1\u05e4\u05d5\u05e0\u05e1\u05d9\u05d1\u05d9\u05d5\u05ea \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd.  <br>\u25cf \u05de\u05de\u05e9\u05e7 PCI Express Gen 5 - \u05ea\u05d5\u05de\u05da \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea \u05d7\u05d9\u05d1\u05d5\u05e8 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d1\u05d9\u05d5\u05ea\u05e8 \u05dc\u05d4\u05e2\u05d1\u05e8\u05ea \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d1\u05d9\u05df \u05db\u05e8\u05d8\u05d9\u05e1 \u05d4\u05de\u05e1\u05da \u05dc\u05de\u05e2\u05e8\u05db\u05ea.  <br>\u25cf \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05d1\u05e2\u05dc\u05ea 3 \u05de\u05d0\u05d5\u05d5\u05e8\u05e8\u05d9\u05dd - \u05de\u05e2\u05e8\u05db\u05ea \u05e7\u05d9\u05e8\u05d5\u05e8 \u05de\u05ea\u05e7\u05d3\u05de\u05ea \u05dc\u05e9\u05dc\u05d9\u05d8\u05d4 \u05e2\u05dc \u05d8\u05de\u05e4\u05e8\u05d8\u05d5\u05e8\u05d5\u05ea \u05d4\u05db\u05e8\u05d8\u05d9\u05e1.  <br>\u25cf \u05db\u05d5\u05dc\u05dc 21,760 \u05dc\u05d9\u05d1\u05d5\u05ea \u00aeCUDA - \u05dc\u05d1\u05d9\u05e6\u05d5\u05e2\u05d9 \u05e2\u05d9\u05d1\u05d5\u05d3 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05d9\u05dd \u05d1\u05de\u05e9\u05d7\u05e7\u05d9\u05dd \u05d5\u05d1\u05d9\u05d9\u05e9\u05d5\u05de\u05d9 \u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05de\u05ea\u05e7\u05d3\u05de\u05d9\u05dd.<br>\u25cf \u05e6\u05e8\u05d9\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05e9\u05dc 600W - \u05de\u05e6\u05d1\u05d9\u05e2\u05d4 \u05e2\u05dc \u05e2\u05d5\u05e6\u05de\u05d4 \u05d2\u05d1\u05d5\u05d4\u05d4 \u05d5\u05d3\u05d5\u05e8\u05e9\u05ea \u05de\u05e2\u05e8\u05db\u05ea \u05d7\u05e9\u05de\u05dc \u05ea\u05d5\u05d0\u05de\u05ea.</p>',
        },
        {
          head: '\u05de\u05e4\u05e8\u05d8',
          body: '<div class="alignleft">\n<b>Architecture</b><br>Blackwell<br><b>CUDA\u00ae Cores</b><br>21,760<br><b>Clock Speed</b><br>2.01 GHz<br><b>Memory Speed (Gbps)</b><br>28<br><b>Memory Size</b><br>32GB GDDR7<br><b>Memory Interface</b><br>512-bit<br><b>Memory Bandwidth (GB/sec)</b><br>1792<br><b>TDP</b><br>600 W<br><b>NVLink</b><br>Not Supported<br><b>Outputs</b><br>DisplayPort 2.1b (x3), HDMI 2.1b<br><b>Multi-Screen</b><br>4<br><b>Resolution</b><br>4K at 480Hz or 8K at 120Hz with DSC 3<br><b>Power Input</b><br>16-pin (One 16-pin to Four 8-pin)<br><b>Bus Type</b><br>PCI-Express 5.0 x16<br><b>Card Dimensions</b><br>12.94" x 5.42" x 2.8"; 3.5 Slot<br><b>System Requirements</b><br>PCI Express-compliant motherboard with one 3.5-width x16 graphics slot<br>Four 8-pin supplementary power connectors<br>Total graphics power 575 W<br>Required system power 1000 W2<br>Microsoft Windows\u00ae\u202f11 64-bit, Windows 10 (November 2018 or later) 64-bit, Linux 64-bit</div>',
        },
        {
          head: '\u05ea\u05db\u05d5\u05dc\u05d4',
          body: '<p>PNY GeForce RTX\u2122 5090 ARGB OC<br>1x Auxiliary Power Cable</p>',
        },
        {
          head: '\u05de\u05d9\u05d3\u05e2 \u05de\u05d4\u05d9\u05e6\u05e8\u05df\n',
          body: '<div class="alignright"><a href="https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O" target="_system" rel="_nofollow">\u05e7\u05d9\u05e9\u05d5\u05e8 \u05dc\u05de\u05d9\u05d3\u05e2 \u05e0\u05d5\u05e1\u05e3 \u05de\u05d0\u05ea\u05e8 \u05d4\u05d9\u05e6\u05e8\u05df \u05dc\u05d7\u05e6\u05d5 \u05db\u05d0\u05df</a></div>',
        },
      ],
      links: [
        {
          type: 'manufacturer',
          url: 'https://www.pny.com/geforce-rtx-5090-models?sku=VCG509032TFXXPB1-O',
        },
      ],
      modalName: 'VCG509032TFXXPB1-O',
    },
    images: [
      {
        img_id: '1',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_1.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '90',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_1.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '498',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_1.jpg?v=1744116695',
            metadata: {
              width: '724',
              height: '656',
            },
          },
        },
      },
      {
        img_id: '2',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_2.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '87',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_2.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '483',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_2.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '632',
            },
          },
        },
      },
      {
        img_id: '3',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_3.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '78',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_3.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '434',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_3.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '568',
            },
          },
        },
      },
      {
        img_id: '4',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_4.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_4.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '246',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_4.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '322',
            },
          },
        },
      },
      {
        img_id: '5',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_5.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '60',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_5.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '332',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_5.jpg?v=1744116695',
            metadata: {
              width: '718',
              height: '434',
            },
          },
        },
      },
      {
        img_id: '6',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_6.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '55',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_6.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '306',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_6.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '401',
            },
          },
        },
      },
      {
        img_id: '7',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_7.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '38',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_7.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '213',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_7.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '280',
            },
          },
        },
      },
      {
        img_id: '8',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_8.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '21',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_8.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '115',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_8.jpg?v=1744116695',
            metadata: {
              width: '719',
              height: '151',
            },
          },
        },
      },
      {
        img_id: '9',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_9.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '46',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_9.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '258',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_9.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '338',
            },
          },
        },
      },
      {
        img_id: '10',
        time: '1744116695',
        sizes: {
          s: {
            src: 'https://img.ksp.co.il/item/378226/s_10.jpg?v=1744116695',
            metadata: {
              width: '100',
              height: '44',
            },
          },
          b: {
            src: 'https://img.ksp.co.il/item/378226/b_10.jpg?v=1744116695',
            metadata: {
              width: '550',
              height: '245',
            },
          },
          l: {
            src: 'https://img.ksp.co.il/item/378226/l_10.jpg?v=1744116695',
            metadata: {
              width: '720',
              height: '321',
            },
          },
        },
      },
    ],
  },
];
