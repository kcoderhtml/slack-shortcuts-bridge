import { Handler } from '@netlify/functions'
import { App } from '@slack/bolt'
import { ok } from 'assert'

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_OAUTH_TOKEN,
})

export const handler: Handler = async (event, context) => {
  const json: { emoji: string, status: string, time: number } = JSON.parse(event.body!)

  console.log(json)

  const result = await app.client.users.profile.set({
    token: process.env.SLACK_OAUTH_TOKEN,
    profile: JSON.stringify({
      status_text: json.status,
      status_emoji: json.emoji,
      status_expiration: json.time,
    }),
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: result.ok,
    }),
  }
}
