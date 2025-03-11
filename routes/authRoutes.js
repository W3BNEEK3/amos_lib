const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Corrected path
const bcrypt = require('bcryptjs');

router.get('/register', (req, res) => {
      res.render('registrationform/register');
});

router.post('/register', async (req, res) => { 
     try {
         const { name, email, password } = req.body;

         const existingUser = await User.findOne({ email });
         if (existingUser) {
             return res.status(400).json({ message: 'User already exists' });
         }

         const hashedPassword = await bcrypt.hash(req.body.password, 10);
         const newUser = new User({
             name: req.body.name,
             email: req.body.email,
             password: hashedPassword
         });
         await newUser.save();
         
         res.status(201).json({ message: 'User created successfully' }); 
     } catch (err) {
         res.status(500).json({ message: 'Server error' });   
     }
});

module.exports = router;