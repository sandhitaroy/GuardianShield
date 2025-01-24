const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));
    } catch (error) {
        console.error(' MongoDB Connection Failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
