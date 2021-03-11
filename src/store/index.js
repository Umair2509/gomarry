import { createStore } from "redux";
import reducers from "./reducers";
const store = createStore(
  reducers,
  {}
  // compose(
  //   applyMiddleware(thuck),

  //   offline(offlineConfig),
  // ),
);

export default store;
