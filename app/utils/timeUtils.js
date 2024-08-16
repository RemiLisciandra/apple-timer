export const getTimeText = (ms) => {
  const { hrs, mins, secs } = padHMS(millisecondsToHMS(ms));

  if (hrs > 0) {
    return `${hrs}:${mins}:${secs}`;
  } else {
    return `${mins}:${secs}`;
  }
};

export const getDurationText = (ms) => {
  const { hrs, mins, secs } = millisecondsToHMS(ms);

  if (hrs > 0) {
    return `${hrs}hr`;
  } else if (mins > 0) {
    return `${mins}min`;
  } else {
    return `${secs}sec`;
  }
};

export const millisecondsToHMS = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return { hrs, mins, secs };
};

export const padHMS = ({ hrs, mins, secs }) => {
  return {
    hrs: String(hrs).padStart(2, "0"),
    mins: String(mins).padStart(2, "0"),
    secs: String(secs).padStart(2, "0"),
  };
};
