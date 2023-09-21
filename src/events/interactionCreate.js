const Event = require('../structures/Event.js');

module.exports = class extends Event {
    constructor(...args) {
        super(...args);
    }

    async run(interaction) {
        let { guild, member } = interaction;

        if (!guild) return;
        if (member.bot) return;

        const cmd = this.commands.get(interaction.commandName);

        if (!cmd) return;
        const guildData = await this.database.fetchGuild(guild.id);

        let data = {
            guild: guildData,
            cmd: cmd
        };

        await cmd.run(interaction, data);
    }
};
