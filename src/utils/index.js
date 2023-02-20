const typeMap = {
  STANDARD: 'std',
  BLITZ: 'blz',
  RAPID: 'rpd',
};

const getAllWLDfromStats = (stats, color) => {
  const wins = parseInt(stats[`${color}_win_num`]);
  const draws = parseInt(stats[`${color}_draw_num`]);
  const losses = parseInt(stats[`${color}_total`]) - wins - draws;
  return [wins, draws, losses];
};

const getWLDForTypefromStats = (stats, color, type) => {
  const wins = parseInt(stats[`${color}_win_num_${type}`]);
  const draws = parseInt(stats[`${color}_draw_num_${type}`]);
  const losses = parseInt(stats[`${color}_total_${type}`]) - wins - draws;
  return [wins, draws, losses];
};

export { typeMap, getAllWLDfromStats, getWLDForTypefromStats };
