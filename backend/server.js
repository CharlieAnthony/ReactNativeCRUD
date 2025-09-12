const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello from backend!');
});

app.get('/api/data', (req, res) => {
	res.json({message: 'This is some data'});
});

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});
