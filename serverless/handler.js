import { StreamChat } from 'stream-chat';

// ***************************************************************
// create user
//
// input:
//        customer_id     --> used as user id
//
// output:
//         token          --> stream user token
// ***************************************************************
exports.init = async event => {
    try {
        const data = JSON.parse(event.body);

        const client = new StreamChat(
            process.env.STREAM_KEY,
            process.env.STREAM_SECRET
        );

        const user = Object.assign({}, data, { role: 'user' });
        await client.updateUsers([
            user
        ]);

        const token = client.createToken(user.id);

        return {
            statusCode: 200,
            body: JSON.stringify({
                user,
                token,
            }),
        };
    } catch (error) {
        return error;
    }
};

// ***************************************************************
// send a message to a channel
//
// input:
//        plan_id         --> used as channel id
//        type            --> 'message.new'
//        text            --> direct message text in case of new membership
// ***************************************************************
exports.message = async event => {
    const data = JSON.parse(event.body);

    try {
        if (data.cid === '' || data.type !== 'message.new') {
            return {
                statusCode: 400,
                body: 'invalid input paramters',
            };
        }

        const client = new StreamChat(
            process.env.STREAM_KEY,
            process.env.STREAM_SECRET
        );

        const channel = client.channel(process.env.CHANNEL_TYPE, data.cid);

        const message = data.message;

        await channel.sendMessage({
            text: message.text,
            user: {
                id: 'sportingg',
                name: 'Sportingg',
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify(message.text),
        };
    } catch (error) {
        return error;
    }
};


// ***************************************************************
// add / remove a user to a channel membership
//
// input:
//        customer_id     --> used as user id
//        plan_id         --> used as channel id
//        status          --> 'active' / 'anything else' -> add / remove switch
//        text            --> direct message text in case of new membership
// ***************************************************************
exports.membership = async event => {
    const data = JSON.parse(event.body);

    try {

        // make sure all required fields are not empty
        if (data.customer_id === '' || data.status === '' || data.plan_id === '') {
            return {
                statusCode: 400,
                body: 'missing input paramters',
            };
        }

        const client = new StreamChat(
            process.env.STREAM_KEY,
            process.env.STREAM_SECRET
        );

        const channel = client.channel(process.env.CHANNEL_TYPE, data.plan_id);

        if (data.status === 'active') {
            await channel.addMembers({
                user_id: data.customer_id
            });

            // send personal welcome message
            const message = 'you have been added to ' + data.plan_id;

            await channel.sendMessage({
                text: message,
                user: {
                    id: 'sportingg',
                    name: 'Sportingg',
                },
            });
        } else {
            await channel.removeMembers({
                user_id: data.customer_id
            });
        }

        return {
            statusCode: 200,
            body: JSON.stringify(channel),
        };
    } catch (error) {
        return error;
    }
};

// ***************************************************************
// add / delete a channel
//
// input:
//        plan_id         --> used as channel id
//        type            --> 'create' / 'delete'
// ***************************************************************
exports.channel = async event => {
    const data = JSON.parse(event.body);

    try {

        // make sure all required fields are not empty
        if (data.type === '' || data.plan_id === '') {
            return {
                statusCode: 400,
                body: 'missing input paramters',
            };
        }

        const client = new StreamChat(
            process.env.STREAM_KEY,
            process.env.STREAM_SECRET
        );

        const channel = client.channel(process.env.CHANNEL_TYPE, data.plan_id, {
            name: data.plan,
            image: data.url
        });

        const res = '';
        if (data.type === 'delete') {
            res = await channel.delete();
        } else if (data.type === 'create') {
            res = await channel.create();
        } else {
            return {
                statusCode: 400,
                body: 'invalid operation',
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(res),
        };
    } catch (error) {
        return error;
    }
};

exports.reply = async event => {
    const data = JSON.parse(event.body);

    try {
        if (data.message.user.id === 'sportingg' || data.type !== 'message.new') {
            return {
                statusCode: 200,
            };
        }

        const client = new StreamChat(
            process.env.STREAM_KEY,
            process.env.STREAM_SECRET
        );

        const cid = data.cid.split(':');
        const channel = client.channel(cid[0], cid[1]);

        return {
            statusCode: 200,
            body: JSON.stringify(channel),
        };
    } catch (error) {
        return error;
    }
};