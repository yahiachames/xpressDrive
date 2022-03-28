const INITIAL_STATE = {
  phone: "",
};

export default function PhoneNumber(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "PHONE_REGISTER":
      return { phone: action.payload };

    default:
      return state;
  }
}
