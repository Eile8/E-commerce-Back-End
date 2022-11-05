const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll() 
    .then ((allCategory) => {
      res.json(allCategory);
    })
    .catch((err)=> {
      console.log(err);
      res.status(500).json({err:err});
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{
      model: Product,  
    }]
  }). then((oneCategory)=> {
    if(!oneCategory){
      return res.status(404).json({msg: "no such category"})
    }
    res.json(oneCategory);
  })
  .catch((err)=> {
    console.log(err);
    res.status(500).json({err:err});
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id:req.body.id, 
    category_name: req.body.category_name
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
  // update a category by its `id` value
  Category.update(
    {
      id:req.body.id, 
      category_name: req.body.category_name
    }
  )
  .then((updatedCategory) => {
    if (updatedCategory[0] === 0) {
      return res.status(404).json({ msg: "no Toy found!" });
    }
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: err });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id, 
  },
  })
  .then((delCategory) => {
    if (delCategory === 0) {
      return res.status(404).json({ msg: "no category found!" });
    }
    res.json(delCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: err });
  });
});

module.exports = router;
