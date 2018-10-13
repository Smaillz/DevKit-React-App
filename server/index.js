const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));
app.use(express.static('dist'));
app.listen(4500, () => console.log('Server start at: http://localhost:4500'));
