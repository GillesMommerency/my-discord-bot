import * as MessageHandler from "../eventHandler/messageHandler";
import {Message} from "discord.js";

export const loadEvents = (client: any) => {
    client.on('messageCreate', (msg: Message) => MessageHandler.onMessage(msg));
    client.on('ready', () => console.log('Client Ready!'));
}
