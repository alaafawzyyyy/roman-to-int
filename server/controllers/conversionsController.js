import Conversion from '../models/ConversionModel.js';
import { validateRomanInput, romanToInt } from '../utils/romanUtils.js';

// POST /convert
export const convertRoman = async(req, res) => {
   const { roman } = req.body;
   const { error, value: upperRoman } = validateRomanInput(roman);

   if (error) return res.status(400).json( {error} );

   const result = romanToInt(upperRoman);
   const conversionSaved = await Conversion.create({roman: upperRoman, integer: result})

   res.status(200).json({ integer: result });

};


// Get /conversions
export const getAllConversions = async(req,res)=>{
   const conversions = await Conversion.find().sort({createdAt : -1})

   res.json(conversions)
};


// Get /conversions/:id
export const getConversionById = async (req,res)=>{
   const {id} = req.params;

   if(!id.match(/^[0-9a-fA-F]{24}$/)){
     return res.status(400).json({ error: 'Invalid ID format' });
}

   const findconversion = await Conversion.findById(id)

   if(!findconversion){
     return res.status(404).json({error :"Conversion not found"});
}

   res.status(200).json(findconversion)
};


// Put /conversions/:id
export const updateConversion = async (req,res)=>{
   const {id}=req.params;
   const { roman } = req.body;

   if(!id.match(/^[0-9a-fA-F]{24}$/)){
    return res.status(400).json({ error: 'Invalid ID format' });
}

   const { error, value: upperRoman } = validateRomanInput(roman);
   if (error) return res.status(400).json( {error} );

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
};


// DELETE /conversions/:id
export const deleteConversion = async(req,res)=>{
   const {id}=req.params;
   if(!id.match(/^[0-9a-fA-F]{24}$/)){
     return res.status(400).json({ error: 'Invalid ID format' });
}

   const deleteConversion = await Conversion.findByIdAndDelete(id)
   if(!deleteConversion ){
     return res.status(400).json({ error: 'Conversion not found' });
}

   res.status(200).json({ message: 'Conversion deleted successfully' });
};

