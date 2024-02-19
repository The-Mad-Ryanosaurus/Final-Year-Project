package main

type OAuth struct {
	Code string `json:"code" validate:"required"`
}

type PostSignupBody struct {
	Username string `json:"username"`
}

type PostChannelBody struct {
	Name    string   `json:"name" validate:"required"`
	Users   []string `json:"users" validate:"required"`
	Picture string   `json:"picture"`
}

type OAuthResponse struct {
	Signup         bool    `json:"signup"`
	Token          string  `json:"token"`
	Id             string  `json:"id"`
	ProfilePicture *string `json:"profilePicture"`
}

type ChannelsResponse struct {
	Id          string  `json:"id"`
	Name        string  `json:"name"`
	Picture     string  `json:"picture"`
	LastMessage *string `json:"lastMessage"`
}

type ChannelResponse struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Picture     string `json:"picture"`
	LastMessage *int64 `json:"lastMessage"`
	Users       []User `json:"users"`
}

type User struct {
	Id       string `json:"id" validate:"required"`
	Username string `json:"username" validate:"required"`
	Picture  string `json:"picture" validate:"required"`
	IsBot    *bool  `json:"isBot"`
}

type PostMessageBody struct {
	ChannelId string  `json:"channelId" validate:"required"`
	Content   string  `json:"content" validate:"required"`
	Image     *string `json:"image"`
}

type PostMessageResponse struct {
	ChannelId string  `json:"channelId"`
	SentBy    string  `json:"sentBy"`
	SentOn    string  `json:"sentOn"`
	Content   string  `json:"content"`
	Image     *string `json:"image"`
}
