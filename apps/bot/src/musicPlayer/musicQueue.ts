import {TextChannel, VoiceChannel} from "discord.js";
import {IQueue, ISong} from "../types/discordTypes";
import {
    joinVoiceChannel,
    createAudioPlayer,
    NoSubscriberBehavior,
    createAudioResource,
    StreamType
} from "@discordjs/voice";
import ytdl from "ytdl-core";

let audioPlayer: any;
const queue = new Map();


export const addToQueue = async (song: ISong, textChannel: TextChannel, voiceChannel: VoiceChannel) => {
    const serverQueue = queue.get(voiceChannel.id);
    if (!serverQueue) {
        return await initializeQueue(song, textChannel, voiceChannel);
    }

    serverQueue.songs.push(song);
    return textChannel.send(`${song.title} has been added to the queue!`);
}

const initializeQueue = async (song: ISong, textChannel: TextChannel, voiceChannel: any) => {
    console.log("Initialising queue...");
    const queueContruct: IQueue = {
        textChannel: textChannel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 50,
        playing: true,
    };
    queue.set(voiceChannel.id, queueContruct);
    queueContruct.songs.push(song);

    try {
        const connection  = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        queueContruct.connection = connection;
        await playTrack(voiceChannel, queueContruct.songs[0]);

    } catch (err) {
        console.log(err);
        return textChannel.send("Something went wrong when trying to play audio!");
    }
}
export const playTrack = async (voiceChannel: VoiceChannel, song: ISong) => {
    const serverQueue = queue.get(voiceChannel.id);
    if (!song) {
        serverQueue.connection.destroy();
        audioPlayer.stop();
        queue.delete(voiceChannel.id);
        return;
    }


    const stream = await ytdl(song.url, {filter: 'audioonly'});
    var resource = createAudioResource(stream, {inlineVolume: true,});
    resource.volume?.setVolume(serverQueue.volume/100);

    audioPlayer = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });
    audioPlayer.play(resource);
    serverQueue.connection.subscribe(audioPlayer);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}