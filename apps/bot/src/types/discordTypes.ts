export interface IMessage{
    content: string;
    author: IAuthor;
    reply(content: string): void;
}
export interface IAuthor{
    username: string;
    bot: boolean;
}