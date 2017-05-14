'use strict';

const express = require('express');
const config = require('../db/knexfile').production;
const knex = require('knex')(config)

const bodyParser = require('body-parser');

const port = process.env.PORT || 3001;
const app = express();

app.set('port', port);

app.use(express.static('client'));
app.use(bodyParser.json());


// APIs
app.get('/api/getCoaches', (req, res) => {
	knex('Coaches')
		.select('*')
		.orderBy('id')
		.then((data) => {
			res.json(data)
		})
})

app.post('/api/addCoach', (req, res) => {
	knex('Coaches')
		.insert(req.body)
		.then((data) => {
			res.json(data)
		})
})

app.put('/api/editCoach/:id', (req, res) => {
	knex('Coaches')
		.where('id', req.params.id)
		.update(req.body)
		.then((data) => {
			res.json(data)
		})
})


app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});

