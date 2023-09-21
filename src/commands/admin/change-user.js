const Command = require('../../structures/Command.js');
const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const GuildModel = require('../../models/Guild');

class ChangeUser extends Command {
    info = {
        name: "change-user",
        description: "Verander de zakken van een gebruiker.",
        options: [
            {
                name: 'gebruiker',
                type: ApplicationCommandOptionType.User,
                description: 'De gebruiker waarvan je de zakken wilt veranderen.',
                required: true
            },
            {
                name: 'aantal',
                type: ApplicationCommandOptionType.Integer,
                description: 'Het nieuwe aantal zakken. (Gebruik -1 om te verwijderen)',
                required: true,
                min_value: -1
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
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `Je bent geen administrator dus je kan deze command niet gebruiken.`, ephemeral: true });

        const member = interaction.options.getMember('gebruiker');
        const aantal = interaction.options.getInteger('aantal');

        if (member.user.bot) return await interaction.reply({ content: `Je kan niks veranderen aan een bot`, ephemeral: true });

        if (aantal === -1) {
            await GuildModel.updateOne(
                { id: interaction.guildId, 'gebruikers.id': member.id },
                { $pull: { 'gebruikers': { id: member.id } } }
            );
            return await interaction.reply({ content: `Gebruiker verwijderd.`, ephemeral: true });
        }

        await bot.tools.addUserToGuild(interaction.guildId, member.id);

        await GuildModel.updateOne(
            { id: interaction.guildId, 'gebruikers.id': member.id },
            { $set: { 'gebruikers.$.amount': aantal } }
        );

        const embed = new EmbedBuilder()
            .setTitle("Zakken gewijzigd!")
            .setDescription(`Je hebt het aantal zakken gewijzigd van <@${member.id}> naar ${aantal}`)
            .setFooter({ text: bot.config.embed.footer, iconURL: bot.user.displayAvatarURL() })
            .setColor(bot.config.embed.color)
            .setAuthor({ name: member.displayName || member.user.username, iconURL: member.displayAvatarURL() })

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}

module.exports = ChangeUser;