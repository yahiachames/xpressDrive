import api from "./api-config";

export const loginApi = ({username, password}) => {
    console.log(username, password);
    return api.post("user/login", {
        username,
        password,
    });
};

export const signupApi = ({phone, email, role}) =>
    api.post("user/signup", {
        phone,
        email,
        role,
    });
