require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import routes from './src/routes/contactRoutes';
import router from './src/routes/auth';

const app = express();
const PORT = process.env.PORT;

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving static files
app.use(express.static('public'));

// JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
            if (err)     
                req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        // security measure. prevent data sent back to the user or the frontend that can compromise the integrity of the application.
        req.user = undefined;
        next();
    }
});

router(app);

routes(app);

app.get('/', (req, res) => 
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => 
    console.log(`Node and express server is running on port ${PORT}`)
);
