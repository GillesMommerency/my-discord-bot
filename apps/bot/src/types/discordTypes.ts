import {TextChannel, VoiceChannel} from "discord.js";

export interface ISong{
    title: string;
    url: string;
}
export interface IQueue{
    textChannel: TextChannel,
    voiceChannel: VoiceChannel,
    connection: any,
    songs: ISong[],
    volume: number,
    playing: boolean,
}