import express, { json, urlencoded } from 'express';
import usersRouter from './routes/usersRouter.js'

const app = express();

const port = process.env.PORT || 7000;

// Json and body data middleware
app.use(express.json())
app.use(urlencoded({extended: false}))

// Sample API route
app.get('/api/', (req, res) => {
  res.json({ message: "Where Connections Spark and Conversations Thrive!" });
});

app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
