const GuildModel = require('../models/Guild');

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const msToTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)));

    let str = "";
    str += days > 0 ? days + "d " : "";
    str += hours > 0 ? hours + "h " : "";
    str += minutes > 0 ? minutes + "m " : "";
    str += seconds > 0 ? seconds + "s" : "";

    return str || "0s";
};

const roundNumber = (n, places = 2) => {
    const x = Math.pow(10, places);
    return Math.round(n * x) / x;
}

const addUserToGuild = async (guildId, userId) => {
    const guildData = await GuildModel.findOne({ id: guildId, 'gebruikers.id': userId });

    if (!guildData) {
        await GuildModel.updateOne(
            { id: guildId },
            {
                $push: {
                    'gebruikers': {
                        id: userId,
                        name: "",
                        amount: 0
                    }
                }
            }
        );
    }
}

const changeMemberValues = async (guildId, userId, incrementValue) => {
    await GuildModel.updateOne(
        { id: guildId, 'gebruikers.id': userId },
        { $inc: { 'gebruikers.$.amount': incrementValue } }
    );
}

module.exports = {
    randomNumber,
    timeout,
    msToTime,
    roundNumber,
    addUserToGuild,
    changeMemberValues
};