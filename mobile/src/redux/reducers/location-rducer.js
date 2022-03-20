const INITIAL_STATE = {
  currentPoint: {
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
      return { ...state, currentPoint: action.payload };
    case "ADD_DESTINATION":
      return { ...state, destination: action.payload };
    case "UPDATE_CURRENT_POSITION":
      return {
        ...INITIAL_STATE,
        currentPoint: {
          ...INITIAL_STATE.currentPoint,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

    default:
      return state;
  }
}
