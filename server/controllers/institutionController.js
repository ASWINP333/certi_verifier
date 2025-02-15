import { Institution } from '../models/index.js';

const createInstitution = async (req, res) => {
  try {
    const { iId, institutionName, address } = req.body;

    if (!iId || !institutionName) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }

    const institutionExist = await Institution.findOne({ iId });

    if (institutionExist) {
      return res.status(404).json({
        status: 'failed',
        message: 'Institution exists, check institution ID',
      });
    }

    const institution = await Institution.create({
      iId,
      institutionName,
      address,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Institution created succesfully',
      institutionData: {
        id: institution._id,
      },
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating institution',
    });
  }
};

const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    return res.status(200).json({
      status: 'success',
      message: 'Institutions fetched successfully',
      institutions,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching institutions',
    });
  }
};

const getInstitutionById = async (req, res) => {
  try {
    const { iId } = req.params;
    const institution = await Institution.findOne({ iId: iId });
    return res.status(200).json({
      status: 'success',
      message: 'Institution fetched successfully',
      institution,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching institution',
    });
  }
};

const updateInstitution = async (req, res) => {
  try {
    const { iId } = req.params;
    const institution = await Institution.findOne({ iId: iId });
    if (!institution) {
      return res.status(404).json({
        status: 'failed',
        message: 'Institution not found',
      });
    }
    const updatedInstitution = await Institution.findOneAndUpdate(
      { iId: iId },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Institution updated successfully',
      updatedInstitution,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while updating institution',
    });
  }
};

const deleteInstitution = async (req, res) => {
  try {
    const { iId } = req.params;
    const institution = await Institution.findOne({ iId: iId });
    if (!institution) {
      return res.status(404).json({
        status: 'failed',
        message: 'Institution not found',
      });
    }
    await Institution.findOneAndDelete({ iId: iId });
    return res.status(200).json({
      status: 'success',
      message: 'Institution deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while deleting institution',
    });
  }
};

export const institutionController = {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
};
