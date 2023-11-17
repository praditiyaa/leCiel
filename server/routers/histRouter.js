const router = require('express').Router();
const histController = require('../controllers/histController');

router.get('/', histController.readHist);
router.post('/:mangaId', histController.createHist);
router.delete('/:histId', histController.delHist);

module.exports = router;
