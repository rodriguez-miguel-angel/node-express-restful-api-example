import { login, register } from '../controllers/userController';

const router = (app) => {

    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/login')
        .post(login);
};

export default router;