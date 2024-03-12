import Engine from "@mtps/pdengine";
import { ScheduleListing } from "@mtps/pdengine/dist/model";
import React, { FC, useEffect, useState } from "react";

import { Props, defaultData } from "./types";

const PeriodTimerSettings: FC<Props> = ({ data = defaultData, setData }) => {
  const [schedules, setSchedules] = useState<ScheduleListing[] | null>(null);
  const engine: Engine = new Engine();
  const {schedule, showClass, live} = data
  useEffect(() => {
    console.log("mounting (?)")
    engine.getAllSchedules().then((s) => {
      setSchedules(s);
    });
  }, []);

  return (
    <div className="PeriodTimerSettings">
      <label>Schedule Select</label>
      <select
        value={schedule || "none"}
        onChange={(event) => setData({...data, schedule: event.target.value || null})}
      >
        <option value="none" disabled>Select a schedule</option>
        {schedules ? (
          schedules.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} ({option.group})
            </option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
      </select>
      <label>
        <input
          type="checkbox"
          checked={showClass}
          onChange={() => setData({ ...data, showClass: !showClass })}
        />
        Show class?
      </label>
      <label>
        <input
          type="checkbox"
          checked={live}
          onChange={() => setData({ ...data, live: !live })}
        />
        Use Live Schedule
      </label>
    </div>
  )
};

export default PeriodTimerSettings;
