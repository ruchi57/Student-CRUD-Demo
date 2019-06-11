import { createStore } from "redux";
import rootReducer from "../reducer/RootReducer";

export function configureStore() {
    const store = createStore(rootReducer);
    return store;
  };
  
export const store = configureStore();