# qrcode-moce-server

## Execute

```shell

make start
```

## Deploy

```shell
now deploy
now ls
now logs
now ln https://qrcode-mock-server.now.sh qrcode-mock-server
```

## Setting

通过`now.json`或者`.env`可以配置环境变量，格式如下

```json
// now.json

{
  "env": {
    "NODE_ENV": "production",
    "DING_TALK_APP_ID": "Your AppId",
    "DING_TALK_APP_SECRET": "Your AppSecret",
    "SECRET_ENTRY_PASSWORD": "any thing you want"
  }
}
```

```shell
# .env

DING_TALK_APP_ID=Your AppId
DING_TALK_APP_SECRET=Your AppSecret
SECRET_ENTRY_PASSWORD=any thing you want
```
