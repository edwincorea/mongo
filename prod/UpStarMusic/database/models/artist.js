const mongoose = require("mongoose");
const AlbumSchema = require("./album");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    website: String,
    netWorth: Number,
    labelName: String,
    retired: Boolean,
    albums: [AlbumSchema]
});

ArtistSchema.pre("remove", function(next){    
    const Album = mongoose.model("album");
    Album.remove({_id: {$in: this.albums}})
      .then(() => next());
});

const Artist = mongoose.model("artist", ArtistSchema);

module.exports = Artist;
