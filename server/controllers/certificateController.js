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

    const institutionid = req.user.institutionDetails;

    const institutionDetail = await Institution.findOne({
      _id: institutionid,
    });

    const issuedBy = _id;

    const certificateUniqueId = cId + institutionDetail?.iId;

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

    const certificate = await Certificate.create({
      cId,
      certificateUniqueId,
      candidateName,
      institutionDetails,
      course,
      grade,
      certificateName,
      issuedBy,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Certificate created succesfully',
      certificateData: {
        id: certificate._id,
      },
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating certificate',
    });
  }
};

const verifyCertificate = async (req, res) => {
  try {
    const { cId } = req.params;
    const certificate = await Certificate.findOne({ cId: cId }).populate(
      'institutionDetails'
    );

    if (!certificate) {
      return res.status(404).json({
        status: 'failed',
        message: 'Certificate not found',
      });
    }

    const trx = await contractInstance.methods
      .issue(
        certificate.certificateUniqueId,
        certificate.cId,
        certificate.candidateName,
        certificate.certificateName,
        certificate.course,
        certificate.grade,
        certificate.institutionDetails.institutionName
      )
      .send({ from: deployerAddress, gasLimit: 927000 });

    if (!trx) {
      return res.status(400).json({
        status: 'error',
        message:
          'Something went wrong while creating certificate in blockchain',
      });
    }

    await Certificate.findOneAndUpdate(
      { cId: cId },
      {
        status: 'verified',
        transactionDetails: {
          transactionHash: trx.transactionHash,
          blockNumber: trx.blockNumber.toString(),
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Certificate verified successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while verifying certificate',
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

const getMyCertificates = async (req, res) => {
  try {
    const { _id } = req.user;
    const certificates = await Certificate.find({ issuedBy: _id }).populate(
      'institutionDetails'
    );
    return res.status(200).json({
      status: 'success',
      message: 'Certificates fetched successfully',
      certificates,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching my certificates',
    });
  }
};

const getSingleCertificate = async (req, res) => {
  try {
    const { cId } = req.params;
    const certificate = await Certificate.findOne({ cId: cId }).populate(
      'institutionDetails'
    );

    // const blockchainCall = await contractInstance.methods
    //   .getCertificate(certificate?.certificateUniqueId)
    //   .call();

    return res.status(200).json({
      status: 'success',
      message: 'Certificate fetched successfully',
      certificate,
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
  verifyCertificate,
  getAllCertificates,
  getSingleCertificate,
  updateCertificate,
  deleteCertificate,
  getMyCertificates,
};
