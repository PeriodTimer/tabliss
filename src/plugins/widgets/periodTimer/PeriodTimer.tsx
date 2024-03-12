import Engine from "@mtps/pdengine";
import { IContextValue, Schedule } from "@mtps/pdengine/dist/model";
import React, { useEffect, useState } from "react";
import { useCachedEffect, useTime } from "../../../hooks";
import { MINUTES } from "../../../utils";
import { defaultData, Props } from "./types";

const PeriodTimer: React.FC<Props> = ({ 
  cache,
  data = defaultData,
  setCache,
  loader, 
}) => {
  const { schedule: scheduleId, overwrite, live, showClass } = data;
  const [oText, setOText] = useState<string | null>(null);
   // hot load schedule, even if it's wrong. marginal effect on draw speed.
  const [vSchedule, setVSchedule] = useState<Schedule | null>(cache?.schedule ?? null);
  const [computed, setComputed] = useState<string | null>(null);
  const [thisClass, setThisClass] = useState<string | null>(null);

  const engine: Engine = new Engine();

  useEffect(() => {
    if (!scheduleId) {
      setOText("Select Schedule");
      return;
    }
    console.log(cache)
    if (cache && cache.timestamp < Date.now() + 10 * MINUTES && cache.scheduleId === scheduleId) {
      setOText(null);
      setVSchedule(cache.schedule);
    } else {
      setOText("Loading...")
      loader.push();
      engine.getSingleSchedule(scheduleId, live, overwrite ?? undefined).then((s) => {
        setOText(null);
        setVSchedule(s);
        setCache({ timestamp: Date.now(), schedule: s, scheduleId })
        loader.pop();
      }).catch((e) => {
        setOText("Failed to fetch");
        loader.pop();
      });
    }
    
  }, [scheduleId, overwrite, live])

  useEffect(() => {
    const timerId = setInterval(() => {
      if (vSchedule) {
        const currentSlot = engine.computeAll(vSchedule).currentSlot;
        setComputed(engine.generateCountdownTextFull(
          oText,
          engine.computeEndDate(currentSlot),
        ));
        setThisClass(currentSlot.eventName)
      }
    }, 500)
    return () => {
      clearTimeout(timerId);
    }
  }, [vSchedule])

  // console.log(computed, oText, vSchedule)

  if (oText || !vSchedule || !computed) {
    return (
      <div className="PeriodTimer">
        <p>{oText}</p>
      </div>
    );
  }


  return (
    <div className="PeriodTimer">
      <p style={{ marginBottom: "-20px" }}>{computed}</p>
      {showClass ? <p>{thisClass}</p> : null}
    </div>
  );
};

export default PeriodTimer;
