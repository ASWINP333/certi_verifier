import { Certificate, Institution, Student, User } from '../models/index.js';

const getDashboardValues = async (req, res) => {
  try {
    const userId = req.user._id;

    const role = req.user.role;

    const institutionId = req.user.institutionDetails;

    const certificates =
      role === 'Admin'
        ? await Certificate.find({ issuedBy: userId })
        : await Certificate.find({ institutionDetails: institutionId });
    const institution = await Institution.find();
    const users =
      role === 'Staff'
        ? await Student.find({ creatorId: userId })
        : await User.find({ creatorId: userId });

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
