import { useSelector } from "react-redux";

import { weightedRandom } from "../shared/utilities";

export const useOptions = (issueType) => {
  const allOptions = useSelector((state) => state.game.allOptions);
  const skills = useSelector((state) => state.player.skills);

  if (issueType) {
    const shuffledOpts = allOptions[issueType].sort(() => 0.5 - Math.random());
    const fourOptions = shuffledOpts.slice(0, 4);
    const options = fourOptions.map((opt) => {
      return {
        text: opt,
        difficulty: weightedRandom(skills[issueType] * 2, 4),
      };
    });
    return options;
  } else {
    return null;
  }
};
