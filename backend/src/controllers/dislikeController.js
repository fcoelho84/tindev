const dev = require('../models/dev');

module.exports = {
    async store(req, res) {

        let userId = req.headers.user;

        let targetid = req.params.devId;

        const loggedDev = await dev.findById(userId);
        const targetDev = await dev.findById(targetid);

        if(!targetDev) return res.status(400).json('Dev not exists!');

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);

    }
}