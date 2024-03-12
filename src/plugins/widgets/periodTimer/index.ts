import { Config } from "../../types";
import PeriodTimer from "./PeriodTimer";
import PeriodTimerSettings from "./PeriodTimerSettings";

const config: Config = {
  key: "widget/periodTimer",
  name: "Period Timer",
  description: "Time them periods.",
  dashboardComponent: PeriodTimer,
  settingsComponent: PeriodTimerSettings,
};

export default config;
