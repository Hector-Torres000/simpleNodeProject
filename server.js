const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  function formWebPage(file, contentType) {
    fs.readFile(file, function (err, data) {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    });
  }

  if (page == '/') {
    formWebPage('index.html', 'text/html');
  } else if (page == '/style/style.css') {
    formWebPage('style/style.css', 'text/css');
  } else if (page == '/js/main.js') {
    formWebPage('js/main.js', 'text/javascript');
  } else if (page == '/api') {
    if ('streamer' in params) {
      const input = params['streamer'];
      const twitchStreamObj = {
        handleName: 'unknown',
        realName: 'unknown',
        streamType: 'unknown',
      };
      if (input == 'sadia') {
        twitchStreamObj.handleName = 'Sadia_Moon';
        twitchStreamObj.realName = 'Sadia';
        twitchStreamObj.streamType = 'Souls Games/Chatting';
      } else if (input == 'laribug') {
        twitchStreamObj.handleName = 'Laribug';
        twitchStreamObj.realName = 'Lari';
        twitchStreamObj.streamType = 'Excercise/Music/Chatting';
      } else if (input == 'bubbells') {
        twitchStreamObj.handleName = 'Bubbells';
        twitchStreamObj.realName = 'Ella';
        twitchStreamObj.streamType = 'Variaty/Chatting';
      } else if (input == 'george') {
        twitchStreamObj.handleName = 'GeorgeCadman';
        twitchStreamObj.realName = 'George';
        twitchStreamObj.streamType = 'Variaty';
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(twitchStreamObj));
    }
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
