import { Schedule } from "@mtps/pdengine/dist/model";
import { API } from "../../types";

export type Data = {
  schedule: string | null;
  overwrite: string | null;
  live: boolean;
  showClass: boolean;
};

// cache shape
export type Cache = { schedule: Schedule, scheduleId: string, timestamp: number }

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  schedule: null,
  overwrite: null,
  live: false,
  showClass: true,
};
