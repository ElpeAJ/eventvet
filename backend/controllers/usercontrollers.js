const User = require('../models/usermodel');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, category, phone_number, address } = req.body;
        const user = await User.create({ username, email, password, category, phone_number, address });
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Retrieve a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, category, phone_number, address } = req.body;
        const [updated] = await User.update({ username, email, category, phone_number, address }, { where: { id: userId } });
        if (!updated) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleted = await User.destroy({ where: { id: userId } });
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};