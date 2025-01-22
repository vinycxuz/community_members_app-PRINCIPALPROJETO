const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: Object,
    default: null,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  authMethod: {
    type: String,
    enum: ['local', 'google', 'facebook', 'github'],
    required: true,
    default: 'local',
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
  accountVerificationToken: {
    type: String,
    default: null,
  },
  accountVerificationExpires: {
    type: Date,
    default: null,
  },
  passwordResetExpires: {
    type: Date,
    default: null,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  totalEarnings: {
    type: Number,
    default: 0,
  },
  nextEarningDate: {
    type: Date,
    default: () => new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
  ],
  hasSelectedPlan: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  }, { timestamps: true }
);

userSchema.methods.generateAccountVerificationToken = function () {
  const token = crypto.randomBytes(20).toString('hex');

  this.accountVerificationToken = crypto.createHash('sha256').update(token).digest('hex');
  this.generateAccountVerificationExpires = Date.now() + 10 * 60 * 1000;

  return token;
};

userSchema.methods.generatePasswordResetToken = function () {
  const passwordToken = crypto.randomBytes(20).toString('hex');

  this.accountVerificationToken = crypto.createHash('sha256').update(passwordToken).digest('hex');
  this.generateAccountVerificationExpires = Date.now() + 10 * 60 * 1000;

  return passwordToken;
};

module.exports = mongoose.model('User', userSchema);