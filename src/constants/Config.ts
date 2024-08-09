import Config from "react-native-config";
export const DataConfig = {
  BASE_URL: Config.REACT_APP_BASE_URL || "",
  REDUX_KEY: `mitaskapp/root/${Config.APP_REDUX_STORE_KEY}` || "",
};
