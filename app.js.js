const express = require('express');
const path = require('path');
const app = express();
const port = 3000

app.listen(port, () => {
    console.log('Express server listening on port' + port);
})