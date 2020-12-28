import { useSelector } from "react-redux";

import { weightedRandom } from "../shared/utilities";
import { OPTIONS } from "../store/data/index";

export const useOptions = (issueType) => {
  const skills = useSelector((state) => state.player.skills);

  if (issueType) {
    const shuffledOpts = OPTIONS[issueType].sort(() => 0.5 - Math.random());
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
