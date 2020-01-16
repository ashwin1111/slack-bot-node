const SlackBot = require('slackbots');
const axios = require('axios')
const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: `${process.env.BOT_NAME}`
})

bot.on('start', () => {
    let channel, user;
    const params = {
        icon_emoji: ':male-technologist:'
    }

    cron.schedule('*/30 * * * *', () => {
        var time = new Date().toLocaleString();
        console.log('job ran at ', time);
        bot.postMessageToChannel('#water', 'Please drink water', params);
    })

    bot.on('error', (err) => {
        console.log(err);
    })

    // Message Handler
    bot.on('message', (data) => {
        if (data.type === 'message') {
            user = data.user;
        }
        if (data.type === 'desktop_notification') {
            channel = data.channel;
            handleMessage(data.content, user, channel);
        }
        if (data.type !== 'message') {
            return;
        }
    })

    function handleMessage(message, user, channel) {
        if (message.includes(' hi')) {
            inspireMe(user, channel)
        }
    }

    function inspireMe(user2, channel2) {
        var offset = Math.floor((Math.random() * 2000) + 1);
        axios.get('https://quotes-node-api-postgres.herokuapp.com/api/test?offset=' + offset)
            .then(res => {
                var quote = res.data[0].content.Quote;
                const params = {
                    icon_emoji: ':male-technologist:'
                }

                bot.postMessage(
                    channel2,
                    'Hi <@' + user2 + '>, here is your quote\n:heart: ' + quote + ':heart:',
                    params
                );
            })
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log('app running on port ', process.env.PORT || 5000)
})