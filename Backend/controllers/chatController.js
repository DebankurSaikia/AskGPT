import Thread from "../models/Thread.js";
import getGeminiAPIResponse from "../utils/geminiai.js";

// Get all threads of logged-in user
export const getThreads = async (req, res) => {
    try {
        const threads = await Thread.find({
            userId: req.user.userId
        }).sort({ updatedAt: -1 });

        res.json(threads);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Failed to fetch threads"
        });
    }
};

// Get messages of a specific thread
export const getThreadMessages = async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await Thread.findOne({
            threadId,
            userId: req.user.userId
        });

        if (!thread) {
            return res.status(404).json({
                error: "Thread not found"
            });
        }

        res.json(thread.messages);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Failed to fetch chat"
        });
    }
};

// Delete thread
export const deleteThread = async (req, res) => {
    const { threadId } = req.params;

    try {
        const deletedThread =
            await Thread.findOneAndDelete({
                threadId,
                userId: req.user.userId
            });

        if (!deletedThread) {
            return res.status(404).json({
                error: "Thread not found"
            });
        }

        res.json({
            success: "Thread deleted successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Failed to delete thread"
        });
    }
};

// Chat
export const chatWithAI = async (req, res) => {
    const { threadId, message } = req.body;

    if (!threadId || !message) {
        return res.status(400).json({
            error: "Missing required fields"
        });
    }

    try {
        let thread = await Thread.findOne({
            threadId,
            userId: req.user.userId
        });

        if (!thread) {
            thread = new Thread({
                userId: req.user.userId,
                threadId,
                title: message,
                messages: []
            });
        }

        // Save user message
        thread.messages.push({
            role: "user",
            content: message
        });

        // Generate AI response using entire history
        const assistantReply =
            await getGeminiAPIResponse(
                thread.messages
            );

        // Save AI response
        thread.messages.push({
            role: "assistant",
            content: assistantReply
        });

        await thread.save();

        res.json({
            reply: assistantReply
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
};