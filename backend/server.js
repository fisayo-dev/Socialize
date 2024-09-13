const express = require('express');
const app = express();
const PORT = 5000;

// Sample API route
app.get('/api', (req, res) => {
  res.json({ message: "Hello from a Node.js backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
