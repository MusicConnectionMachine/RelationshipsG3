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


//Ollie Algorithm
//=============================================================================================================================

var ollie = express.Router();
// middleware to use for all requests
ollie.use(function(req, res, next) {
  // do logging
  console.log('Working Olie');
  next();
});
ollie.get('/', function(req, res) {
  res.json({ message: 'welcome to ollie api!' });
});
ollie.route('/getRelationships')
  .post(function(req, res)
  {
    var inputFile = req.body.inputpath;
    if(!inputFile)
    {
      var arr = req.body.array;
      if(!arr)
      {
        inputFile = config.ollieAlgo.defaultFilePath;
      }
      else {
        inputFile = config.ollieAlgo.defaultFileSavePath;

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
    var command = "java "+ config.ollieAlgo.javaOpt+" -jar "+ config.ollieAlgo.name+ " " + inputFile  ;

    var relations=
      {
        sentence:"",
        instances:[
          {
            quality:"",
            term1:"",
            term2:"",
            term3:""
            /*relation:"",*/
          }
        ]
      };

    var instancesArr = [];
    var exMessage = [];
    exec(command,function (error, stdout, stderr)
    {
      var lines = stdout.toString().replace(/([.?!])\s*(?=[A-Z])/g, "\n").split("\n");
      for(var line in lines)
      {
        lines[line] = lines[line].replace("\r", "");
        //console.log(line)
        if(lines[line].charAt(0)== '' || lines[line].charAt(0)== ' ')
          continue;
        if(lines[line].charAt(0) != '0')
        {
            if(line == 0)
            {
             // console.log(lines[line]);
              relations.sentence = lines[line];
              //console.log(relations);
            }
            else
            {
              //console.log(lines[line]);
              relations.instances = instancesArr;
              var temp = clone(relations);
              exMessage.push(temp);
              //console.log(relations);
              relations.sentence = lines[line];
              instancesArr =[];
            }
        }
        else
        {
            //console.log(lines[line]);
            var re = /\s*:\s*/;
            var list = lines[line].split(re);
            var quali =list[0];
            list[1] = list[1].replace("(", "");
            list[1] = list[1].replace(")", "");
            re = /\s*;\s*/;
            var terms = list[1].split(re);
            instancesArr.push({quality:quali, term1:terms[0], term2:terms[1],term3:terms[2]/*, relation: lines[line]*/});
        }
      }
      res.json( exMessage);
    });
  });
// REGISTER OUR ROUTES -------------------------------
app.use('/ollie', ollie);
app.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log('Ollie Algorithm Server started and listening on port ' + port);
});










