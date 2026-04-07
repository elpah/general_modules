import "dotenv/config";
import mongoose from "mongoose";

const connectionString = process.env.CONNECTION_STRING;

// =====================
// 🔌 CONNECT TO DATABASE
// =====================
async function main() {
  try {
    await mongoose.connect(connectionString);
    console.log("✅ Connected to MongoDB");

    await runExamples();
  } catch (err) {
    console.error("❌ Connection error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

main();

// =====================
// 📦 SCHEMA
// =====================
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// =====================
//  INSTANCE METHOD
// =====================
productSchema.methods.greet = function () {
  console.log(`Hello from ${this.name}`);
};

// =====================
//  STATIC METHOD
// =====================
productSchema.statics.fireSale = function () {
  return this.updateMany({ price: { $gte: 11 } }, { $mul: { price: 0.9 } });
};

// =====================
//  MODEL (AFTER METHODS)
// =====================
const Product = mongoose.model("Product", productSchema);

// =====================
// 🧪 TESTS
// =====================
const runExamples = async () => {
  try {
    const bike = new Product({ name: "bike", price: 599 });
    await bike.save();

    const allProducts = await Product.find({});
    console.log(allProducts);

    await Product.fireSale();
  } catch (error) {
    console.log(error);
  }
};
