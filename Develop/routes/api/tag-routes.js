const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
      model: Product, 
      model: ProductTag,
    }]
  }) 
    .then ((allTag) => {
      res.json(allTag);
    })
    .catch((err)=> {
      console.log(err);
      res.status(500).json({err:err});
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [{
      model: Product,  
      model: ProductTag
    }]
  }). then((oneTag)=> {
    if(!oneTag){
      return res.status(404).json({msg: "no such tag"})
    }
    res.json(oneTag);
  })
  .catch((err)=> {
    console.log(err);
    res.status(500).json({err:err});
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    id:req.body.id, 
    tag_name: req.body.tag_name
  })
  .then((data) => {
    res.status(201).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: err });
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id:req.body.id, 
      tag_name: req.body.tag_name
    }
  )
  .then((updatedTag) => {
    if (updatedTag[0] === 0) {
      return res.status(404).json({ msg: "no tag found!" });
    }
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: err });
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id, 
  },
  })
  .then((delTag) => {
    if (delTag === 0) {
      return res.status(404).json({ msg: "no tag found!" });
    }
    res.json(delTag);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: err });
  });
});

module.exports = router;
