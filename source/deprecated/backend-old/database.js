const MongoClient = require('mongodb').MongoClient;
const chalk = require('chalk'); // debugging purposes
const uri =
  'mongodb+srv://BujoStudio:<password>@cluster0.2hihe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(uri, () => {
  console.log(chalk.blue('mongodb connected'));
});

module.exports = client;
