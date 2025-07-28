require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chat');


const app = express();
app.use(cors(
  {
    origin: 'https://http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true
  }
));
app.use(bodyParser.json());

app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
