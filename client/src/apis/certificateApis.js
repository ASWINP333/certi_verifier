import axiosInstance from '../config/axiosInstance';

const getMyCertificates = async () => {
  const { data, status, statusText } = await axiosInstance.get(
    `certificate/myCertificates`
  );

  return { data, status, statusText };
};

const getInstitutionCertificates = async () => {
  const { data, status, statusText } = await axiosInstance.get(
    `certificate/institutionCertificates`
  );

  return { data, status, statusText };
};

const getAllCertificates = async () => {
  const { data, status, statusText } =
    await axiosInstance.get(`certificate/getAll`);

  return { data, status, statusText };
};

const updateCertificate = async ({ id, updatedData }) => {
  const { data, status, statusText } = await axiosInstance.put(
    `certificate/update/${id}`,
    updatedData
  );

  return { data, status, statusText };
};

const deleteCertificate = async (id) => {
  const { data, status, statusText } = await axiosInstance.delete(
    `certificate/delete/${id}`
  );

  return { data, status, statusText };
};
export {
  getMyCertificates,
  updateCertificate,
  deleteCertificate,
  getInstitutionCertificates,
  getAllCertificates,
};
