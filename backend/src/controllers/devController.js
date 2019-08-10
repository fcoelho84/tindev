const axios = require('axios');

const dev = require('../models/dev')

module.exports = {
    async index(req, res) {
        const userLoggedId = req.headers.user;

        const loggedDev = await dev.findById(userLoggedId);

        const users = await dev.find({
            $and: [
                { _id: { $ne: userLoggedId} },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ]
        })

        return res.json(users);
    },
    async store(req, res) {

        const { username } = req.body;

        console.log(req.body);

        const userExists = await dev.findOne({user: username});

        if(userExists) return res.json(userExists);

        const { data } = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = data


        const createDev = await dev.create({
            user: username,
            name,
            bio,
            avatar
        })

        return res.json(createDev);
    }
}