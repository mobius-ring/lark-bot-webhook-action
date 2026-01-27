import { BuildGithubReleaseCard } from '../src/card'
import { sign_with_timestamp, PostToFeishu } from '../src/feishu'
import * as core from '@actions/core'
import * as dotenv from 'dotenv'
import * as https from 'https'

dotenv.config({ path: ['.env.local'] })

const debugMock: jest.SpiedFunction<typeof core.debug> = jest
  .spyOn(core, 'debug')
  .mockImplementation()

const httpsRequestMock = jest.spyOn(https, 'request').mockImplementation(
  () => {
    const mockResponse = {
      statusCode: 200,
      on: jest.fn((event: string, callback: (data: any) => void) => {
        if (event === 'data') {
          callback(Buffer.from('{"code": 19021, "msg": "sign match fail or timestamp is not within one hour from current time"}'))
        } else if (event === 'end') {
          callback(null)
        }
      })
    }
    const mockRequest = {
      write: jest.fn(),
      end: jest.fn(),
      on: jest.fn()
    }
    return mockRequest as any
  }
)

describe('card', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('BuildGithubReleaseCard with release data', () => {
    const tm = 1716283459
    const sign = 'test-signature'
    const release = {
      assets: [],
      assets_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793/assets',
      author: {
        avatar_url: 'https://avatars.githubusercontent.com/u/30578440?v=4',
        events_url: 'https://api.github.com/users/Liz2Z/events{/privacy}',
        followers_url: 'https://api.github.com/users/Liz2Z/followers',
        following_url: 'https://api.github.com/users/Liz2Z/following{/other_user}',
        gists_url: 'https://api.github.com/users/Liz2Z/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/Liz2Z',
        id: 30578440,
        login: 'Liz2Z',
        node_id: 'MDQ6VXNlcjMwNTc4NDQw',
        organizations_url: 'https://api.github.com/users/Liz2Z/orgs',
        received_events_url: 'https://api.github.com/users/Liz2Z/received_events',
        repos_url: 'https://api.github.com/users/Liz2Z/repos',
        site_admin: false,
        starred_url: 'https://api.github.com/users/Liz2Z/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/Liz2Z/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/Liz2Z',
        user_view_type: 'public'
      },
      body: ' zhuyaoneirong ',
      created_at: '2026-01-27T03:02:31Z',
      draft: false,
      html_url: 'https://github.com/mobius-ring/lark-bot-webhook-action/releases/tag/3',
      id: 280135793,
      immutable: false,
      name: '3.0',
      node_id: 'RE_kwDOQ-2txc4Qsohx',
      prerelease: false,
      published_at: '2026-01-27T03:04:50Z',
      tag_name: '3',
      tarball_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/tarball/3',
      target_commitish: 'main',
      updated_at: '2026-01-27T03:04:50Z',
      upload_url: 'https://uploads.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793/assets{?name,label}',
      url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793',
      zipball_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/zipball/3'
    }

    const result = BuildGithubReleaseCard(tm, sign, release)
    const parsed = JSON.parse(result)

    expect(parsed).toEqual({
      timestamp: '1716283459',
      sign: 'test-signature',
      msg_type: 'interactive',
      card: {
        type: 'template',
        data: {
          template_id: 'AAqvNGMODBhsa',
          template_version_name: '1.2.2',
          template_variable: {
            release_version: '3',
            release_time: '2026-01-27T03:04:50Z',
            release_logs: ' zhuyaoneirong ',
            release_user: 'Liz2Z',
            release_url: 'https://github.com/mobius-ring/lark-bot-webhook-action/releases/tag/3'
          }
        }
      }
    })
  })

  it('BuildGithubReleaseCard returns valid JSON string', () => {
    const tm = 1716283459
    const sign = 'test-signature'
    const release = {
      assets: [],
      assets_url: 'https://api.github.com/repos/test/repo/releases/1/assets',
      author: {
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        events_url: 'https://api.github.com/users/test/events{/privacy}',
        followers_url: 'https://api.github.com/users/test/followers',
        following_url: 'https://api.github.com/users/test/following{/other_user}',
        gists_url: 'https://api.github.com/users/test/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/test',
        id: 1,
        login: 'testuser',
        node_id: 'test-node',
        organizations_url: 'https://api.github.com/users/test/orgs',
        received_events_url: 'https://api.github.com/users/test/received_events',
        repos_url: 'https://api.github.com/users/test/repos',
        site_admin: false,
        starred_url: 'https://api.github.com/users/test/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/test/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/test',
        user_view_type: 'public'
      },
      body: 'Release notes',
      created_at: '2026-01-01T00:00:00Z',
      draft: false,
      html_url: 'https://github.com/test/repo/releases/tag/v1.0.0',
      id: 1,
      immutable: false,
      name: 'v1.0.0',
      node_id: 'test-release-node',
      prerelease: false,
      published_at: '2026-01-01T00:00:00Z',
      tag_name: 'v1.0.0',
      tarball_url: 'https://api.github.com/repos/test/repo/tarball/v1.0.0',
      target_commitish: 'main',
      updated_at: '2026-01-01T00:00:00Z',
      upload_url: 'https://uploads.github.com/repos/test/repo/releases/1/assets{?name,label}',
      url: 'https://api.github.com/repos/test/repo/releases/1',
      zipball_url: 'https://api.github.com/repos/test/repo/zipball/v1.0.0'
    }

    const result = BuildGithubReleaseCard(tm, sign, release)
    const parsed = JSON.parse(result)

    expect(parsed).toMatchObject({
      timestamp: '1716283459',
      sign: 'test-signature',
      msg_type: 'interactive',
      card: {
        type: 'template',
        data: {
          template_id: 'AAqvNGMODBhsa',
          template_version_name: '1.2.2',
          template_variable: {
            release_version: 'v1.0.0',
            release_time: '2026-01-01T00:00:00Z',
            release_logs: 'Release notes',
            release_user: 'testuser',
            release_url: 'https://github.com/test/repo/releases/tag/v1.0.0'
          }
        }
      }
    })
  })

  describe('send release card', () => {
    it('send release card to feishu without signature should fail', async () => {
      const tm = Math.floor(Date.now() / 1000)
      const release = {
        assets: [],
        assets_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793/assets',
        author: {
          avatar_url: 'https://avatars.githubusercontent.com/u/30578440?v=4',
          events_url: 'https://api.github.com/users/Liz2Z/events{/privacy}',
          followers_url: 'https://api.github.com/users/Liz2Z/followers',
          following_url: 'https://api.github.com/users/Liz2Z/following{/other_user}',
          gists_url: 'https://api.github.com/users/Liz2Z/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/Liz2Z',
          id: 30578440,
          login: 'Liz2Z',
          node_id: 'MDQ6VXNlcjMwNTc4NDQw',
          organizations_url: 'https://api.github.com/users/Liz2Z/orgs',
          received_events_url: 'https://api.github.com/users/Liz2Z/received_events',
          repos_url: 'https://api.github.com/users/Liz2Z/repos',
          site_admin: false,
          starred_url: 'https://api.github.com/users/Liz2Z/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/Liz2Z/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/Liz2Z',
          user_view_type: 'public'
        },
        body: ' zhuyaoneirong ',
        created_at: '2026-01-27T03:02:31Z',
        draft: false,
        html_url: 'https://github.com/mobius-ring/lark-bot-webhook-action/releases/tag/3',
        id: 280135793,
        immutable: false,
        name: '3.0',
        node_id: 'RE_kwDOQ-2txc4Qsohx',
        prerelease: false,
        published_at: '2026-01-27T03:04:50Z',
        tag_name: '3',
        tarball_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/tarball/3',
        target_commitish: 'main',
        updated_at: '2026-01-27T03:04:50Z',
        upload_url: 'https://uploads.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793/assets{?name,label}',
        url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793',
        zipball_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/zipball/3'
      }

      const cardMsg = BuildGithubReleaseCard(tm, '', release)
      const webhook = process.env.FEISHU_BOT_WEBHOOK || ''
      const webhookId = webhook.slice(webhook.indexOf('hook/') + 5)
      const ret = await PostToFeishu(webhookId, cardMsg)
      expect(ret).toEqual(200)
      expect(debugMock).toHaveBeenNthCalledWith(1, 19021)
      expect(debugMock).toHaveBeenNthCalledWith(
        2,
        'sign match fail or timestamp is not within one hour from current time'
      )
    })

    /*
    it('send release card with valid signature', async () => {
      const tm = Math.floor(Date.now() / 1000)
      const signKey = process.env.FEISHU_BOT_SIGNKEY || ''
      const sign = sign_with_timestamp(tm, signKey)
      const release = {
        assets: [],
        assets_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793/assets',
        author: {
          avatar_url: 'https://avatars.githubusercontent.com/u/30578440?v=4',
          events_url: 'https://api.github.com/users/Liz2Z/events{/privacy}',
          followers_url: 'https://api.github.com/users/Liz2Z/followers',
          following_url: 'https://api.github.com/users/Liz2Z/following{/other_user}',
          gists_url: 'https://api.github.com/users/Liz2Z/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/Liz2Z',
          id: 30578440,
          login: 'Liz2Z',
          node_id: 'MDQ6VXNlcjMwNTc4NDQw',
          organizations_url: 'https://api.github.com/users/Liz2Z/orgs',
          received_events_url: 'https://api.github.com/users/Liz2Z/received_events',
          repos_url: 'https://api.github.com/users/Liz2Z/repos',
          site_admin: false,
          starred_url: 'https://api.github.com/users/Liz2Z/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/Liz2Z/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/Liz2Z',
          user_view_type: 'public'
        },
        body: ' zhuyaoneirong ',
        created_at: '2026-01-27T03:02:31Z',
        draft: false,
        html_url: 'https://github.com/mobius-ring/lark-bot-webhook-action/releases/tag/3',
        id: 280135793,
        immutable: false,
        name: '3.0',
        node_id: 'RE_kwDOQ-2txc4Qsohx',
        prerelease: false,
        published_at: '2026-01-27T03:04:50Z',
        tag_name: '3',
        tarball_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/tarball/3',
        target_commitish: 'main',
        updated_at: '2026-01-27T03:04:50Z',
        upload_url: 'https://uploads.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793/assets{?name,label}',
        url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/releases/280135793',
        zipball_url: 'https://api.github.com/repos/mobius-ring/lark-bot-webhook-action/zipball/3'
      }

      const cardMsg = BuildGithubReleaseCard(tm, sign, release)
      const webhook = process.env.FEISHU_BOT_WEBHOOK || ''
      const webhookId = webhook.slice(webhook.indexOf('hook/') + 5)
      const ret = await PostToFeishu(webhookId, cardMsg)
      expect(ret).toEqual(200)
    })
    */
  })
})
