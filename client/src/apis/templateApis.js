import axiosInstance from '../config/axiosInstance';

const deleteTemplate = async (id) => {
  const { data, status, statusText } = await axiosInstance.delete(
    `template/delete/${id}`
  );

  return { data, status, statusText };
};
export { deleteTemplate };
