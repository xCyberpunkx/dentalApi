const QueueRepository = require("../repositories/queueRepository");

const QueueService = {
    async getAllQueue() {
        return QueueRepository.getAllQueue();  // Removed 'await'
    },
};

module.exports = QueueService;
