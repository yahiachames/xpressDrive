import { useEffect, useState } from "react";
import { AUTH_KEY, SERVER_URL } from "../config/config";
import storage from "../config/storage";

export default useImage = (img) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const getToken = async () => {
    setLoading(true);
    storage
      .getKey(AUTH_KEY)
      .then((res) => {
        setToken(res);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    getToken();
  }, [token]);

  return {
    uri: `${SERVER_URL}uploads/${img}`,
    headers: {
      Authorization: token,
    },
  };
};
