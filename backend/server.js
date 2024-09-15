import express from 'express';
import usersRouter from './routes/usersRouter.js'

const app = express();

const port = process.env.PORT || 7000;

// Sample API route
app.get('/api/', (req, res) => {
  res.json({ message: "Where Connections Spark and Conversations Thrive!" });
});

app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
