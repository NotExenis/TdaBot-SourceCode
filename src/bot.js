// Intents: https://discord.com/developers/docs/topics/gateway#gateway-intents
const Bot = require('./structures/Bot.js');
const bot = global.bot = new Bot({ intents: [1 << 0] });

bot.login();

bot.rest.on('rateLimit', rateLimitData => {
    bot.logger.warn(`RATELIMITED for ${parseInt(rateLimitData.timeout / 1000)} seconds | Limit: ${rateLimitData.limit} requests | Global? ${rateLimitData.global ? "yes" : "no"}`);
});

const ignoredErrors = ["DiscordAPIError[10008]: Unknown Message"];
process.on('uncaughtException', (err) => {
    if (!ignoredErrors.includes(`${err.name}: ${err.message}`)) {
        bot.logger.error(err.stack);
    }
});

process.on('unhandledRejection', (err) => {
    if (!ignoredErrors.includes(`${err.name}: ${err.message}`)) {
        bot.logger.error(err.stack);
    }
});