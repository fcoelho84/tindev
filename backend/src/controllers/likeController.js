const dev = require('../models/dev');

module.exports = {
    async store(req, res) {

        let userId = req.headers.user;

        let targetId = req.params.devId;

        const loggedDev = await dev.findById(userId);
        const targetDev = await dev.findById(targetId);

        if(!targetDev) return res.status(400).json('Dev not exists!');


        if(targetDev.likes.includes(userId)) {

            console.log("Deu match")
            
            const loggedSocket = req.connectedUsers[userId];
            const targetSocket = req.connectedUsers[targetId];

            if(loggedSocket) req.io.to(loggedSocket).emit('match', loggedDev)
            

            if(targetSocket) req.io.to(targetSocket).emit('match', targetDev)
            

        }
        
        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);

    }
}