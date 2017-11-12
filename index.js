var Firestore = require('@google-cloud/firestore');

var config = {
  projectId: 'chickenco-op-103b4',
  keyFilename: 'chickenco-op-ed42621920d0.json'
};

// Get a reference to the database service
var firestore = new Firestore(config);

// Listen for game-start events
var gameId = process.argv[2];
var document = firestore.doc('games/' + gameId);

console.log('Got reference to Chicken Co-Op game with ID ' + gameId + ': ' + document);

// Read data once without listening for changes
document.get()
  .then(doc => {
    var data = doc._fieldsProto;
    console.log('Successfully read document: ' + JSON.stringify(data, null, 4));
  });