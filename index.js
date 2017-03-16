const app = require('./app')

const config = require('./config')
const port = process.env.PORT || config.server.port

app.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log('Relationship Group - 3 Server started and listening on port ' + port);
});

