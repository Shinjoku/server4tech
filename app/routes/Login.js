'use strict';

const jwt = require('jsonwebtoken');
const secretKey = require('../../config/secretKey');

module.exports = app => {
    const Collection = app.config.firebaseConfig.collection('users');


    app.post('/login', async (req, res) => {
        const document = await Collection.get();
        let user = null;

        const users = document.docs.find(doc => {
            let actualUser = extractUser(doc);
            if (actualUser.email === req.body.email &&
                actualUser.password === req.body.password) {
                user = extractUser(doc);
                return true;
            }
        });

        if(user)  {
            const id = user.id;
            const token = jwt.sign({id}, secretKey);
            res.send({
                user: {
                    name: user.name,
                    email: user.email
                },
                auth: true,
                token: token
            });
        }
        else {
            res.status(500).send('Login inválido!');
        }
    });
}

const extractUser = (doc) => {
    let user = doc.data();
    return {
        id: doc.id,
        name: user.name,
        email: user.email,
        password: user.password
    }
}