import { useEffect, useState } from "react";

type Props = {
  timeToExpiration: number;
};

const CountdownClock = ({ timeToExpiration }: Props) => {
  const [days, setDays] = useState<string>();
  const [hours, setHours] = useState<string>();
  const [minutes, setMinutes] = useState<string>();
  const [seconds, setSeconds] = useState<string>();

  useEffect(() => {
    let _seconds: number, _minutes: number, _hours: number, _days: number;
    let remaining: number;

    function setEndInThreeDays(timeToExpiration_: number) {
      _seconds = Math.floor(timeToExpiration_ % 60);
      _minutes = Math.floor((timeToExpiration_ / 60) % 60);
      _hours = Math.floor((timeToExpiration_ / (60 * 60)) % 24);
      _days = Math.floor(timeToExpiration_ / (60 * 60 * 24));

      // _total = timeToExpiration + 259200000 - Date.parse(new Date());
      // _seconds = Math.floor( (_total/1000) % 60 );
      // _minutes = Math.floor( (_total/1000/60) % 60 );
      // _hours = Math.floor( (_total/(1000*60*60)) % 24 );
      // _days = Math.floor( _total/(1000*60*60*24) );
    }

    function initializeClock(_timeToExpiration: number) {
      remaining = _timeToExpiration;

      function updateClock() {
        setEndInThreeDays(remaining);
        const secondsStr = ("0" + _seconds).slice(-2);
        const minutesStr = ("0" + _minutes).slice(-2);
        const hoursStr = ("0" + _hours).slice(-2);
        const daysStr = ("0" + _days).slice(-2);

        setSeconds(secondsStr);
        setMinutes(minutesStr);
        setHours(hoursStr);
        setDays(daysStr);

        if (remaining <= 0) {
          clearInterval(timeinterval);
        }

        remaining -= 1;
      }

      updateClock();
      const timeinterval = setInterval(updateClock, 1000);
    }

    initializeClock(timeToExpiration);
  }, []);

  return (
    <div>
      <div>
        Expira en {days} días, {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
};

export default CountdownClock;
