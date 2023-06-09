const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// http://localhost:3001/api/tags

// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: { model: Product }
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: { model: Product }
    })
    if (!tagData) {
      res.status(404).json({ message: 'Tag id not found.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "tag_name": "preppy"
    }
  */
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  /* req.body should look like this...
    {
      "tag_name": "posh"
    }
  */
  try {
    const updatedTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    })
    if (!updatedTagData) {
      res.status(404).json({ message: 'Tag id not found.' });
      return;
    }
    res.status(200).json(updatedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedTagData) {
      res.status(404).json({ message: 'Tag id not found.' });
      return;
    }
    res.status(200).json(deletedTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
