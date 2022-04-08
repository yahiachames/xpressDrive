import api from "./api-config";

export const addCar = (id, values) => {
  console.log(id, "from add car");
  return api.post(`car/create/${id}`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
