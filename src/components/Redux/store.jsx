import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

let initialState = {
  roleName: "",
};

function stateMonitor(state = initialState, action) {
  try {
    switch (action && action.type) {
      case "setRole":
        state = { ...state, roleName: action.value };
        return state;

      default:
        return state;
    }
  } catch { }
}

const persistConfig = {
  key: 'persist-store',
  storage,
};

const persistedReducer = persistReducer(persistConfig, stateMonitor);
const store = createStore(persistedReducer, stateMonitor)
export const persistor = persistStore(store);
export default store;