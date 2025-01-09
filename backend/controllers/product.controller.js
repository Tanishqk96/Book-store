import Product from "../../models/product.model.js";


export const createProduct = async (req, res) => {
  const product = req.body;

  console.log("Incoming request body:", product); // Log the incoming data

  // Validate the fields
  if (!product.name || !product.price || !product.image) {
      return res
          .status(400)
          .json({ success: false, message: "Please provide all fields" });
  }

  // Create a new product instance
  const newProduct = new Product(product);

  try {
      await newProduct.save(); // Save to the database
      res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
      console.error("Error saving product to database:", error.message); // Detailed log
      res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
};

export const getProducts = async (req,res) => {
   // res.send("hello");    
   const products = await Product.find({});
   try {
       res.status(201).json({ success: true, data: products});
   } catch (error) {
    res.status(500).json({ success: false, message:"server error"});
   }
};

export const updateProduct = async (req,res) =>{
    const { id } = req.params;
    const product = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid Product ID' });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
};
export const deleteProduct = async (req,res) =>{
    const {id}=req.params;
try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: false, message:"product deleted!"});
} catch (error) {
    console.log(error.message);
}
};