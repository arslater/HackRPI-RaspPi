var Firestore = require('@google-cloud/firestore');

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
var observer = document.onSnapshot(docSnapshot => {
  var data = docSnapshot._fieldsProto;
  console.log('Game with ID ' + gameId + ' updated');
}, err => {
  console.log('Error observing document: ' + err);
});