const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// http://localhost:3001/api/categories


router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: { model: Product }
    })
    if (!categoryData) {
      res.status(404).json({ message: 'Category id not found.' });
      return;
    }
    res.status(200).json(categoryData);    
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "category_name": "Skirts"
    }
  */
  try {
    const categoryData = Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  /* req.body should look like this...
    {
      "category_name": "Dresses"
    }
  */
  try {
    const updatedCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    if (!updatedCategoryData) {
      res.status(404).json({message: 'Category id not found.'});
      return;
    }
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedCategoryData) {
      res.status(404).json({ message: 'Category id not found.' });
      return;
    }
    res.status(200).json(deletedCategoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
