const fs = require('fs');
const path = require('path');

const db = require('../dataBase/users.json');
const userService = require('../services/user.service');

module.exports = {
    getUsers: async (req, res) => {
        const data = await userService.readFile();
        res.json(db);
    },

    getUserById: async (req, res) => {
        const data = await userService.readFile();
        const {user_id} = req.params;
        const user = data[user_id - 1];
        res.json(user);
    },

    createUser: async (req, res) => {
        const data = await userService.readFile();
        data.push({id: data.length + 1, ...req.body});
        const newData = await userService.writeFile(data);
        res.json(newData);
    },

    deleteUser: async (req, res) => {
        let data = await userService.readFile();
        const {user_id} = req.params;
        const filterData = data.filter(user => user.id !== +user_id);
        const newData = await userService.writeFile(filterData);
        res.json(newData);
    }
}