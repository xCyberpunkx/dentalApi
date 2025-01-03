const queueService = require("../services/queueService");

const queueController = {
    async getAllQueue(req, res, next) {
        try {
            const queue = await queueService.getAllQueue();
            res.json(queue);
        } catch (err) {
            next(err);
        }
    }

};

module.exports = queueController;
