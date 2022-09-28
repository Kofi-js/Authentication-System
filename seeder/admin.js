const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.seedAdmin = async () => {
  try {
    // Check if there's an existing admin account
    const adminExists = await User.findOne({ userRole: 'admin' });
    if (adminExists) return 'admin account already exists';

    // hash user password
    const salt = await bcrypt.genSalt(10);
    let password = 'admin1234';

    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await User.create({
      firstName: 'Kofi',
      lastName: 'Oghenevwegba',
      email: 'vwegbakofi@gmail.com',
      userRole: 'admin',
      password: hashedPassword,
      isAdmin: true,
      isManager: false,
      isStaff: false,
    });

    return 'new admin created successfully';
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
