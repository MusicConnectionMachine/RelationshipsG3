// BASE SETUP
// =============================================================================
// call the packages we need
var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var morgan      = require('morgan');
var request     = require('request');
var Tokenizer   = require('sentence-tokenizer');
var fs          = require('fs');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Variables
// =============================================================================

var tokenizer = new Tokenizer('Chuck');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();
// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Working');
  next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/relationshipG3)
router.get('/', function(req, res) {
  res.json({ message: 'welcome to relationship group3!' });
});
//  Routes
// ----------------------------------------------------

/*
using this structure as reference as given by team 2

 {
   "article": "path/to/file",
   "occurrences":
   [
       {
         "term": "Mozart",
         "role": "composer",
         "positions": [ 10, 42 ]
       },
     {
       "term": "Salzburg",
       "role": "city",
       "positions": [ 90 ]
     }
   ]
 }
*/

router.route('/getAllSentences')
  .post(function(req, res)
  {
    fs.readFile(req.body.article, 'utf8', function (err, data)
    {
      if (err) throw err;
      tokenizer.setEntry(data);
      var allSentences= tokenizer.getSentences();
      res.json( {sentences:allSentences});
      //console.log(allSentences);
    });
  })
router.route('/getAllEntities')
  .post(function(req, res)
  {
    var distinctEntities = [];
    var uniqueEntities = [];
    for( var i in req.body.occurrences )
    {
      if( typeof(uniqueEntities[req.body.occurrences[i].term]) == "undefined")
      {
        distinctEntities.push(req.body.occurrences[i].term);
      }
      uniqueEntities[req.body.occurrences[i].term] = 0;
    }
    res.json( {entities:distinctEntities});

  })
router.route('/getAllEntitySentences')
  .post(function(req, res)
  {
    var AllEntitySentences =[];

    fs.readFile(req.body.article, 'utf8', function (err, data)
    {
      if (err) throw err;
      tokenizer.setEntry(data);
      var allSentences= tokenizer.getSentences();

      for(var entityNumber=0; entityNumber<req.body.occurrences.length; entityNumber++)
      {
        AllEntitySentences[entityNumber]=[];
        for (var sentenceNumber = 0; sentenceNumber < allSentences.length; sentenceNumber++)
        {
          var tokens = tokenizer.getTokens(sentenceNumber);
          var entity = req.body.occurrences[entityNumber].term;
          //console.log("Tokens:"+ tokens[0] + " entity:" + entity);
          // here to add the logic of understanding the pronouns
          if (tokens.indexOf(entity) > -1)
          {
            AllEntitySentences[entityNumber].push(allSentences[sentenceNumber]);
            //console.log("In the array");
          } else
            {
            //console.log("Not in the array");
          }
        }
      }
      res.json( {allEntitySentences:AllEntitySentences});
      //console.log(allSentences);
    });
  })
// REGISTER OUR ROUTES -------------------------------
app.use('/relationshipG3', router);
module.exports = app








