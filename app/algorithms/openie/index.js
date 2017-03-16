// BASE SETUP
// =============================================================================
var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var app         = express();
var request     = require('request');
var exec        = require('child_process').exec;
var clone       = require('clone');
var fs          = require('fs');

// configure app
const config = require('./config')
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || config.server.port; // set our port

//openIE Algorithm
//=============================================================================================================================

var openie = express.Router();
// middleware to use for all requests
openie.use(function(req, res, next) {
  // do logging
  console.log('Working OpenIE');
  next();
});
openie.get('/', function(req, res) {
  res.json({ message: 'welcome to OpenIE api!' });
});
openie.route('/getRelationships')
  .post(function(req, res)
  {
    var inputFile = req.body.inputpath;
    if(!inputFile)
    {
      var arr = req.body.array;
      if(!arr)
      {
        inputFile = config.openieAlgo.defaultFilePath;
      }
      else {
        inputFile = config.openieAlgo.defaultFileSavePath;

        var file = fs.createWriteStream(inputFile);
        file.on('error', function (err) { /* error handling */
          console.log(err);
        });
        arr.forEach(function (v) {
          file.write(v + '\n');
        });
        file.end();
      }
    }
    var lines = [];
    var command = "java "+config.openieAlgo.javaOpt+" -jar "+config.openieAlgo.name + " " + inputFile + " " + config.openieAlgo.format;
    var relations=
      {
        sentence:"x",
        instances:[
          {
            quality:"",
            term1:"",
            relation:"",
            term2:""
          }
        ]
      };

    var instancesArr = [];
    var exMessage = [];
    exec(command,function (error, stdout, stderr)
    {
      var lines = stdout.toString().replace(/([.?!])\s*(?=[A-Z])/g, "\n").split("\n");
      lines.splice(0,20);
      //console.log(lines);

       for(var line in lines)
       {
         lines[line] = lines[line].replace("\r", "");
         //console.log(line);

         var list = lines[line].split("\t");
         var length = list.length;
         var sentence = list[list.length - 1];

         if(relations.sentence != sentence)
         {
           if(line == 0)
           {
             relations.sentence = sentence;
           }
           else {
             relations.instances = instancesArr;
             var temp = clone(relations);
             exMessage.push(temp);
             //console.log(relations);
             relations.sentence = sentence;
             instancesArr = [];
           }
         }
         //else
         {
           var quali =list[0];
           var term1= "",term2="",relation="";
           for(i=1;i<length-1;i++)
           {
             var re = /\s*;\s*/;
             var subterms = list[i].split(re);
             for(sub in subterms)
             {
               if(subterms[sub].includes("SimpleArgument"))
               {
                 var testTerm = subterms[sub].match("SimpleArgument(.*),L");
                 testTerm[1] = testTerm[1].replace("(", "");
                 if(term1 == "")
                   term1=testTerm[1];
                 else
                   term2= testTerm[1];
               }
               else if(subterms[sub].includes("Relation"))
               {
                 var testRe = subterms[sub].match("Relation(.*),L");
                 testRe[1] = testRe[1].replace("(", "");
                 relation=testRe[1];
               }
             }
           }
           instancesArr.push({quality:quali, term1: term1, term2:term2, relation:relation});
           //console.log(instancesArr);
         }
         //console.log(list);
     }
      res.json( exMessage);
    });
  });
// REGISTER OUR ROUTES -------------------------------
app.use('/openie', openie);
app.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log('OpenIE Algorithm Server started and listening on port ' + port);
});







