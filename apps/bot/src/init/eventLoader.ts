import {IMessage} from "../types/discordTypes";
import * as MessageHandler from "../events/messageHandler";

export const loadEvents = (client: any) => {
    client.on('messageCreate', (msg: IMessage) => MessageHandler.onMessage(msg));
    client.on('ready', () => console.log('Client Ready!'));
}
