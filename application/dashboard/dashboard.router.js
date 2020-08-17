import express from 'express';
const router = express.Router()
import {addcpu,getusage,history,addusage,getendorsers} from './dashboard.controller';

router.post('/history',history);
router.post('/addcpu',addcpu);
router.post('/addusage',addusage);
router.post('/getusage',getusage);
router.post('/getendorsers',getendorsers);

module.exports = router;