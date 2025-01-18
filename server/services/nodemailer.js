import transporter from './transporter.js';

const sendEmail = async (emailOptions) => {
  const emailDetails = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    ...emailOptions,
  });
  return emailDetails;
};

export default sendEmail;
