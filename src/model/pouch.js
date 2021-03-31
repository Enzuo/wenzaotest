import PouchDB from 'pouchdb'
// import * as PouchDB2 from 'pouchdb';
import pouchdbDebug from 'pouchdb-debug'
PouchDB.plugin(pouchdbDebug);

// console.log(PouchDB, PouchDB2)

var db = new PouchDB('kittens');

PouchDB.debug.enable('*');
// PouchDB.debug.disable();



var doc = {
  "_id": "mittens",
  "name": "Mittens",
  "occupation": "kitten",
  "age": 3,
  "hobbies": [
    "playing with balls of yarn",
    "chasing laser pointers",
    "lookin' hella cute"
  ]
};

export function saveCat(){
  db.put(doc);
}
