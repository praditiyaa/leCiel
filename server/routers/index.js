const router = require('express').Router();
const userRouter = require('./userRouter');
const mainRouter = require('./mainRouter');
const histRouter = require('./histRouter');
const readingListRouter = require('./readingListRouter');
const authentication = require('../middlewares/authentication');

router.use('/', userRouter);
router.use('/', mainRouter);

router.use(authentication);

router.use('/readingList', readingListRouter);
router.use('/history', histRouter);

module.exports = router;
