const token = process.env.BOT_TOKEN
const Slack = require('slack')
const bot = new Slack({token})

;(async function main() {
    // logs {args:{hyper:'card'}}
    var result = await bot.api.test({hyper:'card'})
    console.log(result)
  })()

  Slack.dialog.open(options).catch(err => {
    console.log(err.messages)
  })