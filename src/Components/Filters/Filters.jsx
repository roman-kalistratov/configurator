import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import FiltersSkeleton from "../Skeleton/FiltersSkeleton";
import { setLoading } from "@/redux/slices/loadingStateSlice";
import { shallowEqual } from "react-redux"; // для оптимизации

const Filters = () => {
  const dispatch = useDispatch();

  // Оптимизация селектора с использованием shallowEqual
  const isPartLoading = useSelector(
    (state) => state.loading.part,
    shallowEqual
  );

  // Запускаем загрузку только при монтировании
  const startLoading = useCallback(() => {
    dispatch(setLoading({ type: "part", value: true }));
    const timer = setTimeout(() => {
      dispatch(setLoading({ type: "part", value: false }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    startLoading(); // вызываем только один раз при монтировании

    return startLoading; // очищаем таймер при размонтировании
  }, [startLoading]);

  return isPartLoading ? (
    <FiltersSkeleton />
  ) : (
    <Stack direction="row" spacing={3}>
      <LeftSide />
      <RightSide />
    </Stack>
  );
};

export default Filters;
