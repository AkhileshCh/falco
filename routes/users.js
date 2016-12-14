var express = require('express');
var router = express.Router();
var myParser = require("body-parser");
var app = express();


/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

//create a post request============================= 
 router.use(myParser.json())
 router.post("/sendmessage", function(request, response) {
     //if (!request.body) return response.sendStatus(400)
    var data = request.body ;
      for (i=0; i<data.length; i++)
      {
        var obj = data[i];
       console.log(obj);
        var db = request.db;
        var collection = db.get('userlist');
        collection.insert(obj, function(err, result){
        response.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
     });
}
     
      response.send("Message received.");
      response.end();
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;