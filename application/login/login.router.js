import express from 'express';
const router = express.Router()
import {login} from './login.controller';

router.post('/',login);
module.exports = router;
