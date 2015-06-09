var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

var mongo = {

	insertDocuments: function(members,db,callback) {
		var collection = db.collection('facMembers');

		collection.insert(members, function(err, result) {
		// assert.equal(err, null);
		// assert.equal(members.length, result.result.n);
		// assert.equal(members.length, result.ops.length);
		console.log("Inserted " + members.length + " document(s) into the document collection");
		callback(result);
		});
	},

	findDocuments: function(name,db,callback) {
		var collection = db.collection('facMembers');

		collection.find(name).toArray(function(err, docs) {
			// assert.equal(err, null);
			console.log("Found the following records");
			callback(docs);
		});
	},

  removeDocument: function(name,db,callback) {
    var collection = db.collection('facMembers');
    collection.remove(name, function(err, result) {
      assert.equal(err, null);
      console.log("result is" + result);
      callback(result);
    });
  },

	insert: function (data,callback){
		MongoClient.connect(url, function(err, db) {
			// assert.equal(null, err);
			console.log("Connected correctly to server");
			mongo.insertDocuments(data,db, function() {
				db.close();
			});
		});
		callback(data);
	},

	read: function (name,callback){
		MongoClient.connect(url, function(err, db) {
			// assert.equal(null, err);
			console.log("Connected correctly to server");
			mongo.findDocuments(name,db, function(docs) {
						db.close();
						callback(docs);
					});
		});
	},


  deleter: function (name, callback){
  	MongoClient.connect(url, function(err, db) {
  	  assert.equal(null, err);
  	  console.log("Connected correctly to server");
  	  mongo.removeDocument(name, db, function(data) {
          db.close();
          callback(data);
        });
  	});
  }
};

var test = [ {name : 'dan', image : 'fancy.jpg'}, {name : 'claire', image : 'cat.jpg'}, {name : 'niki', image : 'vegan.jpg'} ];
//insert(test, function(){console.log("ok")});

// read({name : 'dan'} , function(){console.log("ok")});

//deleter({name : 'dan'} , function(){console.log("ok")});
module.exports = mongo;
