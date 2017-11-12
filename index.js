var Firestore = require('@google-cloud/firestore'),
  nrc = require('node-run-cmd'),
  fs = require('fs'),
  http = require('http');

var gameResultUrl = 'https://us-central1-chickenco-op-103b4.cloudfunctions.net/gameAnswer';
var config = {
  projectId: 'chickenco-op-103b4',
  keyFilename: 'chickenco-op-ed42621920d0.json'
};

// Get a reference to the database service
var firestore = new Firestore(config);

// Find the specified game within storage
var gameId = process.argv[2];
var document = firestore.doc('games/' + gameId);

console.log('Got reference to Chicken Co-Op game with ID ' + gameId);
  
// Listen for changes in the specified game
var observer = document.onSnapshot(function (docSnapshot) {
  console.log('Game with ID ' + gameId + ' updated');
  var data = docSnapshot._fieldsProto;
  runGame(data);
}, function (err) {
  console.error('Error observing document: ' + err);
});

function runGame(coOpInfo) {
  if (coOpInfo.arduinoTime.booleanValue) {
    var gameType = data.arduinoGame.integerValue;

    switch (gameType) {
      case -1:
        nrc.run('shell button.sh', { onDone: sendResult });
        break;
      case 1:
        nrc.run('shell move.sh', { onDone: sendResult });
        break;
      default:
        console.error('Error unknown arduinoGame: ' + gameType);
    }
  }
}

// Each microgame's shell script writes the result as a number to shell.txt
function sendResult() {
  fs.readFile('shell.txt', 'utf8', function (err, contents) {
    if (err) {
      console.error('Error reading game result: ' + err);
    }

    http.get(gameResultUrl + '?gameID=' + gameId + '&result=' + contents, function (res) {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
    
      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          'Status Code: ' + statusCode);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                          'Expected application/json but received ' + contentType);
      }
      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }
    
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', function (chunk) { rawData += chunk; });
      res.on('end', function () {
        try {
          const parsedData = JSON.parse(rawData);
          console.log(parsedData);
        } catch (e) {
          console.error(e.message);
        }
      });
    }).on('error', function (err) {
      console.error('Error sending game result: ' + err);
    });
  });
}