import api from "./api-config";

export const updateDoc = (id, formdata) => {
  return api.post(`documents/update/${id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
