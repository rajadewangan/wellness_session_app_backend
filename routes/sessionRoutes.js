import express from 'express';
import {
  getPublicSessions,
  getUserSessions,
  getSingleSession,
  saveOrUpdateDraft,
  publishSession
} from '../controllers/sessionController.js';

const router = express.Router();

router.get('/sessions', getPublicSessions);
router.get('/my-sessions', getUserSessions);
router.get('/my-sessions/:id', getSingleSession);
router.post('/my-sessions/save-draft', saveOrUpdateDraft);
router.post('/my-sessions/publish', publishSession);

export default router;
