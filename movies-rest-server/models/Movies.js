const mongoose = require('mongoose');

const moviesSchemma = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name should be at least 2 characters'],
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: [1900, 'Minimum year should be 1950'],
        max: [2024, 'Maximum year should be 2024'],
    },
    genre: {
        type: String,
        minLength: [1, 'Genre should be at least 1 character'],
        required: true
    },
    runtime: {
        type: Number,
        min: [1, 'Minimum runtime should be 1'],
        max: [600, 'Maximum runtime should be 600'],
        required: true,
    },
    director: {
        type: String,
        minLength: [1, 'Director should be at least 1 character'],
        required: true,
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters'],
        required: true,
    },
    country: {
        type: String,
        minLength: [1, 'Country should be at least 1 character'],
        required: true,
    },
    imdbRating: {
        type: Number,
        min: [0, 'Minimum rating should be 0'],
        max: [10, 'Maximum rating should be 10'],
        required: true,
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Invalid image url'],
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    createdAt: Date,
});

moviesSchemma.pre('save', function() {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    };
});

const Movies = mongoose.model('Movies', moviesSchemma);

module.exports = Movies;