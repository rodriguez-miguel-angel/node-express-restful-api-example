require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/contactRoutes';

const app = express();
const PORT = process.env.PORT;

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving static files
app.use(express.static('public'));


routes(app);

app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Node and express server is running on port ${PORT}`)
);
