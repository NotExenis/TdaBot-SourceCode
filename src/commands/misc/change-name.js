const Command = require('../../structures/Command.js');
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const GuildModel = require('../../models/Guild');

class ChangeName extends Command {
    info = {
        name: "change-name",
        description: "Verander je naam in de gooi/pak commands",
        options: [
            {
                name: 'naam',
                type: ApplicationCommandOptionType.String,
                description: 'De naam die je wilt hebben.',
                required: true,
                min_length: 1,
                max_length: 20
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
        const naam = interaction.options.getString("naam");

        await bot.tools.addUserToGuild(interaction.guildId, interaction.member.id);

        await GuildModel.updateOne(
            { id: interaction.guildId, 'gebruikers.id': interaction.member.id },
            { $set: { 'gebruikers.$.name': naam } }
        );

        const embed = new EmbedBuilder()
            .setTitle("Naam veranderd!")
            .setDescription(`Je hebt je naam veranderd naam \`${naam}\``)
            .setFooter({ text: bot.config.embed.footer, iconURL: bot.user.displayAvatarURL() })
            .setColor(bot.config.embed.color)
            .setAuthor({ name: naam, iconURL: interaction.member.displayAvatarURL() })

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}

module.exports = ChangeName;