import { GoalsContext } from "../context/GoalContext";
import { useContext } from "react";


export const useGoalsContext = () => {
  const context = useContext(GoalsContext);

    if (!context) {
        throw new Error("useGoalsContext must be used within a GoalsContextProvider");
    }

  return context
}
