import axiosInstance from '../config/axiosInstance';

const getMyStudents = async () => {
  const { data, status, statusText } =
    await axiosInstance.get(`student/myStudents`);

  return { data, status, statusText };
};

const deleteStudent = async (id) => {
  const { data, status, statusText } = await axiosInstance.delete(
    `student/delete/${id}`
  );

  return { data, status, statusText };
};

export { getMyStudents, deleteStudent };
