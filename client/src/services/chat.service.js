import accounts from "../api/accounts";

// ================= CREATE CHAT =================

export const createChat = async (payload) => {
    try {
        const response = await accounts.post("/chats", payload);

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ================= GET ALL CHATS =================

export const getChats = async () => {
    try {
        const response = await accounts.get("/chats");

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ================= GET SINGLE CHAT =================

export const getChatById = async (chatId) => {
    try {
        const response = await accounts.get(`/chats/${chatId}`);

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ================= GET CHAT MESSAGES =================

export const getMessages = async (chatId) => {
    try {
        const response = await accounts.get(
            `/chats/${chatId}/messages`
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ================= RENAME CHAT =================

export const renameChat = async (chatId, title) => {
    try {
        const response = await accounts.patch(
            `/chats/${chatId}`,
            {
                title,
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ================= DELETE CHAT =================

export const deleteChat = async (chatId) => {
    try {
        const response = await accounts.delete(
            `/chats/${chatId}`
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};