import express from 'express';
import usersRouter from './routes/usersRouter.js'
import connectDB from './mongodb/connect.js';
 
const app = express();

const port = process.env.PORT || 7000;

// Body parse middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Sample API route
app.get('/api/', (req, res) => {
  res.json({ message: "Where Connections Spark and Conversations Thrive!" });
});

app.use('/api/users', usersRouter)


// Conenct to mongobd database
connectDB(process.env.MONGODB_URL)
// Listen to port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
