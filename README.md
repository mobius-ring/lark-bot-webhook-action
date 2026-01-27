## lark-bot-webhook-action

![CI](https://github.com/mobius-ring/lark-bot-webhook-action/actions/workflows/ci.yml/badge.svg)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

- 作何用途？利用github action发送事件消息到飞书自定义机器人/机器人

#### 添加一个自定义机器人到你的飞书群

在自定义机器人设置界面，拷贝webhook url并配置到github仓库的action secrets中，命名为`LARK_BOT_WEBHOOK`

如果你启用了签名校验，那么请将签名密钥也拷贝到secrets中，命名为`LARK_BOT_SIGNKEY`

#### 添加一个action workfow

自定义你所关心的事件

```yaml
name: lark bot

on:
  branch_protection_rule:
    types: [created, deleted]
  check_run:
    types: [rerequested, completed]
  check_suite:
    types: [completed]
  create:
  delete:
  deployment_status:
  discussion:
    types: [created, edited, answered]
  discussion_comment:
    types: [created, deleted]
  fork:
  gollum:
  issues:
    types: [opened, edited, milestoned, pinned, reopened]
  issue_comment:
    types: [created, deleted]
  label:
    types: [created, deleted]
  merge_group:
    types: [checks_requested]
  milestone:
    types: [opened, deleted]
  page_build:
  project:
    types: [created, deleted, reopened]
  project_card:
    types: [created, deleted]
  project_column:
    types: [created, deleted]
  public:
  pull_request:
    branches: ['main']
    types: [opened, reopened]
  pull_request_review:
    types: [edited, dismissed, submitted]
  pull_request_review_comment:
    types: [created, edited, deleted]
  pull_request_target:
    types: [assigned, opened, synchronize, reopened]
  push:
    branches: ['main']
  registry_package:
    types: [published]
  release:
    types: [published]
  status:
  watch:
    types: [started]
  schedule:
    - cron: '30 2 * * *'

jobs:
  send-event:
    name: Webhook
    runs-on: ubuntu-latest
    steps:
      - uses: mobius-ring/lark-bot-webhook-action@main
        with:
          webhook: ${{ secrets.LARK_BOT_WEBHOOK }}
          signkey: ${{ secrets.LARK_BOT_SIGNKEY }}
```

#### Action Input

如上面例子展示的工作流的yaml文件所示，你需要关注以下输入变量。

- `webhook`: 必需，自定义机器人的回调webhook
- `signkey`: 可选，自定义机器人的签名密钥，当启用签名校验时需要

请在仓库的设置中配置`LARK_BOT_WEBHOOK`和 `LARK_BOT_SIGNKEY`，路径`Setting` -> `Secrets and variables` -> `Actions` -> `New Repository secrets`。

上面例子中配置的`schedule`事件会在每天UTC时间2:30发送github trending到机器人。

#### 建立自己的消息卡片

你可以fork项目并依据以下步骤修改：

- 在这里新建一个卡片: https://open.feishu.cn/cardkit
- 替换代码中的卡片模版id和变量

```"card": {
            "type": "template",
            "data": {
                "template_id": "AAqkeNyiypMLb",
                "template_version_name": "1.0.6",
                "template_variable": {
                    "repo": "${repo}",
                    "eventType": "${eventType}",
                    "themeColor": "${color}",
                    "auser": "${actor}",
                    "avatar": "${avatar}",
                    "status": "${status}",
                    "etitle": "${etitle}",
                    "detailurl": "${detailurl}"
                }
            }
        }
```

这个卡片是做事件通知的，也有一个做github trending的卡片，你也可以按需要修改。
