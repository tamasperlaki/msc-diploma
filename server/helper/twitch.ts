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
  return callTwitchApi('GET', `/users?login=${users.join()}`);
}

function checkUserFollowsChannel(userId: string, channelId: string): Promise<any> {
  return callTwitchApi('GET', `/users/${userId}/follows/channels/${channelId}`);
}

function getChatters(channelName: string): Promise<any> {
  return callTwitchPublicApi('GET', `/${channelName}/chatters`);
}

export default {
  getToken: getToken,
  getUser: getUser,
  getChannel: getChannel,
  getUsers: getUsers,
  checkUserFollowsChannel: checkUserFollowsChannel,
  getChatters: getChatters
};

function callTwitchPublicApi(method: string, path: string): Promise<any> {
  console.log(`Twitch Public API call - ${path}`);

  const requestOptions = {
    method: method,
    hostname: 'tmi.twitch.tv',
    path: `/group/user${path}`
  };

  return callTwitchApiCore(requestOptions);
}

function callTwitchApi(method: string, path: string, token: string = null): Promise<any> {
  console.log(`Twitch API call - ${path}`);

  const requestOptions = {
    method: method,
    hostname: 'api.twitch.tv',
    path: `/kraken${path}`,
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      'Authorization': `OAuth ${token}`
    }
  };

  return callTwitchApiCore(requestOptions);
}

function callTwitchApiCore(requestOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = https.request(requestOptions, responseHandler);

    request.on('error', (e) => {
      console.error(`Twitch API call - problem with request: ${e.message}`);
      reject();
    });
    request.end();

    function responseHandler(response: IncomingMessage) {
      let data = '';

      console.log(`Twitch API call - response STATUS: ${response.statusCode}`);
      console.log(`Twitch API call - response HEADERS: ${response.headers}`);
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
