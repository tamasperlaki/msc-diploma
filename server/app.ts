import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as logger from 'morgan';
import * as session from 'express-session';
import * as express_enforce_ssl from 'express-enforces-ssl';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as http from 'http';
import { isEmpty } from 'lodash';
import { User } from '../models/user';
import botManager from './helper/botManager';
import mongoStore from './config/mongoStore';
import { io } from './helper/socket';
import redis from './config/redis';

const app: express.Express = express();

const sessionConfig: any = {
  name: 'sessionId',
  secret: 'tlnuFR7IGubYWKW05PGnQ$~VP',
  resave: false,
  saveUninitialized: true,
  store: mongoStore
};

if (app.get('env') === 'production') {
  app.enable('trust proxy');
  app.use(express_enforce_ssl());
  app.use(helmet());

  sessionConfig.secure = true;
  sessionConfig.httpOnly = true;
  sessionConfig.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
}

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(csurf());

app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return next();
});

// routes
const routeModules = require('require-all')({
  dirname: __dirname + '/controller',
  filter: (filename: string) => {
    filename = filename.toLowerCase();
    if ((filename.endsWith('.ts') && !filename.endsWith('.spec.ts'))
      || (filename.endsWith('.js') && !filename.endsWith('.spec.js'))) {
      return filename.substr(0, filename.length - 3);
    }
  },
  map: name => '/' + name
});
function resolve(root: string, modules): void {
  for (const name of Object.keys(modules)) {
    if (!name.startsWith('/')) {
      return;
    }
    const module = modules[name];
    if (module.default && module.default.route) {
      console.log(`Add router ${root + name}`);
      const router = module.default as express.Router;
      app.use(root, router);
    } else {
      resolve(root + name, module);
    }
  }
}
resolve('', routeModules);

// Default to main page, angular route takes over
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  // development error handler
  // will print stacktrace
  app.use((error: any, req, res, next) => {
    console.error(error);
    res.status(error['status'] || res.statusCode || 500);

    const json = JSON.stringify(error);
    if (isEmpty(JSON.parse(json))) {
      return res.send(error.message);
    } else {
      return res.send(error);
    }
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((error: any, req, res, next) => {
    console.error(error);
    res.status(error['status'] || res.statusCode || 500);
    return res.send(error.message);
  });
}

const port = normalizePort(process.env.PORT || '4200');
const server = http.createServer(app);

io.attach(server);
server.listen(port);

User.find()
  .then((users) => {
    botManager.startBots(users);
  })
  .catch(error => {
    console.error(error);
    process.abort();
  });

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any): number | string | boolean {
  const portInt = parseInt(val, 10);

  if (isNaN(portInt)) {
    // named pipe
    return val;
  }

  if (portInt >= 0) {
    // port number
    return portInt;
  }

  return false;
}
