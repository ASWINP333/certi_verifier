import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    cId: {
      type: String,
      required: [true, 'Certificate ID is required'],
      unique: true,
    },
    candidateName: {
      type: String,
      required: [true, 'Candidate name is required'],
    },
    certificateName: {
      type: String,
      required: [true, 'Certificate name is required'],
    },
    institutionDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Institution',
      required: [true, 'Institution reference is required'],
    },
    course: {
      type: String,
      required: [true, 'Course name is required'],
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      //   required: [true, 'Issuer is required'],
    },
    transactionDetails: {
      blockNumber: {
        type: Number,
        // required: [true, 'Block number is required'],
      },
      transactionHash: {
        type: String,
        // required: [true, 'Transaction hash is required'],
      },
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'revoked'],
      default: 'pending', // Default status before blockchain confirmation
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
