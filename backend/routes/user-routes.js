const express = require('express');
const multer = require('multer');
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  importUsers,
} = require('../controllers/user-controller');

const upload = multer();
const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/import', upload.single('file'), importUsers);

module.exports = router;
