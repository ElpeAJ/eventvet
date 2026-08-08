const { validationResult } = require('express-validator');
const Survey = require('../models/surveymodel');

// Function to submit survey
const submitSurvey = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { user_id, survey_content } = req.body;
        await Survey.create({ user_id, survey_content });
        return res.status(201).json({ message: 'Survey submitted successfully' });
    } catch (error) {
        console.error('Error in submitting survey:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    submitSurvey
};