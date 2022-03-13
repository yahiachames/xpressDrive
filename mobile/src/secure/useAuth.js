// import {useContext} from "react";
// import AuthContext from "../context/AuthContext"
// import authStorage from "./storage";
// import {getAccount} from "../controllers/AuthApi";

// const useAuth = () => {
//     const {user, setUser} = useContext(AuthContext);

//     const logIn = async (authToken) => {
//         await authStorage.storeToken(authToken);
//         const newUser = await getAccount()
//         if (!newUser.ok) return;
//         //console.log("new user", newUser.data)
//         setUser(newUser.data)
//     };

//     const logOut = () => {
//         setUser(null);
//         authStorage.removeToken();
//     };

//     return {user, logIn, logOut};
// };

// export default useAuth;
