const GuildModel = require("../models/Guild");

const fetchGuild = async function (guildId) {
    let obj = await GuildModel.findOne({ id: guildId });
    if (obj) {
        return obj;
    } else {
        obj = new GuildModel({ id: guildId });
        await obj.save().catch(err => bot.logger.error(err));
        return obj;
    }
}

module.exports = {
    fetchGuild
};