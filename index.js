const app = require('./server/app');
const port = process.env.PORT || 5000;
const express = require('express');
const path = __dirname + '/client/build/';
app.use(express.static(path));

// app.get('/*', function (req, res) {
//   res.sendFile(path + 'index.html');
// });

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
