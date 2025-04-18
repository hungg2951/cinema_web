import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { getMovie, selectMovies, selectPending } from '../redux/slice/Movie'
import { getdashBoard } from '../redux/slice/DashBoard';
type DashBoardMovie = {
  name: string,
  data: any[],
  percent?: number,
  top5: []
}

const useSelectMovie = () => {
  const [movies, setMovies] = useState<any>([]);
  const [dashboard, setDashboard] = useState<any>([])
  const [top5, setTop5] = useState<any>([]);
  const [activeMv, setActiveMv] = useState<any>([]);
  const [inActiveMv, setInActiveMv] = useState<any>([]);
  const [mostProfit, setMostProfit] = useState<any>([]);
  const dispatch = useAppDispatch();
  const labels = top5.map((item: any) => item.name)
  const datasetChart: number[] = top5.map((item: any) => item.profit);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([dispatch(getMovie()), dispatch(getdashBoard())])
      .then((result) => {
        setMovies(result[0].payload)
        setDashboard(result[1].payload);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    if (dashboard && movies) {
      setActiveMv(movies.filter((item: { status: number; }) => item.status == 0));
      setInActiveMv(movies.filter((item: { status: number; }) => item.status !== 0));
      const topMovieProfit = dashboard.topMovieProfit;
      if (topMovieProfit) {
        const thanZero = topMovieProfit.filter((item: any) => item.profit > 0);
        let a1 = thanZero.slice(0, 1)
        let a2 = topMovieProfit.slice(0, 5)
        const a = a1.reduce(function (acc: any, cur: any,) { return cur }, {});
        setMostProfit(a);
        setTop5(a2);
      }
    }
  }, [movies, dashboard])
  const handleChangeStatus = (data:any) => {
    console.log('data', data);
    
  }
  return { movies, activeMv, inActiveMv, isLoading, mostProfit, top5, labels, datasetChart, dashboard,handleChangeStatus }


}

export default useSelectMovie
