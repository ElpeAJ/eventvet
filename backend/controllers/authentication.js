const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const sequelize = require('../config/db');
const User = require('../models/usermodel');
const nodemailer = require('nodemailer');

// Register new user
const register = async (req, res) =>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.status(400).json({ 
                erors: errors.array()
            })
        }
        const {fullname,email, password, confirmPassword} = req.body;
        //check if passwords match
        if (password !== confirmPassword){
            res.status(400).json({message: 'passwords do not match'});
        }
        //hash password
        const hashedPassword = await
        bcrypt.hash(password, 10);

        // create user via Sequelize
        await User.create({ username: fullname, email, password: hashedPassword, category: 'Event Planner' });

        // Redirect to landing page after successful registration
        return res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error('error in registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login
const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        

        // JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error in user login', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = jwt.sign({ email }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '30m' });
        const resetLink = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Reset Password',
            html: `Click <a href="${resetLink}">here</a> to reset your password.`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Reset password email sent' });
    } catch (error) {
        console.error('Error in sending reset password email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token) return res.status(400).json({ message: 'Token is required' });

        jwt.verify(token, process.env.RESET_PASSWORD_SECRET, async (err, decodedToken) => {
            if (err) return res.status(401).json({ message: 'Invalid or expired token' });

            const { email } = decodedToken;
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.update({ password: hashedPassword }, { where: { email } });

            return res.status(200).json({ message: 'Password reset successfully' });
        });
    } catch (error) {
        console.error('Error in resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    register, login, forgotPassword, resetPassword
};