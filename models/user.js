const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    is_member: { type: Boolean, required: true, default: false },
    is_admin: { type: Boolean, required: true, default: false }
});

UserSchema.virtual('full_name').get(function() {
    let full_name = '';
    if (this.first_name && this.last_name) {
        full_name = this.first_name + ' ' + this.last_name;
    };
    if (!this.first_name || !this.last_name) {
        full_name = '';
    };
    return full_name; 
});

module.exports = mongoose.model('User', UserSchema);