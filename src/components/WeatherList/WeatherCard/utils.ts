export const formatTime = (cityTime: Date) => {
  const cityH = `${
    cityTime.getHours() - 2 < 0
      ? cityTime.getHours() + 22
      : cityTime.getHours() - 2 < 10
      ? `0${cityTime.getHours() - 2}`
      : cityTime.getHours() - 2
  }`;
  const cityM = `${
    cityTime.getMinutes() < 10 ? "0" : ""
  }${cityTime.getMinutes()}`;
  const cityS = `${
    cityTime.getSeconds() < 10 ? "0" : ""
  }${cityTime.getSeconds()}`;
  return `${cityH}:${cityM}:${cityS}`;
};
