const express = require('express');   // Creates an instance of an Express application
const path = require('path');         // The path module provides utilities for working with file 
                                      // and directory paths. 

const app = express();
const port = process.env.PORT || 8080;

// serve static files from the `source` folder
console.log("The absolute path of working directory " + __dirname);
//router object
var router = express.Router();



app.get('/', (req, res) => {
  res.sendFile('/frontend/app/page-homepage/homepage.html', { root: __dirname });
});
router.get('/homepage.html', function(req, res){
  res.sendFile('/frontend/app/page-homepage/homepage.html', { root: __dirname });
});
router.get('/page-login/login.html', function(req, res){
  res.sendFile('/frontend/app/page-login/login.html', { root: __dirname });
});



module.exports = router;


app.use(express.static(__dirname));        // Add
app.use('/', router);                      // Add router to application
app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
})
