const INITIAL_STATE = {
  id: "",
};

export default function RideId(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_RIDE_ID":
      return { id: action.payload };

    default:
      return state;
  }
}
