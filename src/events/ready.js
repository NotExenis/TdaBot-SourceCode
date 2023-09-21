const Event = require('../structures/Event.js');
const { connect } = require('mongoose');

module.exports = class extends Event {
    constructor(...args) {
        super(...args);
    }

    async run() {
        await connect(process.env.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            keepAlive: true,
            keepAliveInitialDelay: 300000
        });

        this.logger.ready('Connected to MongoDB');
        this.guilds.cache.forEach(guild => { this.database.fetchGuild(guild.id); });

        let data = [];
        this.commands.forEach(command => {
            if (command.info.enabled) {
                data.push(
                    {
                        name: command.info.name,
                        description: command.info.description || "No Description Provided.",
                        options: command.info.options,
                        dm_permission: false
                    }
                );
            }
        })

        await bot.application?.commands.set(data);
        this.logger.ready(`Logged in as ${this.user.tag}`);
    }
};