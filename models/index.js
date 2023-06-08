// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Category can have multiple Products
Category.hasMany(Product, {
  foreignKey: 'category_id', 
  onDelete: 'CASCADE',
}); 

// Product can only belongsTo one Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', 
});


// Products belongsToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag 
  }, 
  // as: 'Product_Tag_1'
});

// Tags belongsToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag 
  }, 
  // as: 'Tag_Product_2'
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
