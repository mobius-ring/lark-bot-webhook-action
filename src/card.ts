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

type ReleaseCard = {
  release_url: string,
  version: string
  release_time: string;
  logs: string;
  release_user: string;
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


export function BuildGithubReleaseCard(tm: number, sign: string, release_url: string, release_version: string, release_time: string, logs: string, release_user: string): string {
  const rcard: CardMessage = {
    timestamp: `${tm}`,
    sign,
    msg_type: 'interactive',
    card: {
      type: 'template',
      data: {
        template_id: 'AAqvNGMODBhsa',
        template_version_name: '1.2.1',
        template_variable: {
          release_url: release_url,
          version: release_version,
          release_time: release_time,
          logs: logs,
          release_user: release_user

        }
      }
    }
  }
  return JSON.stringify(rcard)
}