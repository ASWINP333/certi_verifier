import {
  contractInstance,
  deployerAddress,
} from '../blockchain-services/instance.js';
import { Certificate, Institution } from '../models/index.js';

const createCertificate = async (req, res) => {
  try {
    const {
      cId,
      candidateName,
      institutionDetails,
      course,
      grade,
      certificateName,
    } = req.body;

    const { _id } = req.user;

    const issuedBy = _id;

    if (
      !cId ||
      !candidateName ||
      !institutionDetails ||
      !course ||
      !grade ||
      !certificateName
    ) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }

    const certificateExist = await Certificate.findOne({ cId: cId });

    if (certificateExist) {
      return res.status(404).json({
        status: 'failed',
        message: 'Certificate exists, check certificate ID',
      });
    }

    const institutionDetail = await Institution.findOne({
      _id: institutionDetails,
    });

    const trx = await contractInstance.methods
      .issue(
        cId,
        candidateName,
        certificateName,
        course,
        grade,
        institutionDetail.institutionName
      )
      .send({ from: deployerAddress, gasLimit: 927000 });

    if (!trx) {
      return res.status(400).json({
        status: 'error',
        message:
          'Something went wrong while creating certificate in blockchain',
      });
    }

    const certificate = await Certificate.create({
      cId,
      candidateName,
      institutionDetails,
      course,
      grade,
      certificateName,
      issuedBy,
      transactionDetails: {
        transactionHash: trx.transactionHash,
        blockNumber: trx.blockNumber.toString(),
      },
    });


    return res.status(201).json({
      status: 'success',
      message: 'Certificate created succesfully',
      certificateData: {
        id: certificate._id,
      },
      transactionHash: trx.transactionHash,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating certificate',
    });
  }
};

const getAllCertificates = async (req, res) => {
  try {
    const certificates =
      await Certificate.find().populate('institutionDetails');
    return res.status(200).json({
      status: 'success',
      message: 'Certificates fetched successfully',
      certificates,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching certificates',
    });
  }
};

// Get certificate by each user function need to add

const getSingleCertificate = async (req, res) => {
  try {
    const { cId } = req.params;
    const certificate = await Certificate.findOne({ cId: cId }).populate(
      'institutionDetails'
    );

    const blockchainCall = await contractInstance.methods.getCertificate(cId).call();


    return res.status(200).json({
      status: 'success',
      message: 'Certificate fetched successfully',
      certificate,
      blockchainCall
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching certificate',
    });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const { cId } = req.params;
    const certificate = await Certificate.findOne({ cId: cId });
    if (!certificate) {
      return res.status(404).json({
        status: 'failed',
        message: 'Certificate not found',
      });
    }
    const updatedCertificate = await Certificate.findOneAndUpdate(
      { cId: cId },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Certificate updated successfully',
      updatedCertificate,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while updating certificate',
    });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const { cId } = req.params;
    const certificate = await Certificate.findOne({ cId: cId });
    if (!certificate) {
      return res.status(404).json({
        status: 'failed',
        message: 'Certificate not found',
      });
    }
    await Certificate.findOneAndDelete({ cId: cId });
    return res.status(200).json({
      status: 'success',
      message: 'Certificate deleted successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while deleting certificate',
    });
  }
};

export const certificateController = {
  createCertificate,
  getAllCertificates,
  getSingleCertificate,
  updateCertificate,
  deleteCertificate,
};
