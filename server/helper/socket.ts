import * as Server from 'socket.io';
import * as cookie from 'cookie';
import mongoStore from '../config/mongoStore';

const socketsByUserId = new Map<string, string>();
const io = Server();

io.on('connection', socket => {
  const parsedCookie = cookie.parse(socket.handshake.headers['cookie']);
  const rawSessionSid = parsedCookie['sessionId'];
  const sessionSid = getSessionSidFromRaw(rawSessionSid);
  let userId;

  console.log(`User connected to websocket with sid: ${sessionSid}`);

  mongoStore.get(sessionSid, (error, session) => {
    userId = session.userId;
    socketsByUserId.set(session.userId, socket.id);
  });

  socket.on('disconnect', () => {
    socketsByUserId.delete(userId);
    console.log(`User disconnected from websocket with sid: ${sessionSid}`);
  });

  socket.on('error', error => {
    socketsByUserId.delete(userId);
    console.error(error);
  });
});

function getSessionSidFromRaw(raw: string) {
  raw = raw.slice(2);
  const dotIndex = raw.indexOf('.');
  const sessionSid = raw.slice(0, dotIndex);

  return sessionSid;
}

function getSocketIdByUserId(userId: string) {
  return socketsByUserId.get(userId);
}

export { io, getSocketIdByUserId };
