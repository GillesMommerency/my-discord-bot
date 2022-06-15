import {Message, TextChannel, VoiceChannel} from "discord.js";
import * as ytdl from "ytdl-core";
import {addToQueue} from "./musicQueue";
import {ISong} from "../types/discordTypes";
import * as musicQueue from "./musicQueue";

export async function addSong(message: Message, args: string[]) {
    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel)
        return message.reply(
            "You need to be in a voice channel to play music!"
        );

    const songArgument = args[0];
    if (!songArgument)
        return message.reply(
            "Please provide a link to the song you would like to play!"
        );

    const permissions = voiceChannel.permissionsFor(message.member);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "I need the permissions to join and speak in your voice channel!"
        );
    }

    const songInfo = await ytdl.getInfo(args[0]);
    if (!songInfo)
        return message.channel.send(
            "Could not obtain song information from YouTube!"
        );

    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };

    await addToQueue(<ISong>song, <TextChannel>message.channel, <VoiceChannel>voiceChannel);
}


