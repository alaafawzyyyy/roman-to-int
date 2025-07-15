import express from 'express'
import mongoose from 'mongoose';
import conversions from './routes/conversions.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/usersdb')
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api', conversions);


app.listen(3000, () => {
   console.log('app listening on port 3000!');
});


