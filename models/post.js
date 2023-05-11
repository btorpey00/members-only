const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const{ DateTime } = require('luxon');

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, required: true }
});

PostSchema.virtual('date_formatted').get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.Date_MED);
});

module.exports = mongoose.model('Post', PostSchema);