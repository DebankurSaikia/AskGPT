const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* Get JWT token from localStorage */
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
};

/* Fetching all the threads of a logged-in user */
export const getThreads = async () => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/thread`,
            {
                headers: getAuthHeaders()
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to fetch threads"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

/* Fetching messages of a specific thread */
export const getThreadMessages = async (threadId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/thread/${threadId}`,
            {
                headers: getAuthHeaders()
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to fetch chat"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

/* Sending message to backend */
export const sendMessage = async (
    threadId,
    message
) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/chat`,
            {
                method: "POST",

                headers: getAuthHeaders(),

                body: JSON.stringify({
                    threadId,
                    message
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to send message"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};

/* Delete a thread */
export const deleteThreadById = async (
    threadId
) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/thread/${threadId}`,
            {
                method: "DELETE",

                headers: getAuthHeaders()
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Failed to delete thread"
            );
        }

        return data;

    } catch (err) {
        throw err;
    }
};