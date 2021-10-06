const db = require('../dataBase/users.json');
const fs = require('fs');
const path = require('path');

module.exports = {
    getUsers: (req, res) => {
        fs.readFile(path.join(__dirname, 'dataBase', 'users.json'), ((err, data) => {
            if (err) {
                console.log(err);
                return
            }
        }))
        res.json(db);
    },
    getUserById: (req, res) => {
        fs.readFile(path.join(__dirname, 'dataBase', 'users.json'), ((err, data) => {
            if (err) {
                console.log(err);
                return
            }
        }))
        const {user_id} = req.params;
        const user = db[user_id - 1];
        res.json(user);
    },
    createUser: (req, res) => {
        fs.readFile(path.join(__dirname, 'dataBase', 'users.json'), ((err, data) => {
            if (err) {
                console.log(err);
                return
            }
            const newUser = JSON.parse(db.push({...req.body, id: db.length + 1}));
            fs.writeFile('users.json', `${JSON.stringify(newUser)}`, ((err) => {
                if (err) {
                    console.log(err);
                    return
                }

            }))
        }))

        res.json(db);
    },
    updateUser: (req, res) => {
        res.json('UPDATE USER');
    }
}