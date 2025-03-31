import { v2 as cloudinary } from 'cloudinary';
import { Template } from '../models/index.js';
import { Readable } from 'stream';

// Create a new template
const createTemplate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded',
      });
    }
    const { _id } = req.user;
    const issuedBy = _id;

    const { templateId, templateName } = req.body;

    // Create a readable stream from the buffer
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    // Upload image to Cloudinary directly from the Buffer
    const myCloud = cloudinary.uploader.upload_stream(
      { folder: 'templateImage', width: 150, crop: 'scale' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            status: 'error',
            message: 'Failed to upload image',
            error: error.message,
          });
        }

        // Create new template in the database
        const template = await Template.create({
          templateId,
          templateName,
          templateImage: {
            public_id: result.public_id,
            url: result.secure_url,
          },
          issuedBy,
        });

        return res.status(201).json({
          status: 'success',
          message: 'Template created successfully',
          template,
        });
      }
    );

    bufferStream.pipe(myCloud);
  } catch (error) {
    console.error('Error creating template:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create template',
      error: error.message,
    });
  }
};

const getTemplates = async (req, res) => {
  try {
    const { _id } = req.user;
    const templates = await Template.find({ issuedBy: _id });
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve templates',
      error: error.message,
    });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Template.findOne({ _id: id });
    if (!certificate) {
      return res.status(404).json({
        status: 'failed',
        message: 'Template not found',
      });
    }
    await Template.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: 'success',
      message: 'Template deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while deleting template',
    });
  }
};

export const templateController = {
  createTemplate,
  getTemplates,
  deleteTemplate,
};
