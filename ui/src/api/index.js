import axios from 'axios';

const getPlayers = async (playerId) => {
  try {
    const response = await axios.post(
      'https://fide-rating-production.up.railway.app/player/opponents',
      {
        playerId,
      }
    );
    return response.data;
  } catch (e) {
    return e.message;
  }
};

const getAllStats = async (playerId) => {
  try {
    const response = await axios.post(
      'https://fide-rating-production.up.railway.app/player/stats',
      {
        playerId,
      }
    );
    return response.data;
  } catch (e) {
    return e.message;
  }
};

const getOpponentStats = async (playerId, opponentId) => {
  try {
    const response = await axios.post(
      'https://fide-rating-production.up.railway.app/player/opponent-stats',
      {
        playerId,
        opponentId,
      }
    );
    return response.data;
  } catch (e) {
    return e.message;
  }
};

const getPlayerDetails = async (playerId) => {
  try {
    const response = await axios.get(
      `https://fide-rating-production.up.railway.app/player/${playerId}`
    );
    return response.data;
  } catch (e) {
    alert(e.message)
  }
};

export { getPlayers, getAllStats, getOpponentStats, getPlayerDetails };
