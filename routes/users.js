const express = require('express');
const router = express.Router();
const {list,show,create,update,remove} = require('../controllers/users')

router.get('/users', list);
router.get('/users/:someid', show);
router.post('/users', create);
router.put('/users/:someid', update);
router.delete('/users/:someid', remove);

module.exports = router