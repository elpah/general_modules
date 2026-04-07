import "dotenv/config";
import mongoose from "mongoose";

const connectionString = process.env.CONNECTION_STRING;

// =====================
// CONNECT TO DATABASE
// =====================
async function main() {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");

    await runExamples();
  } catch (err) {
    console.error("Connection error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected");
  }
}

main();

// =====================
// SCHEMA
// =====================
const personSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
});

// =====================
// 📦 VIRTUALS
// =====================
personSchema.virtual("fullname").get(function () {
  return `${this.firstname}, ${this.lastname}`;
});


// //  enable virtuals in output
// personSchema.set("toJSON", { virtuals: true });
// personSchema.set("toObject", { virtuals: true });

// =====================
// MODEL
// =====================
const Person = mongoose.model("Person", personSchema);

// =====================
// TEST CODE
// =====================
async function runExamples() {
  try {
    const newPerson = new Person({
      firstname: "Elpah",
      lastname: "Chris",
    });

    await newPerson.save();

    // console.log(newPerson);

	console.log(newPerson.fullname);
  } catch (error) {
    console.log(error);
  }
}
