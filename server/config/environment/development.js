const path = require('path');
module.exports = {
  db: {
    mysql: {
      host: '127.0.0.1',
      user: 'root',
      password: '123',
      database: 'my_vue_blog',
      connectionLimit: 10
    },
    redis: {
      port: 6379,
      host: '127.0.0.1',
      db: 3,
      options: {
        return_buffers: false,
        auth_pass: ''
      }
    }
  },
  oAuth: {
    github: {
      client_id: 'b0fbc6a7d4ff2b320158',
      client_secret: 'a02a9f6bac91f3acee2dc8aae86513bc2a94a6b6'
    }
  },
  root: path.normalize(__dirname + '/..'),
  appPath: 'src',
  tempUploads: 'tempUploads',
  uploads: 'uploads',
  port: 9000,
  tokenSecret: 'test',
  isUpdateAdmin: false,
  accessControlAllowOrigin: 'http://127.0.0.1:3000',
  adminName: 'admin',
  adminPassword: '123456',
  socketioPath: '/testsocketiopath',
  draftPostRedisKey: 'DRAFTPSOTKEY'
};
