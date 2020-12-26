import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { openRandomTicket } from "../store/actions";
import { getTimeBetweenTickets } from "../shared/config";

const getRandomTime = () => Math.floor(Math.random() * 5000) + 1000;

export const useOpenTicket = () => {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.player.level);

  useEffect(() => {
    let ticker = null;
    const time = getTimeBetweenTickets(level);

    const getTicket = () =>
      setTimeout(() => {
        dispatch(openRandomTicket());
        ticker = getTicket();
      }, time + getRandomTime());
    ticker = getTicket();

    return () => clearTimeout(ticker);
  }, [dispatch, level]);
};
