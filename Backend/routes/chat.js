import express from "express";

import verifyToken from "../middleware/authMiddleware.js";

import {
    getThreads,
    getThreadMessages,
    deleteThread,
    chatWithAI
} from "../controllers/chatController.js";

const router = express.Router();

router.get(
    "/thread",
    verifyToken,
    getThreads
);

router.get(
    "/thread/:threadId",
    verifyToken,
    getThreadMessages
);

router.delete(
    "/thread/:threadId",
    verifyToken,
    deleteThread
);

router.post(
    "/chat",
    verifyToken,
    chatWithAI
);

export default router;