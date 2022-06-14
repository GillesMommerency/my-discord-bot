import {loadEvents} from "./init/eventLoader";
const {Client, Intents} = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

loadEvents(client);

client.login(process.env.CLIENT_TOKEN).then(() => {
    console.log(
        ` Successfully logged in as: ${client.user.tag}`
    );
});




