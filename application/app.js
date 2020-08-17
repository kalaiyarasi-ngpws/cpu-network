const express = require('express');
const app = express();
const { config } = require('dotenv');
const cors = require('cors');
const { checkToken } = require('./jwt/jwt.middleware');
const dotenv = config();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
let loginRoute = require('./login/login.router');
let dashboardRoute = require('./dashboard/dashboard.router');

app.use('/login',loginRoute);
app.use(checkToken);

app.use('/dashboard',dashboardRoute);

app.get('/', async(req, res) => {
    res.json('Welcome to cpu-network');
});

app.use((req, res) => {
    return res.send('ERROR_URL_NOT_FOUND');
});

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});