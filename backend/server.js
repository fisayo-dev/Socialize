import express from 'express';
import usersRouter from './routes/usersRouter.js'
import chatsRouter from './routes/chatsRouter.js'
import connectDB from './mongodb/connect.js';
import dotenv from 'dotenv'
import cors from 'cors';
 
dotenv.config()

const app = express();

const port = process.env.PORT || 7000;

// Body parse middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Enable CORS for all routes
app.use(cors()); // Allows all origins by default
// Routes
app.use('/api/users', usersRouter)
app.use('/api/chats', chatsRouter)


// Or configure CORS to allow specific origins
const corsOptions = {
  origin: 'https://websocialize.vercel.app', // Replace with your frontend domain
  credentials: true
};

// Apply CORS globally or on specific routes
app.use(cors(corsOptions));


try {
  // Conenct to mongobd database
  connectDB(process.env.MONGODB_URL)
  // Listen to port
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.log(error)
}

