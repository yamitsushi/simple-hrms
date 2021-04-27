import axios from "axios";
import { useState } from "react";
import { CModal, CModalBody, CProgress } from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import { purge } from "src/store/actions/authAction";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

const LoadingModal = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.id);

  axiosInstance.interceptors.request.use((config) => {
    setLoading(true);
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      if (error.response.status === 401 && user) dispatch(purge());
      return Promise.reject(error);
    }
  );
  return (
    <CModal show={loading} closeOnBackdrop={false} centered={true} size="sm">
      <CModalBody className="text-center">
        <h6>Loading</h6>
        <CProgress animated value={100} />
      </CModalBody>
    </CModal>
  );
};

export { LoadingModal };

export default axiosInstance;
