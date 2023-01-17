# Sportingg React Native (bare)

An chat inspired mobile app

## Environments

- `iOS`: eu.sportingg.mobile
- `Android`: eu.sportingg.mobile

## Requirements

```
node 12.x
```

- [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

React Native CLI is required, please follow FB official guidelines for setting-up your environment
https://reactnative.dev/docs/environment-setup

## Build Setup

### Unix-based systems

Install: `yarn install`

Install Pods: '''cd ios && pod install & cd ..'''

Run iOS simulator: `npx react-native run-ios`

Run Android simulator: `npx react-native run-android`

## Stream

Stream is used the real-time communication. Users will be authenticated toward Woocommerce and added to Stream as new user at their first login.
Woocommerce back-end will manage the entire subscriber management. Every subsibscrion package is associated to one channel.
subscribed --> member of the channel.

In the app, the user will only see messages from channels he is member of.

### Stream SDK

The chat portion is based on Stream SDK, mostly for displaying ChannelList and Channel details. First version is a broadcast only, meaning no 2-way options.
https://getstream.github.io/stream-chat-react-native/

Stream is also used for the native iOS and Android Push Notifications. Therefore we MUST use the chat capability of Stream, and NOT the feeds.

### Stream CLI

Stream's Command Line Interface (CLI) makes it easy to create and manage your Stream apps directly from the terminal. Currently, only Chat is supported

The Stream CLI is easy to install and available via npm. The CLI requires Node v10.x or above.

Install: '''yarn global add getstream-cli'''

https://github.com/GetStream/stream-cli

### Stream API

here are JS example for adding / removing member to a channel
https://getstream.io/chat/docs/channel_members/?language=js

## Serverless

all handlers defined in /serverless folder are deployed through serverless service to AWS lambda/API gateway

### Serveless CLI

install: '''npm install -g serverless && cd services && yarn install '''

deploy: '''cd services && sls deploy'''

## AWS

## License

[MIT](http://opensource.org/licenses/MIT)
