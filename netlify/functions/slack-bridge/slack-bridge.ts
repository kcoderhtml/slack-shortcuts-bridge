import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  const json = JSON.parse(event.body!)

  console.log(json.ello)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${json.ello}!`,
    }),
  }
}
