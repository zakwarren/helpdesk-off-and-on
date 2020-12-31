import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadPlayer, loadGame } from "../store/actions";

const STORAGE = "helpdesk";

export const useSaveGame = () => {
  const player = useSelector((state) => state.player);
  const { day, stage, yearData } = useSelector((state) => state.game);

  useEffect(() => {
    const saveData = JSON.stringify({ player, day, stage, yearData });
    localStorage.setItem(STORAGE, saveData);
  }, [player, day, stage, yearData]);
};

export const useLoadGame = () => {
  const dispatch = useDispatch();
  const [hasSaveData, setHasSaveData] = useState(false);

  useEffect(() => {
    const saveData = localStorage.getItem(STORAGE);
    if (saveData) {
      const { player, day, stage, yearData } = JSON.parse(saveData);
      dispatch(loadPlayer(player));
      dispatch(loadGame(day, stage, yearData));
      setHasSaveData(true);
    }
  }, [dispatch]);

  return hasSaveData;
};
