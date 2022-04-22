import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import storage from "../config/storage";
import { AUTH_KEY } from "../config/config";
import jwt_decode from "jwt-decode";
import SocketContext from "../context/SocketContext";
import { getOneDriver, updateOnline } from "../controllers/DriversAPis";
import { getOneRider } from "../controllers/RiderAPis";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { socket, setSocket } = useContext(SocketContext);

  const logIn = async (authToken) => {
    if (authToken) {
      storage
        .storeKey(AUTH_KEY, authToken)
        .then((res) => {
          const { role, user_id } = jwt_decode(authToken.split(" ")[1]);
          console.log(role, user_id, "from useAuth");
          if (role == "driver") {
            getOneDriver(user_id)
              .then((res) => {
                console.log(res, "from useAuth");
                setUser({ profile: res.data.data, role });
              })
              .catch((e) => console.log(e));
          } else {
            getOneRider(user_id)
              .then((res) => {
                console.log(res, "from useAuth");
                setUser({ profile: res.data.data, role });
              })
              .catch((e) => console.log(e));
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const logOut = () => {
    updateOnline(false, user.profile.user._id)
      .then((res) => {
        storage.removeKey(AUTH_KEY).then((res) => {
          socket.emit("deconnect", { id_user: user.sub });
          setUser(null);
        });
      })
      .catch((e) => console.log(e));
  };

  const persistUser = () => {
    storage.getKey(AUTH_KEY).then((res) => {
      console.log(res);
      logIn(res);
    });
  };

  return { logIn, logOut, persistUser };
};

export default useAuth;

const styles = StyleSheet.create({});
