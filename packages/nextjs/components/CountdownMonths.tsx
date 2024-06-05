import React, { useEffect, useState } from "react";
import moment from "moment";

type Props = {
  timeToExpiration: number;
};

export const CountdownMonths = ({ timeToExpiration }: Props) => {
  const targetTime = moment(timeToExpiration);
  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        Expira en {timeBetween.days()} días, {timeBetween.hours()}:{timeBetween.minutes()}:
        {timeBetween.seconds() < 10 ? "0" + timeBetween.seconds() : timeBetween.seconds()}
      </div>
    </div>
  );
};
