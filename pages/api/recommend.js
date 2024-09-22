import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('http://127.0.0.1:5000/recommend_cos_sim', req.body);
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to get recommendations' });
        }
    } else {
        res.status(405).json({ message: 'Only POST requests are allowed' });
    }
}