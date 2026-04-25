const mongoose = require('mongoose');
async function test() {
  try {
    console.log("Connecting...");
    await mongoose.connect('mongodb+srv://astha:astha123@cluster0.sdtsdik.mongodb.net/?serverSelectionTimeoutMS=5000');
    console.log("SUCCESS");
    process.exit(0);
  } catch (err) {
    console.error("FAIL:", err.message);
    process.exit(1);
  }
}
test();
