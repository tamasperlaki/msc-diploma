import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as logger from 'morgan';
import * as session from 'express-session';
import { User } from './models/user';
import botManager from './helper/botManager';
import mongoose from './config/db';
import * as connectMongo from 'connect-mongo';

const app: express.Express = express();
const MongoStore = connectMongo(session);

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

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

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   var err = new Error('Not Found');
//   err['status'] = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {

//   app.use((error: any, req, res, next) => {
//     res.status(error['status'] || 500);
//     res.render('error', {
//       message: error.message,
//       error
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use((error: any, req, res, next) => {
//   res.status(error['status'] || 500);
//   res.render('error', {
//     message: error.message,
//     error: {}
//   });
//   return null;
// });

const port = normalizePort(process.env.NODE_ENV === 'development' ? '3000' : (process.env.PORT || '4200'));

app.listen(port);

User.find()
  .populate('commands')
  .then((users) => {
    botManager.startBots(users);
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
