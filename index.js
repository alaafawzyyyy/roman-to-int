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

//roman validation function

function validateRomanInput(roman) {

  if (!roman || typeof roman !== 'string') {
    return { error: 'Input must be a string' };
  }

  const upperRoman = roman.toUpperCase();
  const validRomanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  if (!validRomanRegex.test(upperRoman)) {
    return { error: 'Invalid Roman numeral format' };
  }

  return { value: upperRoman };
}

// POST /convert
app.post('/convert', async(req, res) => {
  const { roman } = req.body;

     const { error, value: upperRoman } = validateRomanInput(roman);
      if (error) return res.status(400).json( {error} );

  const result = romanToInt(upperRoman);

  const conversionSaved = await Conversion.create({roman : upperRoman, integer:result})


  res.status(200).json({ integer: result });

});


//Get /conversions
app.get('/conversions',async(req,res)=>{
const conversions = await Conversion.find().sort({createdAt : -1})
res.json(conversions)
})


//Get /conversions/:id
app.get('/conversions/:id',async (req,res)=>{
  const {id} = req.params;

if(!id.match(/^[0-9a-fA-F]{24}$/)){
  return res.status(400).json({ error: 'Invalid ID format' });
}

const findconversion = await Conversion.findById(id)
if(!findconversion){
  return res.status(404).json({error :"Conversion not found"})
}

res.status(200).json(findconversion)

})


//Put /conversions/:id
app.put('/conversions/:id',async (req,res)=>{
const {id}=req.params;
const { roman } = req.body;

   if(!id.match(/^[0-9a-fA-F]{24}$/)){
    return res.status(400).json({ error: 'Invalid ID format' });
}

     const { error, value: upperRoman } = validateRomanInput(roman);
      if (error) return res.status(400).json( {error} );{
}

  const integer = romanToInt(upperRoman);

  const updated = await Conversion.findByIdAndUpdate(
    id,
    { roman: upperRoman, integer },
    { new: true }
  );


  if (!updated) {
    return res.status(404).json({ error: 'Conversion not found' });
  }

  res.status(200).json(updated);
})


app.delete('/conversions/:id',async(req,res)=>{
const {id}=req.params;

   if(!id.match(/^[0-9a-fA-F]{24}$/)){
    return res.status(400).json({ error: 'Invalid ID format' });
}

const deleteConversion = await Conversion.findByIdAndDelete(id)

if(!deleteConversion ){
  return res.status(400).json({ error: 'Conversion not found' });
}
res.status(200).json({ message: 'Conversion deleted successfully' });
})


app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
