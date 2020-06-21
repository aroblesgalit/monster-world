const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monsterSchema = new Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    moves: [
        {
            title: { type: Number },
            type: { type: String },
            damage: { type: Number }
        }
    ],
    imageUrl: {
        type: String
    }
})

const Monster = mongoose.model("Monster", monsterSchema);

module.exports = Monster;