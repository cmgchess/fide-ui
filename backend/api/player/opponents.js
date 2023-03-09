import axios from 'axios';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Route not found' });
  }
  try {
    const { playerId } = req.body;
    const URL = `http://ratings.fide.com/a_data_opponents.php?pl=${playerId}`;

    const response = await axios.get(URL);
    const data = response.data;
    if (data.length === 0) {
      return res.send([]);
    } else {
      return res.send(data);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = handler;
