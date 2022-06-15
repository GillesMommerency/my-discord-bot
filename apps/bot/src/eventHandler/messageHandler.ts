import {Message} from "discord.js";
import {config} from "../../config/config";
import {addSong} from "../musicPlayer/musicService";

export const onMessage = async (message: Message) => {
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(1).split(" ");
    const cmd = args.shift()?.toLowerCase();

    switch (cmd) {
        case 'play':
            console.log('play');
            await addSong(message, args);
            break;
        case 'help':
            console.log('help');
            await message.reply('The help command is not yet implemented.');
            break;
        default:
            console.log('default');
            await message.reply('Unknown command, please use -help for a list of commands.');
            break;
    }
}