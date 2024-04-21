const mysql = require('mysql2');
const db = require('../config/db');
const pool = require('../config/db');

//register vendor
const registerVendor = async(req, res) =>{
    try{
        const {name, category, description, contact, website, portfolioLink,} = req.body;

        const  newVendorQuery = `
        INSERT INTO Vendors (name, category, description, contact, website, portfolio_Link)
        VALUES(?,?,?,?,?,?)`;
        await
        pool.query(newVendorQuery,[name, category, description, contact, website, portfolioLink]);

        res.status(201).json({message: 'vendor registered successfully'});
    } catch(error){
        console.error('Error registering vendor:', error);
        res.status(500).json({message:'Internal Server Error'});
    }
};

//submit vendor information

const submitVendorInfo = async (req, res)=>{
    try{
        const {yearsofExperirnce, location, portfolio}  = req.body;

        `INSERT INTO Vendors(years_of_experience, location, portfolio) VALUES (?,?,?)`;
        await db.query(newVendorQuery
        [yearsOfExperirnce, location, portfolio]),
        res.ststus(201).json({message: 'submitted successfully'})
} catch (error) {
    console.error('error submitting form', error);
    res.status(500).json({message: 'internal server error'})
};
};

// Create a new vendor
const createVendor = (req, res) => {
    const { name, category, description, contact, website, portfolio_link } = req.body;
    const sql = 'INSERT INTO vendors (name, category, description, contact, website, portfolio_link) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [name, category, description, contact, website, portfolio_link];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating vendor:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Vendor created successfully', vendor_id: result.insertId });
        }
    });
};

// Retrieve all vendors
const getAllVendors = (req, res) => {
    const sql = 'SELECT * FROM vendors';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching vendors:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
};

// Retrieve a single vendor by ID
const getVendorById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM vendors WHERE id = ?';

    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error fetching vendor by ID:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Vendor not found' });
        } else {
            res.json(result[0]);
        }
    });
};

// Update a vendor by ID
const updateVendorById = (req, res) => {
    const { name, category, description, contact, website, portfolio_link } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE vendors SET name = ?, category = ?, description = ?, contact = ?, website = ?, portfolio_link = ? WHERE id = ?';
    const values = [name, category, description, contact, website, portfolio_link, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating vendor by ID:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Vendor not found' });
        } else {
            res.json({ message: 'Vendor updated successfully', vendor_id: id });
        }
    });
};

// Delete a vendor by ID
const deleteVendorById = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM vendors WHERE id = ?';

    db.query(sql, id, (err, result) => {
        if (err) {
            console.error('Error deleting vendor by ID:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Vendor not found' });
        } else {
            res.json({ message: 'Vendor deleted successfully' });
        }
    });
};

module.exports = {
    registerVendor,
    submitVendorInfo,
    createVendor,
    getAllVendors,
    getVendorById,
    updateVendorById,
    deleteVendorById
};

