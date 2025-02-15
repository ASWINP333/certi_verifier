import mongoose from 'mongoose';

const institutionSchema = new mongoose.Schema(
  {
    iId: {
      type: String,
      required: [true, 'Institution ID is required'],
      unique: true,
    },
    institutionName: {
      type: String,
      required: [true, 'Institution name is required'],
    },
    address: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Institution = mongoose.model('Institution', institutionSchema);

export default Institution;
