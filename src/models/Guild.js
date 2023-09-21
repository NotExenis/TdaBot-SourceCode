const { Schema, model, Types } = require('mongoose');

const User = Schema({
    id: { type: String, required: true },
    name: { type: String, default: "" },
    amount: { type: Number, default: 0 }
});

const Guild = Schema({
    id: { type: String, required: true, unique: true, index: true },
    gooiPercentage: { type: Types.Decimal128, default: 0.35 },
    gebruikers: [{ type: User }]
});

module.exports = model('Guild', Guild, 'guilds');