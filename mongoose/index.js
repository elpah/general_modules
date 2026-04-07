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
    // Find all
    // -----------------
    // const allMovies = await Movie.find({});
    // console.log(allMovies);
    // -----------------
    // Find by title
    // -----------------
    // const result = await Movie.find({ title: "cindarella" });
    // console.log("🎥 cindarella:", result);
    // -----------------
    // Find by year greater or equal to 2010
    // -----------------
    // const result = await Movie.find({ year:{$gte:2021} });
    // console.log("🎥 After 2010:", result);
    // -----------------
    // FindOne   with id or title in this case
    // This will return the first item if multiple results are found
    // -----------------
    // const movie = await Movie.findOne({ title:'Cindarella' });
    // console.log(movie);
    // or FindById
    // const movie = await Movie.findById('replaceWithRealIdInDb');
    // console.log(movie);
    // -----------------
    // UpdateOne
    // -----------------
    // const res = await Movie.updateOne({ title:'Cindarella' }, {year:1998}); // this wil update only first instance or Cindarella
    // console.log(res)
    // -----------------
    // UpdateMany
    // -----------------
    // const res = await Movie.updateMany({ title:{$in:['titanic','Cindarella']} }, { rating: 20 }); // this wil update all movies with title in array with rating of 20
    // console.log(res)

    // -----------------
    // FindOneAndUpdate
    //not that when you console.log, this will print the old value
    // -----------------
    // const movie = await Movie.findOneAndUpdate(
    //   { title: "Super Man" },
    //   { rating: 50 },
    // );
    // console.log(movie);

    // -----------------
    // FindOneAndUpdate
    // to print the new updated value, pass in a third argument, new.. which is false by default. this will print the old value
    // -----------------
    const movie = await Movie.findOneAndUpdate(
      { title: "Super Man" },
      { rating: 80 },
      { new: true },
    );
    console.log(movie);
    // const movies = await Movie.find({});
    // console.log(movies);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}
