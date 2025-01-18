import { User } from '../models/index.js';
import sendEmail from '../services/nodemailer.js';
import {
  generatePassword,
  generateToken,
  hashPassword,
} from '../utils/authUtilities.js';
import bcrypt from 'bcrypt';

// Register New User
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, designation } =
      req.body;

    if (!firstName || !email || !password || !phoneNumber || !designation) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(404).json({
        status: 'failed',
        message: 'User exists, check email id',
      });
    }

    //Hashing password
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      designation,
    });

    return res.status(201).json({
      status: 'success',
      message: 'User created succesfully',
      userData: {
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating user',
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found ,Please check email',
      });
    }

    const { _id, firstName, lastName, phoneNumber, designation, role } = user;
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        status: 'success',
        message: `Welsome back ${firstName} ${lastName}`,
        token: await generateToken(_id),
        user: {
          _id,
          firstName,
          lastName,
          email,
          phoneNumber,
          designation,
          role,
        },
      });
    }
    return res.status(401).json({
      status: 'error',
      message: 'Invalid Credentials',
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while login',
    });
  }
};

//

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, designation } = req.body;
    const creatorid = '';
    if (!firstName || !email || !phoneNumber || !designation) {
      return res.status(404).json({
        status: 'failed',
        message: 'Please add all fields',
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(404).json({
        status: 'failed',
        message: 'User exists, check email id',
      });
    }
    //genrating random password
    const password = await generatePassword();
    //hashed password
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      designation,
    });

    if (user) {
      sendEmail({
        to: email,
        subject: 'welcome to our platform',
        text: `Hello ${firstName} ${lastName}, Your account has been created successfully. Your password is ${password}`,
      });
    }

    return res.status(201).json({
      status: 'success',
      message: 'User created succesfully',
      userData: {
        id: user._id,
        password: password,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: 'error',
      message: 'Something went wrong while creating user',
    });
  }
};

export const userController = { register, login, createUser };
