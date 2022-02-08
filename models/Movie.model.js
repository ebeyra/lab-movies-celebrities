const { Schema, model, Types, isValidObjectId } = require("mongoose");

const movieSchema = new Schema({
  name: String,
  genre: String,
  plot: String,
  cast: [{
      type: Types.ObjectId,
    //   ref: Celebrity
  }]
});

const Movie = model("Movie", movieSchema);
module.exports = Movie;
