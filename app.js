const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const initiateDBConnection = require('./config/db');
const authenitcationRouter = require('./routes/auth');
const ticketRouter = require('./routes/ticket')
const userRouter = require('./routes/user');
const NotificationsRouter = require('./routes/notifications');

const articleRouter = require('./routes/article');



// Access the port environment variable using process.env
const PORT = process.env.PORT;

const app = express();


// an express middleware to parse JSON data in request body.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/uploads/attachments', express.static(path.join(__dirname,'uploads', 'attachments')));
app.use(cors());

app.use('/api/auth', authenitcationRouter);
app.use('/api/user', userRouter);
app.use('/api/ticket',ticketRouter);

app.use('/api/notifications', NotificationsRouter);

app.use('/api/article', articleRouter);

app.listen(PORT, async () => {
  console.log(`Server has been started and is listening to port ${PORT}`);
  // Call the asynchronous function to initiate the DB connection once the server starts listening.
  await initiateDBConnection();
});
  