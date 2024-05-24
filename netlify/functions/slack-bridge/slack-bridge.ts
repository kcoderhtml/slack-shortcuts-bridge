import { Handler } from '@netlify/functions'
import { App } from '@slack/bolt'
import { error } from 'console'

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_OAUTH_TOKEN,
})

export const handler: Handler = async (event, context) => {
  const json: { emoji: string, status: string, time: number } = JSON.parse(event.body!)

  console.log(json)

  // validate the input
  if (!json.emoji || !json.status || (!json.time && json.time !== 0)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'emoji, status, and time are required',
      }),
    }
  }

  let futureTime: number | Date = 0;

  // set the time
  if (json.time > 0) {
    const currentTime = new Date();
    futureTime = new Date(currentTime.getTime() + json.time * 60000);
  }

  const result = await app.client.users.profile.set({
    token: process.env.SLACK_OAUTH_TOKEN,
    profile: JSON.stringify({
      status_text: json.status,
      status_emoji: json.emoji,
      status_expiration: futureTime.valueOf() / 1000,
    }),
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: result.ok,
      error: result.error || undefined,
    }),
  }
}
