import React, { PureComponent } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { StreamChat, logChatPromiseExecution } from 'stream-chat';
import {
    Avatar,
    Chat,
    Channel,
    MessageList,
    ChannelPreviewMessenger,
    ChannelList,
    IconBadge,
    Streami18n,
} from 'stream-chat-react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';
import AppConfig from "../../SportinggConfig";
import PropTypes from "prop-types";
import { setUserData } from "../../redux/";
import { connect } from "react-redux";

const theme = {
    'avatar.image': 'border-radius: 6px',
    colors: {
        primary: 'red',
    },
    spinner: {
        css: 'width: 15px; height: 15px;',
    },
};

const chatClient = new StreamChat(AppConfig.STREAM_SDK.CHAT_CLIENT, null);
var PushNotification = require('react-native-push-notification')

const filters = null;
const sort = { last_message_at: -1 };
const options = {
    state: true,
    watch: true,
};

/**
 * Start playing with streami18n instance here:
 * Please refer to description of this PR for details: https://github.com/GetStream/stream-chat-react-native/pull/150
 */
const streami18n = new Streami18n({
    language: 'en',
});

class AsyncApp extends React.Component {
    async componentDidMount() {
        PushNotification.configure({
            onRegister(token) {
                chatClient
                    .addDevice(token.token, token.os === 'ios' ? 'apn' : 'firebase')
                    .then(() => {
                        console.log(`registered device with token ${token}`);
                    })
                    .catch(e => {
                        console.error(`registering device failed: ${e}`);
                    });
            },
            onNotification(notification) {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            senderID: '555261429523',
            requestPermissions: true,
        });
    }
}

class CustomChannelPreview extends PureComponent {
    channelPreviewButton = React.createRef();
    onSelectChannel = () => {
        this.props.setActiveChannel(this.props.channel);
    };

    render() {
        const { channel } = this.props;
        const unreadCount = channel.countUnread();
        return (
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottomColor: '#EBEBEB',
                    borderBottomWidth: 1,
                    padding: 10,
                }}
                onPress={this.onSelectChannel}
            >
                <Avatar image={channel.data.image} size={40} />
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        paddingLeft: 10,
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: unreadCount > 0 ? 'bold' : 'normal',
                                fontSize: 14,
                                flex: 9,
                            }}
                            ellipsizeMode="tail"
                            numberOfLines={1}
                        >
                            {channel.data.name}
                        </Text>

                        <IconBadge unread={unreadCount} showNumber>
                            <Text
                                style={{
                                    color: '#767676',
                                    fontSize: 11,
                                    flex: 3,
                                    textAlign: 'right',
                                }}
                            >
                                {this.props.latestMessage.created_at}
                            </Text>
                        </IconBadge>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class ChannelListScreen extends PureComponent {
    static navigationOptions = () => ({
        headerTitle: () => <Text style={{ fontWeight: 'bold' }}>Sportingg Tips</Text>,
    });

    render() {
        return (
            <SafeAreaView>
                <Chat client={chatClient} style={theme} i18nInstance={streami18n}>
                    <View style={{ display: 'flex', height: '100%', padding: 10 }}>
                        <ChannelList
                            filters={filters}
                            sort={sort}
                            options={options}
                            Preview={CustomChannelPreview}
                            onSelect={channel => {
                                this.props.navigation.navigate('Channel', {
                                    channel,
                                });
                            }}
                        ></ChannelList>
                    </View>
                </Chat>
            </SafeAreaView>
        );
    }
}

class ChannelScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const channel = navigation.getParam('channel');
        return {
            headerTitle: () => (
                <Text style={{ fontWeight: 'bold' }}>{channel.data.name}</Text>
            ),
        };
    };

    render() {
        const { navigation } = this.props;
        const channel = navigation.getParam('channel');
        logChatPromiseExecution(channel.markRead(), 'mark read');
        return (
            <SafeAreaView>
                <Chat client={chatClient} i18nInstance={streami18n}>
                    <Channel client={chatClient} channel={channel}>
                        <View style={{ display: 'flex', height: '100%' }}>
                            <MessageList />
                        </View>
                    </Channel>
                </Chat>
            </SafeAreaView>
        );
    }
}

const RootStack = createStackNavigator(
    {
        ChannelList: {
            screen: ChannelListScreen,
        },
        Channel: {
            screen: ChannelScreen,
        },
    },
    {
        initialRouteName: 'ChannelList',
    },
);

const AppContainer = createAppContainer(RootStack);
class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientReady: false,
        };
    }

    async componentDidMount() {
        console.log('componentDidMount' + JSON.stringify(this.props));
        chatScreen.filters = { type: 'messaging', members: { $in: [this.props.streamUser.user.id] } };
        await chatClient.setUser(this.props.streamUser.user, this.props.streamUser.token);
        PushNotification.configure({
            onRegister(token) {
                chatClient
                    .addDevice(token.token, token.os === 'ios' ? 'apn' : 'firebase')
                    .then(() => {
                        console.log(`registered device with token ${token}`);
                    })
                    .catch(e => {
                        console.error(`registering device failed: ${e}`);
                    });
            },
            onNotification(notification) {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            senderID: '555261429523',
            requestPermissions: true,
        });

        this.setState({
            clientReady: true,
        });
    }
    render() {
        if (this.state.clientReady) {
            return <AppContainer />;
        } else {
            return null;
        }
    }
}

const chatScreen = {
    filters
};

ChatScreen.propTypes = {
    user: PropTypes.object,
    streamUser: PropTypes.object,
    navigation: PropTypes.object,
    setUserData: PropTypes.func
};

const mapStateToProps = ({ auth }) => {
    console.log('messaging' + JSON.stringify(auth.user.streamUser));
    return {
        user: auth.user,
        streamUser: auth.user.streamUser
    };
};
export default connect(mapStateToProps, {
    setUserData
})(ChatScreen);
