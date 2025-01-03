const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


const PORT = 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));