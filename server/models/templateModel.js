import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    templateId: {
      type: String,
      required: [true, 'Institution ID is required'],
      unique: true,
    },
    templateName: {
      type: String,
    },
    templateImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Template = mongoose.model('Template', templateSchema);

export default Template;
