import { Certificate, Institution, User } from '../models/index.js';

const getDashboardValues = async (req, res) => {
  try {
    const userId = req.user._id;

    const certificates = await Certificate.find({ issuedBy: userId });
    const institution = await Institution.find();
    const users = await User.find({ creatorId: userId });

    const dashboardData = {
      certificates: certificates.length,
      institutions: institution.length,
      users: users.length,
    };

    return res.status(200).json({
      status: 'success',
      message: 'Dashboard details fetched successfully',
      dashboardData,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching dashboard details.',
      error: error.message,
    });
  }
};

export const dashboardController = {
  getDashboardValues,
};
