import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const LICHESS_API_URL = 'https://lichess.org/api/fide';

const getPlayers = async (playerId) => {
  try {
    const response = await axios.post(`${API_URL}/player/opponents`, {
      playerId,
    });
    return response.data;
  } catch (e) {
    return e.message;
  }
};

const getAllStats = async (playerId) => {
  try {
    const response = await axios.post(`${API_URL}/player/stats`, {
      playerId,
    });
    return response.data;
  } catch (e) {
    return e.message;
  }
};

const getOpponentStats = async (playerId, opponentId) => {
  try {
    const response = await axios.post(`${API_URL}/player/opponent-stats`, {
      playerId,
      opponentId,
    });
    return response.data;
  } catch (e) {
    return e.message;
  }
};

const getPlayerDetails = async (playerId) => {
  try {
    const response = await axios.get(`${LICHESS_API_URL}/player/${playerId}`);
    return response.data;
  } catch (e) {
    alert(e.message);
  }
};

export { getPlayers, getAllStats, getOpponentStats, getPlayerDetails };
