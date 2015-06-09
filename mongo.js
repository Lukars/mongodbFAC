var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';


var insertDocuments = function(members,db,callback) {
  var collection = db.collection('facMembers');

  collection.insert(members, function(err, result) {
	assert.equal(err, null);
	assert.equal(members.length, result.result.n);
	assert.equal(members.length, result.ops.length);
	console.log("Inserted " + members.length + " document(s) into the document collection");
	callback(result);
  });
};

var findDocuments = function(name,db,callback) {
  var collection = db.collection('facMembers');

  collection.find(name).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.dir(docs)
    callback(docs);
  });      
};

var removeDocument = function(name,db,callback) {
  var collection = db.collection('facMembers');
  collection.remove(name, function(err, result) {
    assert.equal(err, null);
    console.log("Removed from document");
    callback(result);
  });    
};

var insert = function (data,callback){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  insertDocuments(data,db, function() {
	    db.close();
	  });
	});
	callback(data);
};

var read = function (name,callback){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  findDocuments(name,db, function() {
          db.close();
        });
	});
	callback(name);
};

var deleter = function (name, callback){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected correctly to server");
	  removeDocument(name, db, function() {
        db.close();
      });
	});
	callback(name);
};

var test = [ {name : 'dan', image : 'fancy.jpg'}, {name : 'claire', image : 'cat.jpg'}, {name : 'niki', image : 'vegan.jpg'} ];
//insert(test, function(){console.log("ok")});

read({name : 'dan'} , function(){console.log("ok")});

//deleter({name : 'dan'} , function(){console.log("ok")});
