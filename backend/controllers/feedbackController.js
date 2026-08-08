const Feedback = require('../models/feedbackmodel');

// Create a new feedback entry
exports.createFeedback = async (req, res) => {
    try {
        const { user_id, vendor_id, rating, review_content } = req.body;
        const feedback = await Feedback.create({ user_id, vendor_id, rating, review_content });
        return res.status(201).json(feedback);
    } catch (error) {
        console.error('Error creating feedback:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all feedback entries
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.findAll();
        return res.json(feedbacks);
    } catch (error) {
        console.error('Error getting feedback:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a feedback entry by ID
exports.getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findByPk(id);
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
        return res.json(feedback);
    } catch (error) {
        console.error('Error getting feedback by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a feedback entry
exports.updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, review_content } = req.body;
        const [updated] = await Feedback.update({ rating, review_content }, { where: { id } });
        if (!updated) return res.status(404).json({ message: 'Feedback not found' });
        return res.json({ id, rating, review_content });
    } catch (error) {
        console.error('Error updating feedback:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a feedback entry
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Feedback.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'Feedback not found' });
        return res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


