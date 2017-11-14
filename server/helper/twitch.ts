import { IncomingMessage } from 'http';
import * as https from 'https';
import * as _ from 'lodash';

function getToken(authCode: string): Promise<any> {
  const tokenAuthPath =
          '/oauth2/token'
          + `?client_id=${process.env.TWITCH_CLIENT_ID}`
          + `&client_secret=${process.env.TWITCH_CLIENT_SECRET}`
          + `&code=${authCode}`
          + `&redirect_uri=${process.env.TWITCH_REDIRECT_URI}`
          + `&grant_type=authorization_code`;

  return callTwitchApi('POST', tokenAuthPath);
}

function getUser(token: string): Promise<any> {
  return callTwitchApi('GET', '/user', token);
}

function getChannel(token: string): Promise<any> {
  return callTwitchApi('GET', '/channel', token);
}

function getUsers(users: string[], token: string): Promise<any> {
  return callTwitchApi('GET', `/users?login=${users.concat(',')}`);
}

function checkUserFollowsChannel(userId: string, channelId: string): Promise<any> {
  return callTwitchApi('GET', `/users/${userId}/follows/channels/${channelId}`);
}

export default {
  getToken: getToken,
  getUser: getUser,
  getChannel: getChannel,
  getUsers: getUsers,
  checkUserFollowsChannel: checkUserFollowsChannel
};

function callTwitchApi(method: string, path: string, token: string = null): Promise<any> {
  console.log(`Twitch API call - ${path}`);

  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: method,
      hostname: 'api.twitch.tv',
      path: `/kraken${path}`,
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `OAuth ${token}`
      }
    },
    request = https.request(requestOptions, responseHandler);

    request.on('error', (e) => {
      console.error(`Twitch API call - problem with request: ${e.message}`);
      reject();
    });
    request.end();

    function responseHandler(response: IncomingMessage) {
      let data = '';

      console.log(`Twitch API call - response STATUS: ${response.statusCode}`);
      console.log(`Twitch API call - response HEADERS: ${JSON.stringify(response.headers)}`);
      response.setEncoding('utf8');
      response.on('data', chunk => {
        console.log(`Twitch API call - response CHUNK: ${chunk}`);
        data += chunk;
      });
      response.on('end', () => {
        console.log(`Twitch API call - response DATA: ${data}`);

        if (response.statusCode !== 200) {
          reject(response.statusCode);
        } else {
          resolve(JSON.parse(data));
        }
      });
    }
  });
}
