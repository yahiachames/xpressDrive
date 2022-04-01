const INITIAL_STATE = {
  profile: {},
};

export default function PhoneNumber(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_PROFILE":
      console.log(action.payload.user);
      return { ...action.payload };

    default:
      return state;
  }
}
