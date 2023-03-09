import axios from 'axios/dist/node/axios.cjs';
import { getPlayerDetails } from '../../utils/htmlParser';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'Route not found' });
  }
  try {
    const { playerId } = req.query;
    const URL = `https://ratings.fide.com/profile/${playerId}`;

    const response = await axios.get(URL);
    const player = getPlayerDetails(response.data);
    return res.send(player);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = handler;
