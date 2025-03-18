import axiosInstance from '../config/axiosInstance';

const getAllInstitutions = async () => {
  const { data, status, statusText } =
    await axiosInstance.get(`institution/getAll`);

  return { data, status, statusText };
};

const updateInstitution = async ({ id, updatedData }) => {
  const { data, status, statusText } = await axiosInstance.put(
    `institution/update/${id}`,
    updatedData
  );

  return { data, status, statusText };
};

const deleteInstitution = async (id) => {
  const { data, status, statusText } = await axiosInstance.delete(
    `institution/delete/${id}`
  );

  return { data, status, statusText };
};
export { getAllInstitutions, updateInstitution, deleteInstitution };
