import { IncomingMessage } from 'http';
import * as https from 'https';
import * as _ from 'lodash';

const clientId = 'vavdv2xlcwtdolf46py3yi3dskvdp3',
      clientSecret = 'nhzj6jrbzonw67poseygbz6e2pk1qt';

export default {

  getToken(authCode): Promise<any> {
      const redirectUrl = `http://localhost:4200/api/twitchAuth/callback`,
            tokenAuthPath =
              '/oauth2/token'
              + `?client_id=${clientId}`
              + `&client_secret=${clientSecret}`
              + `&code=${authCode}`
              + `&redirect_uri=${redirectUrl}`
              + `&grant_type=authorization_code`;

      return callTwitchApi('POST', tokenAuthPath);
  },

  getUser(token): Promise<any> {
      return callTwitchApi('GET', '/user', token);
  }
};

function callTwitchApi(method, path, token = null): Promise<any> {
  console.error(`Twitch API call - ${path}`);

  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: method,
      hostname: 'api.twitch.tv',
      path: `/kraken${path}`,
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': clientId,
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
