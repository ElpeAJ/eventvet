const Vendor = require('../models/vendormodel');

// Register new vendor
const registerVendor = async (req, res) => {
    try {
        const { name, category, description, contact, website, portfolio_link } = req.body;
        const vendor = await Vendor.create({ name, category, description, contact, website, portfolio_link });
        return res.status(201).json({ message: 'Vendor registered successfully', vendor });
    } catch (error) {
        console.error('Error registering vendor:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Submit vendor information
const submitVendorInfo = async (req, res) => {
    try {
        const { years_of_experience, location, portfolio } = req.body;
        const vendor = await Vendor.create({ years_of_experience, location, portfolio });
        return res.status(201).json({ message: 'Submitted successfully', vendor });
    } catch (error) {
        console.error('Error submitting form:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Retrieve all vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.findAll();
        return res.json(vendors);
    } catch (err) {
        console.error('Error fetching vendors:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Retrieve a single vendor by ID
const getVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await Vendor.findByPk(id);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
        return res.json(vendor);
    } catch (err) {
        console.error('Error fetching vendor by ID:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a vendor by ID
const updateVendorById = async (req, res) => {
    try {
        const { name, category, description, contact, website, portfolio_link } = req.body;
        const { id } = req.params;
        const [updated] = await Vendor.update({ name, category, description, contact, website, portfolio_link }, { where: { id } });
        if (!updated) return res.status(404).json({ message: 'Vendor not found' });
        return res.json({ message: 'Vendor updated successfully', vendor_id: id });
    } catch (err) {
        console.error('Error updating vendor by ID:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a vendor by ID
const deleteVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Vendor.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'Vendor not found' });
        return res.json({ message: 'Vendor deleted successfully' });
    } catch (err) {
        console.error('Error deleting vendor by ID:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    registerVendor,
    submitVendorInfo,
    getAllVendors,
    getVendorById,
    updateVendorById,
    deleteVendorById
};