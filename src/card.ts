import { Repository } from './trend'

type NotificationCard = {
  repo: string
  eventType: string
  themeColor: string
  auser: string
  avatar: string
  status: string
  etitle: string
  detailurl: string
}

type TrendingCard = {
  object_list_1: Repository[]
}

type GitHubUser = {
  avatar_url: string
  events_url: string
  followers_url: string
  following_url: string
  gists_url: string
  gravatar_id: string
  html_url: string
  id: number
  login: string
  node_id: string
  organizations_url: string
  received_events_url: string
  repos_url: string
  site_admin: boolean
  starred_url: string
  subscriptions_url: string
  type: string
  url: string
  user_view_type: string
}

type GitHubRelease = {
  assets: any[]
  assets_url: string
  author: GitHubUser
  body: string
  created_at: string
  draft: boolean
  html_url: string
  id: number
  immutable: boolean
  name: string
  node_id: string
  prerelease: boolean
  published_at: string
  tag_name: string
  tarball_url: string
  target_commitish: string
  updated_at: string
  upload_url: string
  url: string
  zipball_url: string
}

type ReleaseCard = {
  release_version: string;
  release_time: string;
  release_logs: string;
  release_user: string;
  release_url: string;
}

type CardData = {
  template_id: string
  template_version_name: string
  template_variable: NotificationCard | TrendingCard | ReleaseCard
}

type CardType = {
  type: string
  data: CardData
}

type CardMessage = {
  timestamp: string
  sign: string
  msg_type: string
  card: CardType
}

export function BuildGithubNotificationCard(
  tm: number,
  sign: string,
  repo: string,
  eventType: string,
  color: string,
  user: string,
  status: string,
  etitle: string,
  detailurl: string
): string {
  console.log(repo)
  const ncard: CardMessage = {
    timestamp: `${tm}`,
    sign,
    msg_type: 'interactive',
    card: {
      type: 'template',
      data: {
        template_id: 'AAqkeNyiypMLb',
        template_version_name: '1.0.8',
        template_variable: {
          repo,
          eventType,
          themeColor: color,
          auser: user,
          avatar: 'img_v2_9dd98485-2900-4d65-ada9-e31d1408dcfg',
          status,
          etitle,
          detailurl
        }
      }
    }
  }
  return JSON.stringify(ncard)
}

export function BuildGithubTrendingCard(
  tm: number,
  sign: string,
  repos: Repository[]
): string {
  const tcard: CardMessage = {
    timestamp: `${tm}`,
    sign,
    msg_type: 'interactive',
    card: {
      type: 'template',
      data: {
        template_id: 'AAqkeNyiypMLb',
        template_version_name: '1.0.8',
        template_variable: {
          object_list_1: repos
        }
      }
    }
  }
  return JSON.stringify(tcard)
}


export function BuildGithubReleaseCard(tm: number, sign: string, release: GitHubRelease): string {


  const rcard: CardMessage = {
    timestamp: `${tm}`,
    sign,
    msg_type: 'interactive',
    card: {
      type: 'template',
      data: {
        template_id: 'AAqvNGMODBhsa',
        template_version_name: '1.2.3',
        template_variable: {
          release_version: release.tag_name,
          release_time: release.published_at,
          release_logs: release.body,
          release_user: release.author.login,
          release_url: release.html_url,
        }
      }
    }
  }
  return JSON.stringify(rcard)
}