require('dotenv').config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { mongoose } from '..//data/db';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!'});
    }
};

export const register = (req, res) => {

    console.log('Registering new user...');

    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            // security measure. prevent the password sent back to the user or the frontend. 
            user.hashPassword = undefined;
            return res.status(201).json(user); 
        }
    });
};


export const login = (req,res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            /*
            version-01:
            res.status(401).json({ message: 'Authentication failed. No user found'}); 
            */
            // security measure. prevent a specific message sent back to the user or the frontend that can compromise the integrity of the application.
            res.status(401).json({ message: 'Authentication failed. Either user was not found or password was not correct.'});
        } else {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                /*
               version-01:
               res.status(401).json({ message: 'Authentication failed. Wrong password'});
                */
               // security measure. prevent a specific message sent back to the user or the frontend that can compromise the integrity of the application.
               res.status(401).json({ message: 'Authentication failed. Either user was not found or password was not correct'});
            } else {
                const token = jwt.sign({ email: user.email, username: user.username, _id: user.id}, process.env.JWT_SECRET, { expiresIn: '2h' });
                return res.json({
                    message: 'Authentication successful.',
                    token: token
                });
            }
        }
    });
};

