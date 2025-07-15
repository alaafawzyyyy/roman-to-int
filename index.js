import express from 'express'
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/usersdb')
 .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const convertionSchema=new mongoose.Schema({

roman:{
type:String,
required:true,
},

integer:{
  type:Number,
  required:true
},

createdAt:{
  type:Date,
  default:Date.now
}
});

const Conversion =  mongoose.model('conversion',convertionSchema);


const romanValues = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

// A function converts roman to integer
 function romanToInt(roman) {
  let total = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const currentSymbol = roman[i];
    const currentValue = romanValues[currentSymbol];

    if (!currentValue) return null; 

    if (currentValue < prev) {
      total -= currentValue;
    } else {
      total += currentValue;
    }

    prev = currentValue;
  }

  return total;
}

// POST /convert
app.post('/convert', async(req, res) => {
  const { roman } = req.body;

  if (!roman || typeof roman !== 'string') {
    return res.status(400).json({ error: 'Input must be a string' });
  }

  const upperRoman = roman.toUpperCase();

  const validChars = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

    for (let char of upperRoman) {
    if (!validChars.includes(char)) {
        return res.status(400).json({ error: 'Invalid Roman numeral character' });
    }
    }

  const result = romanToInt(upperRoman);
  const conversionSaved = await Conversion.create({roman : upperRoman, integer:result})


  res.status(200).json({ integer: result });

});

//Get /convert
app.get('/conversions',async(req,res)=>{
const conversions = await Conversion.find().sort({createdAt : -1})
res.json(conversions)
})

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
