# Slack to Apple Shortcuts Bridge

This was a very quick and simple app to simply allow apple shortcuts to change my slack status.  

If you want to setup your own instance then you need to deploy to netlify and set the below env values as well as create a slack app with the app manifest listed below:

```s
# Site environment variables for site
# Context: any
# Scope: any
# Date: Fri, 24 May 2024 18:34:40 GMT

API_TOKEN=xxxxxxxxxxxxxxxxxxxx
SLACK_OAUTH_TOKEN=xoxp-xxxxx-xxxxx-xxxxx-xxxxxxxxxxxxxxx
SLACK_SIGNING_SECRET=xxxxxxxxxxxxxxxxxx
```


```yaml
display_information:
  name: Status Setter Stan
features:
  bot_user:
    display_name: Status Setter Stan
    always_online: false
oauth_config:
  scopes:
    user:
      - users.profile:write
      - users.profile:read
      - users:read
      - users:write
    bot:
      - users:read
settings:
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```

To call it simply do a post request to /api with json in the body for the keys status, emoji, and time (given in minutes from now; if 0 then it will never expire):  

```sh
curl 'siteurl.netlify.app/api/' -d '{"status": "hi this is an api test", "emoji": ":robot_face:", "time": 1}' -H "Authorization: xxxxxxxxx"
```
or as a fetch:  
```ts
fetch('siteurl.netlify.app/api/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json
        'Authorization: xxxxxxxxx'
    },
    body: JSON.stringify({
        status: 'hi this is an api test',
        emoji: ':robot_face:',
        time: 1
    })
})
```