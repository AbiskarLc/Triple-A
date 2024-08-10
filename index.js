require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const errorMiddleware = require('./middleware/errorMiddleware');
const authroute = require('./route/auth-route');
const donateroute = require('./route/donation-route')
const userroute = require('./route/user-route');
const connection = require('./db/connection');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'POST,GET,PUT,DELETE,PATCH',
    credentials: true
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/auth', authroute)
app.use('/api/donation', donateroute);
app.use('/api/user', userroute);
app.use(errorMiddleware);

connection().then(() => {
    app.listen(port, () => {
        console.log(`Server listening at port ${port}`);
    });
}).catch((error) => {
    console.error(`Connection to database failed: ${error.message}`);
});
