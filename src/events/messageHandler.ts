import {IMessage} from "../types/discordTypes";

export const onMessage = (message: IMessage) => {
    if (message.author.bot) return false;

    message.reply(message.content);
}