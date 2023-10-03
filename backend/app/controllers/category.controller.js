const Category = require("../models/category.model.js");
const asyncHandler = require('express-async-handler');

const create = asyncHandler(async (req, res) => {

    const category_data = {
      id_cat: req.body.id_cat || null,
      category_name: req.body.category_name || null,
      image: req.body.image || null,
      products: []
    };

    const category = await new Category(category_data);
    const new_category = await category.save();
    res.json(new_category);
});

// TOTES LES CATEGORIES
const findAll = asyncHandler( async (req, res) => {

    const  {offset, limit} = req.query;

    const categories = await Category.find({}, {}, { skip: Number(offset), limit: Number(limit)});

    if (!categories) {
      return res.status(401).json({
        message: "Category not found"
      })
    }
    
    return res.status(200).json({
      categories: await Promise.all(categories.map( async categories => {
          return await categories.toCategoryResponse()
      }))
    });
});

// UNA CATEGORIA 

const findOne = asyncHandler(async (req, res) => {

  const categories = await Category.findOne(req.params)

  if (!categories) {
    return res.status(401).json({
      message: "Category not found"
    })
  }
  return res.status(200).json({
    categories: await categories.toCategoryResponse()
  })
});

// // // Update a Category by the id in the request
// exports.update_category = async (req, res) => {
//   try {
//       const id = req.params.id
//       const old_category = await Category.findOne({ slug: id });

//       if (old_category.name !== req.body.name && req.body.name !== undefined) {
//         old_category.slug = null;
//         // console.log('error');
//       }

//       old_category.id_cat = req.body.id_cat || old_category.id_cat;
//       old_category.category_name = req.body.category_name || old_category.category_name;
//       old_category.image = req.body.image || old_category.image;
//       old_category.products = req.body.products || old_category.products;
//       const category = await old_category.save();

//       if (!category) {res.status(404).send({message: `Cannot update Category with id=${id}. Maybe Category was not found!`}); }
//       res.send({ message: "Category was updated successfully." });
//   } catch (error) {
//       if (error.kind === 'ObjectId') {res.status(404).send({message: `Category not found!`}); }
//       else {res.status(500).send({message: "Error updating the Category"});}
//   }
// }

// ELIMINAR UNA CATEGORIA

const delete_category = asyncHandler(async (req, res) => {
    await Category.findOneAndDelete(req.params);
    res.send({message: "Category was deleted successfully!"}); 
});

// exports.deleteAll_categories = async (req, res) => {
//   try {
//     const deleteALL = await Category.deleteMany();
//     res.send({message: `Categories were deleted successfully!`});
//   } catch (error) {
//     res.status(500).send({message: err.message || "Some error occurred while removing all category."});
//   }
// }

module.exports = {
  create,
  findAll,
  findOne,
  delete_category
}