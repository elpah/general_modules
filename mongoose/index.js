
// import { clear } from "console";
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

    // Run examples here
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
// 📦 SCHEMA + MODEL
// =====================
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

// =====================
// 🧪 EXAMPLES / NOTES
// =====================
async function runExamples() {
  try {
    // -----------------
    // ➕ Create one movie
    // -----------------
    // const movie = new Movie({
    //   title: "Titanic",
    //   year: 2020,
    //   score: 10,
    //   rating: 8,
    // });
    // await movie.save();

    // -----------------
    // ➕ Insert many
    // -----------------
    // await Movie.insertMany([
    //   { title: "Titanic", year: 2020, score: 10, rating: 8 },
    //   { title: "Cinderella", year: 2021, score: 5, rating: 3 },
    //   { title: "Merlin", year: 2020, score: 8, rating: 9 },
    //   { title: "Avatar", year: 2020, score: 4, rating: 8 },
    //   { title: "Superman", year: 2020, score: 10, rating: 6 },
    // ]);

    // -----------------
    // 🔍 Find all
    // -----------------
    // const allMovies = await Movie.find({});
    // console.log(allMovies);

    // -----------------
    // 🔍 Find by title
    // -----------------
    const result = await Movie.find({ title: "cindarella" });
    console.log("🎥 cindarella:", result);


  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}