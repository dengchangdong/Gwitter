import axios from 'axios';
import config from '../config';

export const createAuthenticatedApi = (token: string) => {
  return axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
      Accept: 'application/json',
      Authorization: `bearer ${token}`,
    },
  });
};

export const api = createAuthenticatedApi(config.request.token.join(''));

interface GetIssuesQLParams {
  owner: string;
  repo: string;
  cursor: string | null;
  pageSize: number;
}

export const getIssuesQL = (vars: GetIssuesQLParams) => {
  const ql = `
  query getIssues($owner: String!, $repo: String!, $cursor: String, $pageSize: Int!) {
    repository(owner: $owner, name: $repo) {
      issues(first: $pageSize, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}, filterBy: {${config.app.onlyShowOwner ? 'createdBy: $owner,' : ''} states: OPEN}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          number
          createdAt
          bodyHTML
          title
          url
          author {
            login
            avatarUrl
            url
          }

          labels(first: 1) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
  }
  `;

  if (vars.cursor === null) {
    Reflect.deleteProperty(vars, 'cursor');
  }

  return {
    operationName: 'getIssues',
    query: ql,
    variables: vars,
  };
};

interface GetLabelsParams {
  owner: string;
  repo: string;
}

export const getLabelsQL = ({ owner, repo }: GetLabelsParams) => ({
  query: `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        labels(first: 100) {
          nodes {
            name
            color
          }
        }
      }
    }
  `,
});

// Get issue reactions
interface GetIssueReactionsParams {
  owner: string;
  repo: string;
  issueNumber: number;
}

        issue(number: ${issueNumber}) {
export const getUserInfo = async (token: string) => {
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return response.data;
};

export const getAccessToken = async (code: string) => {
  const response = await axios.post(config.request.autoProxy, {
    client_id: config.request.clientID,
    client_secret: config.request.clientSecret,
    code,
  });
  return response.data;
};
