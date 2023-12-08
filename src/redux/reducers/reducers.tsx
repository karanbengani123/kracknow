import { combineReducers } from 'redux';

const cartItemsReducer = (state = 0, action: { type: string; cartCount: number; }) => {
  state = action.type === 'UPDATE_CART_COUNT' ? action.cartCount : 0;
  return state;
};

const profilePictureReducer = (state = '', action: { type: string; updateProfilePicture: string; }) => {
  state = action.type === 'UPDATE_PROFILE_PICTURE' ? action.updateProfilePicture : '';
  return state;
};

const notificationCountReducer = (state = 0, action: { type: string; notificationCount: number; }) => {
  if (action.type === 'UPDATE_NOTIFICATION_COUNT') {
    state = action.notificationCount;
    return state;
  }

  return state;
};

// const navigationUrlReducer = (state = undefined, action) => {
//   state = action.type === 'UPDATE_NAVIGATION_URL' ? action.navigationUrl : '';
//   return state;
// };

export const rootReducer = combineReducers({
  cartCount: cartItemsReducer,
  updateProfilePicture: profilePictureReducer,
  notificationCount: notificationCountReducer,
//   navigationUrl: navigationUrlReducer
});
