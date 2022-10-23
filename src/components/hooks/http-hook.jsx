import { useCallback, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

export const useHttpClient = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar  } = useSnackbar()

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (item) => item !== httpAbortCtrl
        );

        if (response.status === 401) {
          closeSnackbar()
          enqueueSnackbar("User session expired. Please login again", {variant: 'error',})
          auth.logout();
          navigate("/login");
        }

        if (!response.ok) {
          throw new Error(responseData);
        }

        return responseData;
      } catch (err) {
        throw err;
      }
    },
    [auth, closeSnackbar, enqueueSnackbar, navigate]
  );

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((item) => item.abort());
    };
  }, []);

  return { sendRequest };
};
