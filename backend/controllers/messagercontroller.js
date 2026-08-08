const Message = require('../models/messagemodel');

// Create a new message
exports.createMessage = async (req, res) => {
    try {
        const { message_content, sender_id, receiver_id } = req.body;
        const message = await Message.create({ message_content, sender_id, receiver_id });
        return res.status(201).json(message);
    } catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        return res.json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a message by ID
exports.getMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByPk(id);
        if (!message) return res.status(404).json({ message: 'Message not found' });
        return res.json(message);
    } catch (error) {
        console.error('Error getting message by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a message
exports.updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message_content } = req.body;
        const [updated] = await Message.update({ message_content }, { where: { id } });
        if (!updated) return res.status(404).json({ message: 'Message not found' });
        return res.json({ id, message_content });
    } catch (error) {
        console.error('Error updating message:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Message.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'Message not found' });
        return res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getMessageById,
    updateMessage,
    deleteMessage
};