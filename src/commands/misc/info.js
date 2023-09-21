const Command = require('../../structures/Command.js');
const { dependencies, version } = require('../../../package.json');
const { EmbedBuilder } = require('discord.js');

class Info extends Command {
    info = {
        name: "info",
        description: "Krijg meer informatie over deze bot.",
        options: [],
        category: "misc",
        extraFields: [],
        memberPermissions: [],
        botPermissions: [],
        cooldown: 0,
        enabled: true
    };

    constructor(...args) {
        super(...args);
    }

    async run(interaction, data) {
        await interaction.deferReply();
        const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;

        const promises = [
            bot.shard.fetchClientValues('guilds.cache.size'),
            bot.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        ];

        Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);

                const newEmbed = new EmbedBuilder()
                    .setAuthor({ name: `Bot Statistics`, iconURL: `${bot.user.avatarURL() || bot.config.embed.defaultIcon}` })
                    .setColor(bot.config.embed.color)
                    .setFooter({ text: bot.config.embed.footer })
                    .setTimestamp()
                    .addFields(
                        { name: 'Info', value: `:man_technologist: **Developer:** \`Siebe#9999\`\n:beginner: **Official Server: [discord.gg/asnZQwc6kW](https://discord.gg/asnZQwc6kW)**\n:books: **Library:** \`discord.js${dependencies["discord.js"]}\`\n:star: **Versie:** \`${version}\``, inline: true },
                        { name: 'Statistics', value: `:video_game: **Commands:** \`${bot.commands.size}\`\n:spider_web: **Shard:** \`${interaction.guild.shardId + 1}/${bot.shard.count}\`\n:white_check_mark: **Uptime:** \`${bot.tools.msToTime(bot.uptime)}\`\n:film_frames: **RAM Verbruik:** \`${Math.round(usedMemory * 100) / 100} MB\`\n:bust_in_silhouette: **Users:** \`${totalMembers}\`\n:printer: **Servers:** \`${totalGuilds}\``, inline: true }
                    )
                return interaction.editReply({ embeds: [newEmbed] });
            }).catch();
    }
}

module.exports = Info;