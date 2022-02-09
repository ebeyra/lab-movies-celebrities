const { Schema, model, Types } = require("mongoose");

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: Types.ObjectId,
      ref: "Celebrity",
    },
  ],
});

const Movie = model("Movie", movieSchema);
module.exports = Movie;
