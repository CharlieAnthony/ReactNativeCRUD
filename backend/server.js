const express = require('express');
const app = express();
const PORT = 3001;

var index = 2;
var data = {
	0: {
		"title": "Rolling Hills",
		"body": "The countryside stretches endlessly, with soft hills fading into the horizon. \nGolden sunlight rests gently across the fields, painting a calm and peaceful scene.",
		"imageId": 0,
		"createdDate": "12/09/2025",
	},
	1: {
		"title": "Quiet Stream",
		"body": "A stream winds lazily through the meadow, its waters sparkling in the afternoon sun. \nAlong its banks, wildflowers grow freely, adding colour to the green expanse. The gentle sound of water \ncreates a rhythm that makes the entire valley feel alive.",
		"imageId": 1,
		"createdDate": "13/09/2025",
	},
	2: {
		"title": "Country Path",
		"body": "A narrow trail curves between old oak trees, their branches meeting overhead like a natural arch. \nIt leads on for miles, inviting travellers to slow down, breathe deeply, and listen to the rustle of leaves.",
		"imageId": 2,
		"createdDate": "14/09/2025",
	},
}

app.use(express.json());


app.get('/api/items', (req, res) => {
	const itemsWithId = Object.entries(data).map(([id, item]) => ({ id: Number(id), ...item }));
	res.json(itemsWithId);
});

app.get('/api/items/:id', (req, res) => {
	const id = req.params.id;
	if (data[id]) {
		res.json({ id: Number(id), ...data[id] });
	} else {
		res.status(404).json({ error: "Item not found" });
	}
});

app.post("/api/items", (req, res) => {
	index++;
	const newItem = {
		title: req.body.title,
		body: req.body.body,
		imageId: req.body.imageId,
		createdDate: new Date().toLocaleDateString(),
	};
	data[index] = newItem;
	res.status(201).json({ id: index, ...newItem });
});

app.put('/api/items/:id', (req, res) => {
	const id = req.params.id;
	if (data[id]) {
		const updatedItem = {
			title: req.body.title,
			body: req.body.body,
			imageId: req.body.imageId,
			createdDate: data[id].createdDate,
		};
		data[id] = updatedItem;
		res.json({ id: Number(id), ...updatedItem });
	} else {
		res.status(404).json({ error: "Item not found" });
	}
});


app.delete("/api/items/:id", (req, res) => {
	const id = req.params.id;
	if (data[id]) {
		delete data[id];
		res.json({message: "Item deleted"});
	} else {
		res.status(404).json({error: "Item not found"});
	}
});

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});
