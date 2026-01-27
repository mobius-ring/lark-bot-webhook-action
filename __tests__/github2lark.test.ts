import { expect } from '@jest/globals'

import * as core from '@actions/core'
import { context } from '@actions/github'
import * as main from '../src/github2lark'
import * as dotenv from 'dotenv'

dotenv.config({ path: ['.env.local'] })

const runMock = jest.spyOn(main, 'PostGithubEvent')

// Mock the GitHub Actions core library
let debugMock: jest.SpiedFunction<typeof core.debug>
let errorMock: jest.SpiedFunction<typeof core.error>
// let setFailedMock: jest.SpiedFunction<typeof core.setFailed>
// let setOutputMock: jest.SpiedFunction<typeof core.setOutput>

describe('events and actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Set the action's inputs as return values from core.getInput()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
  })

  it('push event', async () => {
    const pushevent = {
      after: 'dc9af660f53062cb275dbe7912730256ce7c65c0',
      base_ref: null,
      before: '775ae3d16b63e139bf86c921452ecbf99920e332',
      commits: [
        {
          author: {
            email: 'wan.junjie@foxmail.com',
            name: 'mobius-ring',
            username: 'mobius-ring'
          },
          committer: {
            email: 'wan.junjie@foxmail.com',
            name: 'mobius-ring',
            username: 'mobius-ring'
          },
          distinct: true,
          id: 'dc9af660f53062cb275dbe7912730256ce7c65c0',
          message:
            'slow down the wakatime\n\nSigned-off-by: mobius-ring <wan.junjie@foxmail.com>',
          timestamp: '2024-05-20T21:12:42+08:00',
          tree_id: '861060d83ecb9c1c7d0fff6c8fe006fad2344647',
          url: 'https://github.com/mobius-ring/mobius-ring/commit/dc9af660f53062cb275dbe7912730256ce7c65c0'
        }
      ],
      compare:
        'https://github.com/mobius-ring/mobius-ring/compare/775ae3d16b63...dc9af660f530',
      created: false,
      deleted: false,
      forced: true,
      head_commit: {
        author: {
          email: 'wan.junjie@foxmail.com',
          name: 'mobius-ring',
          username: 'mobius-ring'
        },
        committer: {
          email: 'wan.junjie@foxmail.com',
          name: 'mobius-ring',
          username: 'mobius-ring'
        },
        distinct: true,
        id: 'dc9af660f53062cb275dbe7912730256ce7c65c0',
        message:
          'slow down the wakatime\n\nSigned-off-by: mobius-ring <wan.junjie@foxmail.com>',
        timestamp: '2024-05-20T21:12:42+08:00',
        tree_id: '861060d83ecb9c1c7d0fff6c8fe006fad2344647',
        url: 'https://github.com/mobius-ring/mobius-ring/commit/dc9af660f53062cb275dbe7912730256ce7c65c0'
      },
      pusher: { email: 'wan.junjie@foxmail.com', name: 'mobius-ring' },
      ref: 'refs/heads/main',
      repository: {
        allow_forking: true,
        archive_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/{archive_format}{/ref}',
        archived: false,
        assignees_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/assignees{/user}',
        blobs_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/blobs{/sha}',
        branches_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/branches{/branch}',
        clone_url: 'https://github.com/mobius-ring/mobius-ring.git',
        collaborators_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/collaborators{/collaborator}',
        comments_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/comments{/number}',
        commits_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/commits{/sha}',
        compare_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/compare/{base}...{head}',
        contents_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/contents/{+path}',
        contributors_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/contributors',
        created_at: 1668054255,
        default_branch: 'main',
        deployments_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/deployments',
        description: 'Config files for my GitHub profile.',
        disabled: false,
        downloads_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/downloads',
        events_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/events',
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/forks',
        full_name: 'mobius-ring/mobius-ring',
        git_commits_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/git/commits{/sha}',
        git_refs_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/refs{/sha}',
        git_tags_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/tags{/sha}',
        git_url: 'git://github.com/mobius-ring/mobius-ring.git',
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: 'https://github.com/mobius-ring',
        hooks_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/hooks',
        html_url: 'https://github.com/mobius-ring/mobius-ring',
        id: 564141524,
        is_template: false,
        issue_comment_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/issues/comments{/number}',
        issue_events_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/issues/events{/number}',
        issues_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/issues{/number}',
        keys_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/keys{/key_id}',
        labels_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/labels{/name}',
        language: null,
        languages_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/languages',
        license: null,
        master_branch: 'main',
        merges_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/merges',
        milestones_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/milestones{/number}',
        mirror_url: null,
        name: 'mobius-ring',
        node_id: 'R_kgDOIaAd1A',
        notifications_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/notifications{?since,all,participating}',
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
          email: 'wan.junjie@foxmail.com',
          events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
          followers_url: 'https://api.github.com/users/mobius-ring/followers',
          following_url:
            'https://api.github.com/users/mobius-ring/following{/other_user}',
          gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/mobius-ring',
          id: 2344498,
          login: 'mobius-ring',
          name: 'mobius-ring',
          node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
          organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
          received_events_url:
            'https://api.github.com/users/mobius-ring/received_events',
          repos_url: 'https://api.github.com/users/mobius-ring/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/mobius-ring'
        },
        private: false,
        pulls_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/pulls{/number}',
        pushed_at: 1716210766,
        releases_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/releases{/id}',
        size: 33,
        ssh_url: 'git@github.com:mobius-ring/mobius-ring.git',
        stargazers: 0,
        stargazers_count: 0,
        stargazers_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/stargazers',
        statuses_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/statuses/{sha}',
        subscribers_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/subscribers',
        subscription_url:
          'https://api.github.com/repos/mobius-ring/mobius-ring/subscription',
        svn_url: 'https://github.com/mobius-ring/mobius-ring',
        tags_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/tags',
        teams_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/teams',
        topics: ['config', 'github-config'],
        trees_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/trees{/sha}',
        updated_at: '2024-05-20T13:03:53Z',
        url: 'https://github.com/mobius-ring/mobius-ring',
        visibility: 'public',
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false
      },
      sender: {
        avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
        events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
        followers_url: 'https://api.github.com/users/mobius-ring/followers',
        following_url:
          'https://api.github.com/users/mobius-ring/following{/other_user}',
        gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/mobius-ring',
        id: 2344498,
        login: 'mobius-ring',
        node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
        organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
        received_events_url:
          'https://api.github.com/users/mobius-ring/received_events',
        repos_url: 'https://api.github.com/users/mobius-ring/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/mobius-ring'
      }
    }

    jest.replaceProperty(context, 'payload', pushevent)
    jest.replaceProperty(context, 'eventName', 'push')
    jest.replaceProperty(context, 'actor', 'somebody')

    const resp = await main.PostGithubEvent()
    expect(runMock).toHaveReturned()
    expect(resp).toEqual(200)
    expect(debugMock).toHaveBeenNthCalledWith(1, 0)
    expect(debugMock).toHaveBeenNthCalledWith(2, 'success')

    expect(errorMock).not.toHaveBeenCalled()
  })
  /*
  it("schedule event", async () => {
    const scheduleevent = {
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/assignees{/user}",
        blobs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/branches{/branch}",
        clone_url: "https://github.com/mobius-ring/mobius-ring.git",
        collaborators_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/comments{/number}",
        commits_url: "https://api.github.com/repos/mobius-ring/mobius-ring/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/mobius-ring/mobius-ring/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/mobius-ring/mobius-ring/downloads",
        events_url: "https://api.github.com/repos/mobius-ring/mobius-ring/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/forks",
        full_name: "mobius-ring/mobius-ring",
        git_commits_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/tags{/sha}",
        git_url: "git://github.com/mobius-ring/mobius-ring.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/mobius-ring",
        hooks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/hooks",
        html_url: "https://github.com/mobius-ring/mobius-ring",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/events{/number}",
        issues_url: "https://api.github.com/repos/mobius-ring/mobius-ring/issues{/number}",
        keys_url: "https://api.github.com/repos/mobius-ring/mobius-ring/keys{/key_id}",
        labels_url: "https://api.github.com/repos/mobius-ring/mobius-ring/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/mobius-ring/mobius-ring/languages",
        license: null,
        merges_url: "https://api.github.com/repos/mobius-ring/mobius-ring/merges",
        milestones_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/milestones{/number}",
        mirror_url: null,
        name: "mobius-ring",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
          followers_url: "https://api.github.com/users/mobius-ring/followers",
          following_url:
            "https://api.github.com/users/mobius-ring/following{/other_user}",
          gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/mobius-ring",
          id: 2344498,
          login: "mobius-ring",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/mobius-ring/orgs",
          received_events_url:
            "https://api.github.com/users/mobius-ring/received_events",
          repos_url: "https://api.github.com/users/mobius-ring/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
          type: "User",
          url: "https://api.github.com/users/mobius-ring",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/mobius-ring/mobius-ring/pulls{/number}",
        pushed_at: "2024-05-20T02:50:41Z",
        releases_url: "https://api.github.com/repos/mobius-ring/mobius-ring/releases{/id}",
        size: 33,
        ssh_url: "git@github.com:mobius-ring/mobius-ring.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/stargazers",
        statuses_url: "https://api.github.com/repos/mobius-ring/mobius-ring/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/subscribers",
        subscription_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/subscription",
        svn_url: "https://github.com/mobius-ring/mobius-ring",
        tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/tags",
        teams_url: "https://api.github.com/repos/mobius-ring/mobius-ring/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/trees{/sha}",
        updated_at: "2024-05-20T02:50:44Z",
        url: "https://api.github.com/repos/mobius-ring/mobius-ring",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      schedule: "30 8 * * *",
      workflow: ".github/workflows/larkbot.yml",
    };

    jest.replaceProperty(context, "payload", scheduleevent);
    jest.replaceProperty(context, "eventName", "schedule");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });

  it("watch event", async () => {
    const watchevent = {
      action: "started",
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/assignees{/user}",
        blobs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/branches{/branch}",
        clone_url: "https://github.com/mobius-ring/mobius-ring.git",
        collaborators_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/comments{/number}",
        commits_url: "https://api.github.com/repos/mobius-ring/mobius-ring/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/mobius-ring/mobius-ring/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/mobius-ring/mobius-ring/downloads",
        events_url: "https://api.github.com/repos/mobius-ring/mobius-ring/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/forks",
        full_name: "mobius-ring/mobius-ring",
        git_commits_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/tags{/sha}",
        git_url: "git://github.com/mobius-ring/mobius-ring.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/mobius-ring",
        hooks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/hooks",
        html_url: "https://github.com/mobius-ring/mobius-ring",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/events{/number}",
        issues_url: "https://api.github.com/repos/mobius-ring/mobius-ring/issues{/number}",
        keys_url: "https://api.github.com/repos/mobius-ring/mobius-ring/keys{/key_id}",
        labels_url: "https://api.github.com/repos/mobius-ring/mobius-ring/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/mobius-ring/mobius-ring/languages",
        license: null,
        merges_url: "https://api.github.com/repos/mobius-ring/mobius-ring/merges",
        milestones_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/milestones{/number}",
        mirror_url: null,
        name: "mobius-ring",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
          followers_url: "https://api.github.com/users/mobius-ring/followers",
          following_url:
            "https://api.github.com/users/mobius-ring/following{/other_user}",
          gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/mobius-ring",
          id: 2344498,
          login: "mobius-ring",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/mobius-ring/orgs",
          received_events_url:
            "https://api.github.com/users/mobius-ring/received_events",
          repos_url: "https://api.github.com/users/mobius-ring/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
          type: "User",
          url: "https://api.github.com/users/mobius-ring",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/mobius-ring/mobius-ring/pulls{/number}",
        pushed_at: "2024-05-21T03:07:32Z",
        releases_url: "https://api.github.com/repos/mobius-ring/mobius-ring/releases{/id}",
        size: 29,
        ssh_url: "git@github.com:mobius-ring/mobius-ring.git",
        stargazers_count: 1,
        stargazers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/stargazers",
        statuses_url: "https://api.github.com/repos/mobius-ring/mobius-ring/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/subscribers",
        subscription_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/subscription",
        svn_url: "https://github.com/mobius-ring/mobius-ring",
        tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/tags",
        teams_url: "https://api.github.com/repos/mobius-ring/mobius-ring/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/trees{/sha}",
        updated_at: "2024-05-21T13:37:36Z",
        url: "https://api.github.com/repos/mobius-ring/mobius-ring",
        visibility: "public",
        watchers: 1,
        watchers_count: 1,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
        followers_url: "https://api.github.com/users/mobius-ring/followers",
        following_url:
          "https://api.github.com/users/mobius-ring/following{/other_user}",
        gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/mobius-ring",
        id: 2344498,
        login: "mobius-ring",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/mobius-ring/orgs",
        received_events_url:
          "https://api.github.com/users/mobius-ring/received_events",
        repos_url: "https://api.github.com/users/mobius-ring/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
        type: "User",
        url: "https://api.github.com/users/mobius-ring",
      },
    };

    jest.replaceProperty(context, "payload", watchevent);
    jest.replaceProperty(context, "eventName", "watch");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });

  it("release event", async () => {
    const releaseevent = {
      action: "published",
      release: {
        assets: [],
        assets_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/releases/156695832/assets",
        author: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
          followers_url: "https://api.github.com/users/mobius-ring/followers",
          following_url:
            "https://api.github.com/users/mobius-ring/following{/other_user}",
          gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/mobius-ring",
          id: 2344498,
          login: "mobius-ring",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/mobius-ring/orgs",
          received_events_url:
            "https://api.github.com/users/mobius-ring/received_events",
          repos_url: "https://api.github.com/users/mobius-ring/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
          type: "User",
          url: "https://api.github.com/users/mobius-ring",
        },
        body: "",
        created_at: "2024-05-21T03:07:32Z",
        draft: false,
        html_url: "https://github.com/mobius-ring/mobius-ring/releases/tag/v1.0.0",
        id: 156695832,
        name: "test release",
        node_id: "RE_kwDOIaAd1M4JVv0Y",
        prerelease: false,
        published_at: "2024-05-21T13:45:34Z",
        tag_name: "v1.0.0",
        tarball_url: "https://api.github.com/repos/mobius-ring/mobius-ring/tarball/v1.0.0",
        target_commitish: "main",
        upload_url:
          "https://uploads.github.com/repos/mobius-ring/mobius-ring/releases/156695832/assets{?name,label}",
        url: "https://api.github.com/repos/mobius-ring/mobius-ring/releases/156695832",
        zipball_url: "https://api.github.com/repos/mobius-ring/mobius-ring/zipball/v1.0.0",
      },
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/assignees{/user}",
        blobs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/branches{/branch}",
        clone_url: "https://github.com/mobius-ring/mobius-ring.git",
        collaborators_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/comments{/number}",
        commits_url: "https://api.github.com/repos/mobius-ring/mobius-ring/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/mobius-ring/mobius-ring/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/mobius-ring/mobius-ring/downloads",
        events_url: "https://api.github.com/repos/mobius-ring/mobius-ring/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/forks",
        full_name: "mobius-ring/mobius-ring",
        git_commits_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/tags{/sha}",
        git_url: "git://github.com/mobius-ring/mobius-ring.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/mobius-ring",
        hooks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/hooks",
        html_url: "https://github.com/mobius-ring/mobius-ring",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/events{/number}",
        issues_url: "https://api.github.com/repos/mobius-ring/mobius-ring/issues{/number}",
        keys_url: "https://api.github.com/repos/mobius-ring/mobius-ring/keys{/key_id}",
        labels_url: "https://api.github.com/repos/mobius-ring/mobius-ring/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/mobius-ring/mobius-ring/languages",
        license: null,
        merges_url: "https://api.github.com/repos/mobius-ring/mobius-ring/merges",
        milestones_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/milestones{/number}",
        mirror_url: null,
        name: "mobius-ring",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
          followers_url: "https://api.github.com/users/mobius-ring/followers",
          following_url:
            "https://api.github.com/users/mobius-ring/following{/other_user}",
          gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/mobius-ring",
          id: 2344498,
          login: "mobius-ring",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/mobius-ring/orgs",
          received_events_url:
            "https://api.github.com/users/mobius-ring/received_events",
          repos_url: "https://api.github.com/users/mobius-ring/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
          type: "User",
          url: "https://api.github.com/users/mobius-ring",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/mobius-ring/mobius-ring/pulls{/number}",
        pushed_at: "2024-05-21T03:07:32Z",
        releases_url: "https://api.github.com/repos/mobius-ring/mobius-ring/releases{/id}",
        size: 29,
        ssh_url: "git@github.com:mobius-ring/mobius-ring.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/stargazers",
        statuses_url: "https://api.github.com/repos/mobius-ring/mobius-ring/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/subscribers",
        subscription_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/subscription",
        svn_url: "https://github.com/mobius-ring/mobius-ring",
        tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/tags",
        teams_url: "https://api.github.com/repos/mobius-ring/mobius-ring/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/trees{/sha}",
        updated_at: "2024-05-21T13:42:17Z",
        url: "https://api.github.com/repos/mobius-ring/mobius-ring",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
        followers_url: "https://api.github.com/users/mobius-ring/followers",
        following_url:
          "https://api.github.com/users/mobius-ring/following{/other_user}",
        gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/mobius-ring",
        id: 2344498,
        login: "mobius-ring",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/mobius-ring/orgs",
        received_events_url:
          "https://api.github.com/users/mobius-ring/received_events",
        repos_url: "https://api.github.com/users/mobius-ring/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
        type: "User",
        url: "https://api.github.com/users/mobius-ring",
      },
    };
    jest.replaceProperty(context, "payload", releaseevent);
    jest.replaceProperty(context, "eventName", "release");
    jest.replaceProperty(context, "actor", "somebody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });

  it("delete event", async () => {
    const deleteevent = {
      pusher_type: "user",
      ref: "v1.0.0",
      ref_type: "tag",
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/assignees{/user}",
        blobs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/branches{/branch}",
        clone_url: "https://github.com/mobius-ring/mobius-ring.git",
        collaborators_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/comments{/number}",
        commits_url: "https://api.github.com/repos/mobius-ring/mobius-ring/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/mobius-ring/mobius-ring/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/mobius-ring/mobius-ring/downloads",
        events_url: "https://api.github.com/repos/mobius-ring/mobius-ring/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/forks",
        full_name: "mobius-ring/mobius-ring",
        git_commits_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/tags{/sha}",
        git_url: "git://github.com/mobius-ring/mobius-ring.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/mobius-ring",
        hooks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/hooks",
        html_url: "https://github.com/mobius-ring/mobius-ring",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/events{/number}",
        issues_url: "https://api.github.com/repos/mobius-ring/mobius-ring/issues{/number}",
        keys_url: "https://api.github.com/repos/mobius-ring/mobius-ring/keys{/key_id}",
        labels_url: "https://api.github.com/repos/mobius-ring/mobius-ring/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/mobius-ring/mobius-ring/languages",
        license: null,
        merges_url: "https://api.github.com/repos/mobius-ring/mobius-ring/merges",
        milestones_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/milestones{/number}",
        mirror_url: null,
        name: "mobius-ring",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
          followers_url: "https://api.github.com/users/mobius-ring/followers",
          following_url:
            "https://api.github.com/users/mobius-ring/following{/other_user}",
          gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/mobius-ring",
          id: 2344498,
          login: "mobius-ring",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/mobius-ring/orgs",
          received_events_url:
            "https://api.github.com/users/mobius-ring/received_events",
          repos_url: "https://api.github.com/users/mobius-ring/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
          type: "User",
          url: "https://api.github.com/users/mobius-ring",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/mobius-ring/mobius-ring/pulls{/number}",
        pushed_at: "2024-05-21T16:46:23Z",
        releases_url: "https://api.github.com/repos/mobius-ring/mobius-ring/releases{/id}",
        size: 29,
        ssh_url: "git@github.com:mobius-ring/mobius-ring.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/stargazers",
        statuses_url: "https://api.github.com/repos/mobius-ring/mobius-ring/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/subscribers",
        subscription_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/subscription",
        svn_url: "https://github.com/mobius-ring/mobius-ring",
        tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/tags",
        teams_url: "https://api.github.com/repos/mobius-ring/mobius-ring/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/trees{/sha}",
        updated_at: "2024-05-21T13:42:17Z",
        url: "https://api.github.com/repos/mobius-ring/mobius-ring",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
        followers_url: "https://api.github.com/users/mobius-ring/followers",
        following_url:
          "https://api.github.com/users/mobius-ring/following{/other_user}",
        gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/mobius-ring",
        id: 2344498,
        login: "mobius-ring",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/mobius-ring/orgs",
        received_events_url:
          "https://api.github.com/users/mobius-ring/received_events",
        repos_url: "https://api.github.com/users/mobius-ring/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
        type: "User",
        url: "https://api.github.com/users/mobius-ring",
      },
    };

    jest.replaceProperty(context, "payload", deleteevent);
    jest.replaceProperty(context, "eventName", "delete");
    jest.replaceProperty(context, "actor", "newbody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });
  
    it("create event", async () => {
        const createevent = {
            description: 'Config files for my GitHub profile.',
            master_branch: 'main',
            pusher_type: 'user',
            ref: 'v1.0.0',
            ref_type: 'tag',
            repository: {
                allow_forking: true,
                archive_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/{archive_format}{/ref}',
                archived: false,
                assignees_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/assignees{/user}',
                blobs_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/blobs{/sha}',
                branches_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/branches{/branch}',
                clone_url: 'https://github.com/mobius-ring/mobius-ring.git',
                collaborators_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/collaborators{/collaborator}',
                comments_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/comments{/number}',
                commits_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/commits{/sha}',
                compare_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/compare/{base}...{head}',
                contents_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/contents/{+path}',
                contributors_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/contributors',
                created_at: '2022-11-10T04:24:15Z',
                default_branch: 'main',
                deployments_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/deployments',
                description: 'Config files for my GitHub profile.',
                disabled: false,
                downloads_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/downloads',
                events_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/events',
                fork: false,
                forks: 0,
                forks_count: 0,
                forks_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/forks',
                full_name: 'mobius-ring/mobius-ring',
                git_commits_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/commits{/sha}',
                git_refs_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/refs{/sha}',
                git_tags_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/tags{/sha}',
                git_url: 'git://github.com/mobius-ring/mobius-ring.git',
                has_discussions: false,
                has_downloads: true,
                has_issues: false,
                has_pages: false,
                has_projects: true,
                has_wiki: false,
                homepage: 'https://github.com/mobius-ring',
                hooks_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/hooks',
                html_url: 'https://github.com/mobius-ring/mobius-ring',
                id: 564141524,
                is_template: false,
                issue_comment_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/issues/comments{/number}',
                issue_events_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/issues/events{/number}',
                issues_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/issues{/number}',
                keys_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/keys{/key_id}',
                labels_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/labels{/name}',
                language: null,
                languages_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/languages',
                license: null,
                merges_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/merges',
                milestones_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/milestones{/number}',
                mirror_url: null,
                name: 'mobius-ring',
                node_id: 'R_kgDOIaAd1A',
                notifications_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/notifications{?since,all,participating}',
                open_issues: 0,
                open_issues_count: 0,
                owner: {
                    avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
                    events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
                    followers_url: 'https://api.github.com/users/mobius-ring/followers',
                    following_url: 'https://api.github.com/users/mobius-ring/following{/other_user}',
                    gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
                    gravatar_id: '',
                    html_url: 'https://github.com/mobius-ring',
                    id: 2344498,
                    login: 'mobius-ring',
                    node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
                    organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
                    received_events_url: 'https://api.github.com/users/mobius-ring/received_events',
                    repos_url: 'https://api.github.com/users/mobius-ring/repos',
                    site_admin: false,
                    starred_url: 'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
                    subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
                    type: 'User',
                    url: 'https://api.github.com/users/mobius-ring'
                },
                private: false,
                pulls_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/pulls{/number}',
                pushed_at: '2024-05-21T13:45:34Z',
                releases_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/releases{/id}',
                size: 29,
                ssh_url: 'git@github.com:mobius-ring/mobius-ring.git',
                stargazers_count: 0,
                stargazers_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/stargazers',
                statuses_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/statuses/{sha}',
                subscribers_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/subscribers',
                subscription_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/subscription',
                svn_url: 'https://github.com/mobius-ring/mobius-ring',
                tags_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/tags',
                teams_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/teams',
                topics: ['config', 'github-config'],
                trees_url: 'https://api.github.com/repos/mobius-ring/mobius-ring/git/trees{/sha}',
                updated_at: '2024-05-21T13:42:17Z',
                url: 'https://api.github.com/repos/mobius-ring/mobius-ring',
                visibility: 'public',
                watchers: 0,
                watchers_count: 0,
                web_commit_signoff_required: false
            },
            sender: {
                avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
                events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
                followers_url: 'https://api.github.com/users/mobius-ring/followers',
                following_url: 'https://api.github.com/users/mobius-ring/following{/other_user}',
                gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
                gravatar_id: '',
                html_url: 'https://github.com/mobius-ring',
                id: 2344498,
                login: 'mobius-ring',
                node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
                organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
                received_events_url: 'https://api.github.com/users/mobius-ring/received_events',
                repos_url: 'https://api.github.com/users/mobius-ring/repos',
                site_admin: false,
                starred_url: 'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
                type: 'User',
                url: 'https://api.github.com/users/mobius-ring'
            }
        }

        jest.replaceProperty(context, "payload", createevent);
        jest.replaceProperty(context, "eventName", "create");
        jest.replaceProperty(context, "actor", "newbody");

        const resp = await main.PostGithubEvent();
        expect(runMock).toHaveReturned();
        expect(resp).toEqual(200);
        expect(debugMock).toHaveBeenNthCalledWith(1, 0);
        expect(debugMock).toHaveBeenNthCalledWith(2, "success");

        expect(errorMock).not.toHaveBeenCalled();
    })
  
  it("branch rule event", async () => {
    const branchruleevent = {
      action: "created",
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/assignees{/user}",
        blobs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/branches{/branch}",
        clone_url: "https://github.com/mobius-ring/mobius-ring.git",
        collaborators_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/comments{/number}",
        commits_url: "https://api.github.com/repos/mobius-ring/mobius-ring/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/mobius-ring/mobius-ring/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/mobius-ring/mobius-ring/downloads",
        events_url: "https://api.github.com/repos/mobius-ring/mobius-ring/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/forks",
        full_name: "mobius-ring/mobius-ring",
        git_commits_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/tags{/sha}",
        git_url: "git://github.com/mobius-ring/mobius-ring.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/mobius-ring",
        hooks_url: "https://api.github.com/repos/mobius-ring/mobius-ring/hooks",
        html_url: "https://github.com/mobius-ring/mobius-ring",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/issues/events{/number}",
        issues_url: "https://api.github.com/repos/mobius-ring/mobius-ring/issues{/number}",
        keys_url: "https://api.github.com/repos/mobius-ring/mobius-ring/keys{/key_id}",
        labels_url: "https://api.github.com/repos/mobius-ring/mobius-ring/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/mobius-ring/mobius-ring/languages",
        license: null,
        merges_url: "https://api.github.com/repos/mobius-ring/mobius-ring/merges",
        milestones_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/milestones{/number}",
        mirror_url: null,
        name: "mobius-ring",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
          followers_url: "https://api.github.com/users/mobius-ring/followers",
          following_url:
            "https://api.github.com/users/mobius-ring/following{/other_user}",
          gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/mobius-ring",
          id: 2344498,
          login: "mobius-ring",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/mobius-ring/orgs",
          received_events_url:
            "https://api.github.com/users/mobius-ring/received_events",
          repos_url: "https://api.github.com/users/mobius-ring/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
          type: "User",
          url: "https://api.github.com/users/mobius-ring",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/mobius-ring/mobius-ring/pulls{/number}",
        pushed_at: "2024-05-21T16:46:23Z",
        releases_url: "https://api.github.com/repos/mobius-ring/mobius-ring/releases{/id}",
        size: 29,
        ssh_url: "git@github.com:mobius-ring/mobius-ring.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/stargazers",
        statuses_url: "https://api.github.com/repos/mobius-ring/mobius-ring/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/mobius-ring/mobius-ring/subscribers",
        subscription_url:
          "https://api.github.com/repos/mobius-ring/mobius-ring/subscription",
        svn_url: "https://github.com/mobius-ring/mobius-ring",
        tags_url: "https://api.github.com/repos/mobius-ring/mobius-ring/tags",
        teams_url: "https://api.github.com/repos/mobius-ring/mobius-ring/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/mobius-ring/mobius-ring/git/trees{/sha}",
        updated_at: "2024-05-21T13:42:17Z",
        url: "https://api.github.com/repos/mobius-ring/mobius-ring",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      rule: {
        admin_enforced: false,
        allow_deletions_enforcement_level: "off",
        allow_force_pushes_enforcement_level: "off",
        authorized_actor_names: [],
        authorized_actors_only: false,
        authorized_dismissal_actors_only: false,
        create_protected: false,
        created_at: "2024-05-22T08:48:38.000+08:00",
        dismiss_stale_reviews_on_push: false,
        id: 50492837,
        ignore_approvals_from_contributors: false,
        linear_history_requirement_enforcement_level: "off",
        merge_queue_enforcement_level: "off",
        name: "main",
        pull_request_reviews_enforcement_level: "off",
        repository_id: 564141524,
        require_code_owner_review: false,
        require_last_push_approval: false,
        required_approving_review_count: 1,
        required_conversation_resolution_level: "off",
        required_deployments_enforcement_level: "off",
        required_status_checks: [],
        required_status_checks_enforcement_level: "non_admins",
        signature_requirement_enforcement_level: "non_admins",
        strict_required_status_checks_policy: true,
        updated_at: "2024-05-22T08:48:38.000+08:00",
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/mobius-ring/events{/privacy}",
        followers_url: "https://api.github.com/users/mobius-ring/followers",
        following_url:
          "https://api.github.com/users/mobius-ring/following{/other_user}",
        gists_url: "https://api.github.com/users/mobius-ring/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/mobius-ring",
        id: 2344498,
        login: "mobius-ring",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/mobius-ring/orgs",
        received_events_url:
          "https://api.github.com/users/mobius-ring/received_events",
        repos_url: "https://api.github.com/users/mobius-ring/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/mobius-ring/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/mobius-ring/subscriptions",
        type: "User",
        url: "https://api.github.com/users/mobius-ring",
      },
    };

    jest.replaceProperty(context, "payload", branchruleevent);
    jest.replaceProperty(context, "eventName", "branch_protection_rule");
    jest.replaceProperty(context, "actor", "nbody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });
  */
  it('issue open event', async () => {
    const issueevent = {
      action: 'opened',
      issue: {
        active_lock_reason: null,
        assignee: null,
        assignees: [],
        author_association: 'OWNER',
        body: 'we need it',
        closed_at: null,
        comments: 0,
        comments_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/comments',
        created_at: '2024-05-27T11:44:36Z',
        events_url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/events',
        html_url: 'https://github.com/mobius-ring/pycbpf/issues/1',
        id: 2318960959,
        labels: [],
        labels_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/labels{/name}',
        locked: false,
        milestone: null,
        node_id: 'I_kwDOJlGsVc6KOIk_',
        number: 1,
        performed_via_github_app: null,
        reactions: {
          '+1': 0,
          '-1': 0,
          confused: 0,
          eyes: 0,
          heart: 0,
          hooray: 0,
          laugh: 0,
          rocket: 0,
          total_count: 0,
          url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/reactions'
        },
        repository_url: 'https://api.github.com/repos/mobius-ring/pycbpf',
        state: 'open',
        state_reason: null,
        timeline_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/timeline',
        title: 'test issue',
        updated_at: '2024-05-27T11:44:37Z',
        url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/1',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
          events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
          followers_url: 'https://api.github.com/users/mobius-ring/followers',
          following_url:
            'https://api.github.com/users/mobius-ring/following{/other_user}',
          gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/mobius-ring',
          id: 2344498,
          login: 'mobius-ring',
          node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
          organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
          received_events_url:
            'https://api.github.com/users/mobius-ring/received_events',
          repos_url: 'https://api.github.com/users/mobius-ring/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/mobius-ring'
        }
      },
      repository: {
        allow_forking: true,
        archive_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/{archive_format}{/ref}',
        archived: false,
        assignees_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/assignees{/user}',
        blobs_url: 'https://api.github.com/repos/mobius-ring/pycbpf/git/blobs{/sha}',
        branches_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/branches{/branch}',
        clone_url: 'https://github.com/mobius-ring/pycbpf.git',
        collaborators_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/collaborators{/collaborator}',
        comments_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/comments{/number}',
        commits_url: 'https://api.github.com/repos/mobius-ring/pycbpf/commits{/sha}',
        compare_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/compare/{base}...{head}',
        contents_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/contents/{+path}',
        contributors_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/contributors',
        created_at: '2023-05-19T15:10:31Z',
        default_branch: 'main',
        deployments_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/deployments',
        description: 'python script which compile cbpf to C code for BCC',
        disabled: false,
        downloads_url: 'https://api.github.com/repos/mobius-ring/pycbpf/downloads',
        events_url: 'https://api.github.com/repos/mobius-ring/pycbpf/events',
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: 'https://api.github.com/repos/mobius-ring/pycbpf/forks',
        full_name: 'mobius-ring/pycbpf',
        git_commits_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/git/commits{/sha}',
        git_refs_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/git/refs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/git/tags{/sha}',
        git_url: 'git://github.com/mobius-ring/pycbpf.git',
        has_discussions: false,
        has_downloads: true,
        has_issues: true,
        has_pages: false,
        has_projects: true,
        has_wiki: true,
        homepage: '',
        hooks_url: 'https://api.github.com/repos/mobius-ring/pycbpf/hooks',
        html_url: 'https://github.com/mobius-ring/pycbpf',
        id: 642886741,
        is_template: false,
        issue_comment_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/comments{/number}',
        issue_events_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/events{/number}',
        issues_url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues{/number}',
        keys_url: 'https://api.github.com/repos/mobius-ring/pycbpf/keys{/key_id}',
        labels_url: 'https://api.github.com/repos/mobius-ring/pycbpf/labels{/name}',
        language: 'Python',
        languages_url: 'https://api.github.com/repos/mobius-ring/pycbpf/languages',
        license: {
          key: 'mit',
          name: 'MIT License',
          node_id: 'MDc6TGljZW5zZTEz',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit'
        },
        merges_url: 'https://api.github.com/repos/mobius-ring/pycbpf/merges',
        milestones_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/milestones{/number}',
        mirror_url: null,
        name: 'pycbpf',
        node_id: 'R_kgDOJlGsVQ',
        notifications_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/notifications{?since,all,participating}',
        open_issues: 1,
        open_issues_count: 1,
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
          events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
          followers_url: 'https://api.github.com/users/mobius-ring/followers',
          following_url:
            'https://api.github.com/users/mobius-ring/following{/other_user}',
          gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/mobius-ring',
          id: 2344498,
          login: 'mobius-ring',
          node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
          organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
          received_events_url:
            'https://api.github.com/users/mobius-ring/received_events',
          repos_url: 'https://api.github.com/users/mobius-ring/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/mobius-ring'
        },
        private: false,
        pulls_url: 'https://api.github.com/repos/mobius-ring/pycbpf/pulls{/number}',
        pushed_at: '2024-05-27T11:41:05Z',
        releases_url: 'https://api.github.com/repos/mobius-ring/pycbpf/releases{/id}',
        size: 57,
        ssh_url: 'git@github.com:mobius-ring/pycbpf.git',
        stargazers_count: 0,
        stargazers_url: 'https://api.github.com/repos/mobius-ring/pycbpf/stargazers',
        statuses_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/statuses/{sha}',
        subscribers_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/subscribers',
        subscription_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/subscription',
        svn_url: 'https://github.com/mobius-ring/pycbpf',
        tags_url: 'https://api.github.com/repos/mobius-ring/pycbpf/tags',
        teams_url: 'https://api.github.com/repos/mobius-ring/pycbpf/teams',
        topics: ['bcc', 'cbpf', 'ebpf', 'packet-capture', 'tcpdump'],
        trees_url: 'https://api.github.com/repos/mobius-ring/pycbpf/git/trees{/sha}',
        updated_at: '2024-05-27T11:41:08Z',
        url: 'https://api.github.com/repos/mobius-ring/pycbpf',
        visibility: 'public',
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false
      },
      sender: {
        avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
        events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
        followers_url: 'https://api.github.com/users/mobius-ring/followers',
        following_url:
          'https://api.github.com/users/mobius-ring/following{/other_user}',
        gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/mobius-ring',
        id: 2344498,
        login: 'mobius-ring',
        node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
        organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
        received_events_url:
          'https://api.github.com/users/mobius-ring/received_events',
        repos_url: 'https://api.github.com/users/mobius-ring/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/mobius-ring'
      }
    }
    jest.replaceProperty(context, 'payload', issueevent)
    jest.replaceProperty(context, 'eventName', 'issue')
    jest.replaceProperty(context, 'actor', 'nbody')

    const resp = await main.PostGithubEvent()
    expect(runMock).toHaveReturned()
    expect(resp).toEqual(200)
    expect(debugMock).toHaveBeenNthCalledWith(1, 0)
    expect(debugMock).toHaveBeenNthCalledWith(2, 'success')

    expect(errorMock).not.toHaveBeenCalled()
  })

  it('issue comment event', async () => {
    const issue_comment_event = {
      action: 'created',
      comment: {
        author_association: 'OWNER',
        body: 'heihei',
        created_at: '2024-05-27T12:20:43Z',
        html_url:
          'https://github.com/mobius-ring/pycbpf/issues/1#issuecomment-2133366811',
        id: 2133366811,
        issue_url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/1',
        node_id: 'IC_kwDOJlGsVc5_KJgb',
        performed_via_github_app: null,
        reactions: {
          '+1': 0,
          '-1': 0,
          confused: 0,
          eyes: 0,
          heart: 0,
          hooray: 0,
          laugh: 0,
          rocket: 0,
          total_count: 0,
          url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/comments/2133366811/reactions'
        },
        updated_at: '2024-05-27T12:20:43Z',
        url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/comments/2133366811',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
          events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
          followers_url: 'https://api.github.com/users/mobius-ring/followers',
          following_url:
            'https://api.github.com/users/mobius-ring/following{/other_user}',
          gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/mobius-ring',
          id: 2344498,
          login: 'mobius-ring',
          node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
          organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
          received_events_url:
            'https://api.github.com/users/mobius-ring/received_events',
          repos_url: 'https://api.github.com/users/mobius-ring/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/mobius-ring'
        }
      },
      issue: {
        active_lock_reason: null,
        assignee: {
          avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
          events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
          followers_url: 'https://api.github.com/users/mobius-ring/followers',
          following_url:
            'https://api.github.com/users/mobius-ring/following{/other_user}',
          gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/mobius-ring',
          id: 2344498,
          login: 'mobius-ring',
          node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
          organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
          received_events_url:
            'https://api.github.com/users/mobius-ring/received_events',
          repos_url: 'https://api.github.com/users/mobius-ring/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/mobius-ring'
        },
        assignees: [[Object]],
        author_association: 'OWNER',
        body: 'we need it',
        closed_at: null,
        comments: 2,
        comments_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/comments',
        created_at: '2024-05-27T11:44:36Z',
        events_url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/events',
        html_url: 'https://github.com/mobius-ring/pycbpf/issues/1',
        id: 2318960959,
        labels: [[Object], [Object]],
        labels_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/labels{/name}',
        locked: false,
        milestone: null,
        node_id: 'I_kwDOJlGsVc6KOIk_',
        number: 1,
        performed_via_github_app: null,
        reactions: {
          '+1': 0,
          '-1': 0,
          confused: 0,
          eyes: 0,
          heart: 0,
          hooray: 0,
          laugh: 0,
          rocket: 0,
          total_count: 0,
          url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/reactions'
        },
        repository_url: 'https://api.github.com/repos/mobius-ring/pycbpf',
        state: 'open',
        state_reason: null,
        timeline_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/1/timeline',
        title: 'test issue',
        updated_at: '2024-05-27T12:20:44Z',
        url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues/1',
        user: {
          avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
          events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
          followers_url: 'https://api.github.com/users/mobius-ring/followers',
          following_url:
            'https://api.github.com/users/mobius-ring/following{/other_user}',
          gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/mobius-ring',
          id: 2344498,
          login: 'mobius-ring',
          node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
          organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
          received_events_url:
            'https://api.github.com/users/mobius-ring/received_events',
          repos_url: 'https://api.github.com/users/mobius-ring/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/mobius-ring'
        }
      },
      repository: {
        allow_forking: true,
        archive_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/{archive_format}{/ref}',
        archived: false,
        assignees_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/assignees{/user}',
        blobs_url: 'https://api.github.com/repos/mobius-ring/pycbpf/git/blobs{/sha}',
        branches_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/branches{/branch}',
        clone_url: 'https://github.com/mobius-ring/pycbpf.git',
        collaborators_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/collaborators{/collaborator}',
        comments_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/comments{/number}',
        commits_url: 'https://api.github.com/repos/mobius-ring/pycbpf/commits{/sha}',
        compare_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/compare/{base}...{head}',
        contents_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/contents/{+path}',
        contributors_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/contributors',
        created_at: '2023-05-19T15:10:31Z',
        default_branch: 'main',
        deployments_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/deployments',
        description: 'python script which compile cbpf to C code for BCC',
        disabled: false,
        downloads_url: 'https://api.github.com/repos/mobius-ring/pycbpf/downloads',
        events_url: 'https://api.github.com/repos/mobius-ring/pycbpf/events',
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: 'https://api.github.com/repos/mobius-ring/pycbpf/forks',
        full_name: 'mobius-ring/pycbpf',
        git_commits_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/git/commits{/sha}',
        git_refs_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/git/refs{/sha}',
        git_tags_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/git/tags{/sha}',
        git_url: 'git://github.com/mobius-ring/pycbpf.git',
        has_discussions: false,
        has_downloads: true,
        has_issues: true,
        has_pages: false,
        has_projects: true,
        has_wiki: true,
        homepage: '',
        hooks_url: 'https://api.github.com/repos/mobius-ring/pycbpf/hooks',
        html_url: 'https://github.com/mobius-ring/pycbpf',
        id: 642886741,
        is_template: false,
        issue_comment_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/comments{/number}',
        issue_events_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/issues/events{/number}',
        issues_url: 'https://api.github.com/repos/mobius-ring/pycbpf/issues{/number}',
        keys_url: 'https://api.github.com/repos/mobius-ring/pycbpf/keys{/key_id}',
        labels_url: 'https://api.github.com/repos/mobius-ring/pycbpf/labels{/name}',
        language: 'Python',
        languages_url: 'https://api.github.com/repos/mobius-ring/pycbpf/languages',
        license: {
          key: 'mit',
          name: 'MIT License',
          node_id: 'MDc6TGljZW5zZTEz',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit'
        },
        merges_url: 'https://api.github.com/repos/mobius-ring/pycbpf/merges',
        milestones_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/milestones{/number}',
        mirror_url: null,
        name: 'pycbpf',
        node_id: 'R_kgDOJlGsVQ',
        notifications_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/notifications{?since,all,participating}',
        open_issues: 1,
        open_issues_count: 1,
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
          events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
          followers_url: 'https://api.github.com/users/mobius-ring/followers',
          following_url:
            'https://api.github.com/users/mobius-ring/following{/other_user}',
          gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
          gravatar_id: '',
          html_url: 'https://github.com/mobius-ring',
          id: 2344498,
          login: 'mobius-ring',
          node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
          organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
          received_events_url:
            'https://api.github.com/users/mobius-ring/received_events',
          repos_url: 'https://api.github.com/users/mobius-ring/repos',
          site_admin: false,
          starred_url:
            'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
          type: 'User',
          url: 'https://api.github.com/users/mobius-ring'
        },
        private: false,
        pulls_url: 'https://api.github.com/repos/mobius-ring/pycbpf/pulls{/number}',
        pushed_at: '2024-05-27T11:41:05Z',
        releases_url: 'https://api.github.com/repos/mobius-ring/pycbpf/releases{/id}',
        size: 57,
        ssh_url: 'git@github.com:mobius-ring/pycbpf.git',
        stargazers_count: 0,
        stargazers_url: 'https://api.github.com/repos/mobius-ring/pycbpf/stargazers',
        statuses_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/statuses/{sha}',
        subscribers_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/subscribers',
        subscription_url:
          'https://api.github.com/repos/mobius-ring/pycbpf/subscription',
        svn_url: 'https://github.com/mobius-ring/pycbpf',
        tags_url: 'https://api.github.com/repos/mobius-ring/pycbpf/tags',
        teams_url: 'https://api.github.com/repos/mobius-ring/pycbpf/teams',
        topics: ['bcc', 'cbpf', 'ebpf', 'packet-capture', 'tcpdump'],
        trees_url: 'https://api.github.com/repos/mobius-ring/pycbpf/git/trees{/sha}',
        updated_at: '2024-05-27T11:41:08Z',
        url: 'https://api.github.com/repos/mobius-ring/pycbpf',
        visibility: 'public',
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false
      },
      sender: {
        avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
        events_url: 'https://api.github.com/users/mobius-ring/events{/privacy}',
        followers_url: 'https://api.github.com/users/mobius-ring/followers',
        following_url:
          'https://api.github.com/users/mobius-ring/following{/other_user}',
        gists_url: 'https://api.github.com/users/mobius-ring/gists{/gist_id}',
        gravatar_id: '',
        html_url: 'https://github.com/mobius-ring',
        id: 2344498,
        login: 'mobius-ring',
        node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
        organizations_url: 'https://api.github.com/users/mobius-ring/orgs',
        received_events_url:
          'https://api.github.com/users/mobius-ring/received_events',
        repos_url: 'https://api.github.com/users/mobius-ring/repos',
        site_admin: false,
        starred_url:
          'https://api.github.com/users/mobius-ring/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/mobius-ring/subscriptions',
        type: 'User',
        url: 'https://api.github.com/users/mobius-ring'
      }
    }

    jest.replaceProperty(context, 'payload', issue_comment_event)
    jest.replaceProperty(context, 'eventName', 'issue_comment')
    jest.replaceProperty(context, 'actor', 'nbody')

    const resp = await main.PostGithubEvent()
    expect(runMock).toHaveReturned()
    expect(resp).toEqual(200)
    expect(debugMock).toHaveBeenNthCalledWith(1, 0)
    expect(debugMock).toHaveBeenNthCalledWith(2, 'success')

    expect(errorMock).not.toHaveBeenCalled()
  })
})
