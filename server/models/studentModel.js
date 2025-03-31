import mongoose from 'mongoose';

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter a first name'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'Please enter a phone number'],
    },
    enrollmentNumber: {
      type: String,
      required: [true, 'Please enter an enrollment number'],
      unique: true,
    },
    institutionDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution',
      required: [true, 'Institution reference is required'],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    courseDetails: {
      type: String,
      required: [true, 'Please enter course details'],
    },
    certificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate',
      },
    ],
    role: {
      type: String,
      required: true,
      default: 'student',
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
