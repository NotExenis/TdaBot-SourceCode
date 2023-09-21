const path = require('path');

class Command {
    constructor(client, file) {
        this.client = client;
        this.file = file;
        this.name = path.parse(file).name;
        this.store = client.store;
    }

    reload() {
        return this.store.load(this.file);
    }
}

module.exports = Command;