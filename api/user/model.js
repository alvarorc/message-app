const mongoose = require('mongoose');
const mongooseKeywords = require('mongoose-keywords');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const roles = ['user', 'admin']

const UserSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  }
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = process.env.NODE_ENV === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
});

UserSchema.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'name']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
    }

    fields.forEach(field => { view[field] = this[field] });

    return view;
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false);
  }
}

UserSchema.statics = {
  roles,
}

UserSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] });

module.exports = mongoose.model('User', UserSchema);
