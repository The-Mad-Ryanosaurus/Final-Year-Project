// Code generated by tygo. DO NOT EDIT.

//////////
// source: apiTypes.go

export interface OAuth {
  code: string;
}
export interface PostChannelBody {
  name: string;
  picture: string;
  users: string[];
}
export interface OAuthResponse {
  token: string;
  id: string;
  profilePicture: string;
}
export interface ChannelsResponse {
  id: string;
  name: string;
  picture: string;
  lastMessage?: string;
}
export interface ChannelResponse {
  id: string;
  name: string;
  picture: string;
  lastMessage?: number /* int64 */;
  users: User[];
}
export interface User {
  id: string;
  username: string;
  picture: string;
  isBot?: boolean;
}
export interface PostMessageBody {
  channelId: string;
  content: string;
}
export interface PostMessageResponse {
  channelId: string;
  sentBy: string;
  sentOn: string;
  content: string;
}
