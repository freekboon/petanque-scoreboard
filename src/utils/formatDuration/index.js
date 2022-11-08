const formatDuration = (total) => {
  const minutes = total % 60;
  const hours = (total - minutes) / 60;

  return `${hours}:${minutes} hours`;
};

export default formatDuration;
