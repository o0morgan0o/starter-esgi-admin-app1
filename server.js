import express from 'express';
import { pool } from './db.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/etudiants', async (req, res) => {
    try {
        const result = await pool.query('SELECT nom, email FROM etudiants');
        const data = res.json({
            status: 'success',
            data: result.rows
        });
        return data
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: 'Database error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});