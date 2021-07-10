const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./ErrorHandler/error');

const userAuthRoute = require('./Routes/Auth/user');
const trustAuthRoute = require('./Routes/Auth/trust');
const getUserRoutes = require('./Routes/get/user');
const getTrustRoutes = require('./Routes/get/trust');


require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const path = require('path');
const PORT = process.env.PORT || 5000;
var mongourl = "mongodb+srv://livegod:1234@live-god0.m3v6s.mongodb.net/livegod?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const cors = require('cors');


//dotenv.config();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	next();
});

app.use('/api/userauth', userAuthRoute);
app.use('/api/getuser', getUserRoutes);
app.use('/api/gettrust', getTrustRoutes);
app.use('/api/trustauth',trustAuthRoute);

app.use(errorHandler);
app.use('/', (req, res) => {
	res.send('Welcome');
});

  // Database connection

mongoose
	.connect(mongourl, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then((result) => {
		console.log(`mongo db connected`);
		app.listen(PORT, console.log(`Server is running at port ${PORT}`));
	})
	.catch((error) => console.log(error));
