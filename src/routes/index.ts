import users from './users';

import { Router } from 'express';

const router = Router();

router.use('/', users);
export default router;