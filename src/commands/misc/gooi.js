const Command = require('../../structures/Command.js');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

class Gooi extends Command {
    info = {
        name: "gooi",
        description: "Gooi aantal planten",
        options: [
            {
                name: 'aantal',
                type: ApplicationCommandOptionType.Integer,
                description: 'Gooi aantal planten',
                required: true,
                min_value: 0
            }
        ],
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
        const aantal = interaction.options.getInteger("aantal");

        await bot.tools.addUserToGuild(interaction.guildId, interaction.member.id);
        await bot.tools.changeMemberValues(interaction.guildId, interaction.member.id, Math.round(aantal * data.guild.gooiPercentage));
        const newGuildData = await bot.database.fetchGuild(interaction.guildId);

        let str = "";
        for (const member in newGuildData.gebruikers) {
            str += `${newGuildData.gebruikers[member].name || this.tagMember(newGuildData.gebruikers[member].id)}: ${newGuildData.gebruikers[member].amount} te goed\n`;
        }

        const embed = new EmbedBuilder()
            .setTitle("Aantal planten gegooid")
            .setDescription(`${aantal} Gegooid\n\n${str}`)
            .setFooter({ text: bot.config.embed.footer, iconURL: bot.user.displayAvatarURL() })
            .setColor(bot.config.embed.color)
            .setThumbnail(interaction.member.displayAvatarURL())
            .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.displayAvatarURL() })

        await interaction.reply({ embeds: [embed] });
    }

    tagMember(userId) {
        return `<@${userId}>`;
    }
}

module.exports = Gooi;