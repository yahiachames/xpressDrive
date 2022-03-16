const INITIAL_STATE = {
  currentPosition: {
    latitude: 0,
    longitude: 0,
    region: "",
    subregion: "",
    street: "",
    code_postale: 0,
  },
  destination: {
    latitude: 0,
    code_postale: 0,
    longitude: 0,
    region: "",
    subregion: "",
    street: "",
  },
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOCATION_ATTEMPT":
      return { ...state, currentPosition: action.payload };
    case "ADD_DESTINATION":
      return { ...state, destination: action.payload };

    default:
      return state;
  }
}
