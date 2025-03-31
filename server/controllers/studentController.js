import sendEmail from '../services/nodemailer.js';
import {
  generateOtp,
  generatePassword,
  generateToken,
  hashPassword,
} from '../utils/authUtilities.js';
import { Student } from '../models/index.js';

const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      enrollmentNumber,
      courseDetails,
      institutionDetails,
    } = req.body;

    const creatorId = req.user._id;

    if (
      !firstName ||
      !email ||
      !phoneNumber ||
      !enrollmentNumber ||
      !courseDetails
    ) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please add all required fields',
      });
    }

    // Check if student already exists
    const studentExist = await Student.findOne({
      $or: [{ email }, { enrollmentNumber }],
    });
    if (studentExist) {
      return res.status(400).json({
        status: 'failed',
        message: 'Student already exists with this email or enrollment number',
      });
    }

    // Generate and hash a password
    const password = await generatePassword();
    const hashedPassword = await hashPassword(password);

    // Create student
    const student = await Student.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      enrollmentNumber,
      courseDetails,
      institutionDetails,
      creatorId,
    });

    if (student) {
      sendEmail({
        to: email,
        subject: 'Welcome to our platform',
        text: `Hello ${firstName} ${lastName}, Your student account has been created successfully. Your password is ${password}`,
      });

      return res.status(201).json({
        status: 'success',
        message: 'Student created successfully',
        studentData: {
          id: student._id,
          enrollmentNumber: student.enrollmentNumber,
          password: password,
        },
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating student',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'Please provide both email and password',
      });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({
        status: 'failed',
        message: 'Student not found. Please check your email',
      });
    }

    const {
      _id,
      firstName,
      lastName,
      phoneNumber,
      enrollmentNumber,
      courseDetails,
      role,
    } = student;

    if (student && (await bcrypt.compare(password, student.password))) {
      return res.status(200).json({
        status: 'success',
        message: `Welcome back ${firstName} ${lastName}`,
        token: await generateToken(_id),
        student: {
          _id,
          firstName,
          lastName,
          email,
          phoneNumber,
          enrollmentNumber,
          courseDetails,
          role,
        },
      });
    }

    return res.status(401).json({
      status: 'error',
      message: 'Invalid Credentials',
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while logging in',
    });
  }
};

// Get all students - Admin
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('institutionDetails')
      .populate('creatorId');

    res.status(200).json({
      status: 'success',
      message: 'All students fetched successfully',
      data: students,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching users',
    });
  }
};

const getMyCertificates = async (req, res) => {
  try {
    const studentId = req.user._id;

    const student = await Student.findById({ _id: studentId }).populate(
      'certificates'
    );

    if (!student) {
      return res.status(404).json({
        status: 'failed',
        message: 'Student not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Certificates retrieved successfully',
      certificates: student.certificates,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while retrieving certificates',
    });
  }
};

// Get all users - Admin
const getMyStudents = async (req, res) => {
  try {
    const userId = req.user._id;
    const students = await Student.find({ creatorId: userId });

    res.status(200).json({
      status: 'success',
      message: 'All users fetched successfully',
      data: students,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while fetching students',
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findByIdAndDelete({ _id: studentId });

    if (!student) {
      return res.status(404).json({
        status: 'failed',
        message: 'Student not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while deleting student',
    });
  }
};

export const studentController = {
  createStudent,
  loginStudent,
  getAllStudents,
  getMyCertificates,
  deleteStudent,
  getMyStudents,
};
