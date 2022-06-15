import {MessageActionRow, MessageButton} from "discord.js";

export const musicControls =
    new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('rewind')
                .setStyle('SECONDARY')
                .setEmoji('⏪'),
            new MessageButton()
                .setCustomId('play')
                .setStyle('SECONDARY')
                .setEmoji('▶️'),
            new MessageButton()
                .setCustomId('pause')
                .setStyle('SECONDARY')
                .setEmoji('⏸️'),
            new MessageButton()
                .setCustomId('stop')
                .setStyle('SECONDARY')
                .setEmoji('⏹️'),
            new MessageButton()
                .setCustomId('skip')
                .setStyle('SECONDARY')
                .setEmoji('⏭️'),
        );
