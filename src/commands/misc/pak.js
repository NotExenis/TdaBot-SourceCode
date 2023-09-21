const Command = require('../../structures/Command.js');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

class Pak extends Command {
    info = {
        name: "pak",
        description: "Pak aantal planten",
        options: [
            {
                name: 'aantal',
                type: ApplicationCommandOptionType.Integer,
                description: 'Pak aantal zakken',
                required: true
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

        // for (const member in data.guild.gebruikers) {
        //     if (data.guild.gebruikers[member].id === interaction.member.id) {
        //         if (aantal > data.guild.gebruikers[member].amount) return await interaction.reply({ content: `Zoveel zakken heb jij niet tegoed!`, ephemeral: true });
        //     }
        // }

        await bot.tools.addUserToGuild(interaction.guildId, interaction.member.id);
        await bot.tools.changeMemberValues(interaction.guildId, interaction.member.id, -aantal);
        const newGuildData = await bot.database.fetchGuild(interaction.guildId);

        let str = "";
        for (const member in newGuildData.gebruikers) {
            str += `${newGuildData.gebruikers[member].name || this.tagMember(newGuildData.gebruikers[member].id)}: ${newGuildData.gebruikers[member].amount} te goed\n`;
        }

        const embed = new EmbedBuilder()
            .setTitle("Aantal zakken gepakt")
            .setDescription(`${aantal} Gepakt\n\n${str}`)
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

module.exports = Pak;