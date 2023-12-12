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
  profilePicture: string;
}
export interface ChannelResponse {
  id: string;
  name: string;
  picture: string;
  lastMessage?: number /* int64 */;
  userIds: string;
}
export interface GetMessageBody {
  ChannelId: string;
}
export interface Friend {
  id: string;
  username: string;
  picture: string;
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
