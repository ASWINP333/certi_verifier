import {
  contractInstance,
  deployerAddress,
} from '../blockchain-services/instance.js';
import { Certificate, Institution } from '../models/index.js';

const createCertificate = async (req, res) => {
  try {
    const { cId, candidateName, course, grade, certificateName, templateId } =
      req.body;

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
      !course ||
      !grade ||
      !certificateName ||
      !templateId
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
      institutionDetails: institutionid,
      course,
      grade,
      certificateName,
      issuedBy,
      templateId,
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
    console.log(error.message);

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while verifying certificate',
    });
  }
};

const revokeCertificate = async (req, res) => {
  try {
    const { cId } = req.params;
    const certificate = await Certificate.findOne({ cId: cId });

    if (!certificate) {
      return res.status(404).json({
        status: 'failed',
        message: 'Certificate not found',
      });
    }

    await Certificate.findOneAndUpdate(
      { cId: cId },
      {
        status: 'revoked',
      },
      { new: true }
    );

    return res.status(200).json({
      status: 'success',
      message: 'Certificate rovoked successfully',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while revoking certificate',
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
    const certificates = await Certificate.find({ issuedBy: _id })
      .populate('institutionDetails')
      .populate('issuedBy');
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
    const { cId, iId } = req.params;
    const certificateUniqueId = cId + iId;
    const certificate = await Certificate.findOne({
      certificateUniqueId: certificateUniqueId,
    })
      .populate('institutionDetails')
      .populate('issuedBy')
      .populate('templateId');

    if (!certificate) {
      return res.status(404).json({
        status: 'failed',
        message: 'Certificate not found',
      });
    }

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
    const { id } = req.params;
    const certificate = await Certificate.findOne({ _id: id });
    if (!certificate) {
      return res.status(404).json({
        status: 'failed',
        message: 'Certificate not found',
      });
    }
    await Certificate.findByIdAndDelete({ _id: id });
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

const getCertificatesByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const { _id } = req.user;

    const issuedBy = _id;

    // Validate date range
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Start date and end date are required',
      });
    }

    // Parse dates and ensure valid format
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set the end date to the end of the day

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format',
      });
    }

    // Find certificates within the date range and sort by createdAt (ascending)
    const certificates = await Certificate.find({
      createdAt: { $gte: start, $lte: end },
      issuedBy,
    })
      .populate('institutionDetails')
      .populate('issuedBy')
      .sort({ createdAt: 1 });

    if (!certificates.length) {
      return res.status(404).json({
        status: 'error',
        message: 'No certificates found for the given date range',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Certificates fetched successfully',
      certificates,
    });
  } catch (error) {
    console.error('Error fetching certificates by date:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong while getting certificates',
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
  revokeCertificate,
  getCertificatesByDate,
};
