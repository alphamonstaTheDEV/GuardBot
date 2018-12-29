const mongoose = require("mongoose");
//          [--Schemes--]
const infSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    serverID: String,
    userID: String,
    action: String,
    reason: String,
    moderator: String,
    date: String,
    infID: Number
})

const serverSchema = mongoose.Schema({
    serverID: String,
    modRole: { type: Array, default: [] },
    language: {type: String, default: "EN"},
    ignoreChannels: { type: Array, default: [] },
    disabledCmds: { type: Array, default: [] },
    ignoreRoles: { type: Array, default: [] },
    prefix: {type: String, default: "/"},
    beta: {type: Boolean, default: false},
    selfRoles: {type: Array, default: []},
    plugins: {
        infs: {
            status: { type: Boolean, default: false },
            muteRole: {type: String, default: " "}
        },
        censor: {
            status: {type: Boolean, default: false},
            filter_invites: { type: Boolean, default: false },
            filter_domains: { type: Boolean, default: false },
            domains_blacklist: { type: Array, default: [] },
            domains_whitelist: { type: Array, default: [] },
            invites_whitelist: { type: Array, default: [] },
            blocked_words: { type: Array, default: [] }

        },
        modlog: {
            status: { type: Boolean, default: false },
            channel: { type: String, default: " " },
        },
    }
})

module.exports.Inf = mongoose.model("inf", infSchema);
module.exports.Server = mongoose.model("server", serverSchema);

//          [--DatabaseStuff--]

