import axios from 'axios';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Route not found' });
  }
  try {
    const { playerId } = req.body;
    const URL = `http://ratings.fide.com/a_data_stats.php?id1=${playerId}&id2=0`;

    const headers = { 'X-Requested-With': 'XMLHttpRequest' };

    const response = await axios.post(URL, null, {
      headers,
    });
    const data = response.data?.[0];
    return res.send(data);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = handler;