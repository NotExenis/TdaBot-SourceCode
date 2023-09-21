const Command = require('../../structures/Command.js');
const { EmbedBuilder, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const GuildModel = require('../../models/Guild');

class ChangeRates extends Command {
    info = {
        name: "change-rates",
        description: "Veranderd het gooi percentage (aantal * percentage) [default: 0.35].",
        options: [
            {
                name: 'percentage',
                type: ApplicationCommandOptionType.Number,
                description: 'Nieuwe percentage om te gooien, laat leeg om te resetten.',
                required: false,
                min_value: 0.0,
                max_value: 2.0
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

        let percentage = interaction.options.getNumber('percentage') || 0.35;
        percentage = bot.tools.roundNumber(percentage, 2);

        await GuildModel.updateOne(
            { id: interaction.guildId },
            { $set: { gooiPercentage: percentage } }
        );

        const embed = new EmbedBuilder()
            .setTitle("Gooi percentage gewijzigd!")
            .setDescription(`Je hebt het gooi percentage gewijzigd van ${data.guild.gooiPercentage} naar ${percentage}`)
            .setFooter({ text: bot.config.embed.footer, iconURL: bot.user.displayAvatarURL() })
            .setColor(bot.config.embed.color)

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}

module.exports = ChangeRates;