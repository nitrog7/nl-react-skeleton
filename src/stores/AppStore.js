import AppDispatcher from 'dispatcher/AppDispatcher';
import AppConstants from 'constants/AppConstants';
import objectAssign from 'react/lib/Object.assign';
import EventEmitter from 'events';

let _demo = {
  hello: 'Hello World'
};

let AppStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: (cb) => {
    AppStore.on(AppConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: (cb) => {
    AppStore.removeListener(AppConstants.CHANGE_EVENT, cb);
  },
  get: (id) => {
    return _demo[id];
  }
});

AppDispatcher.register((payload) => {
  let action = payload.action;

  switch(action.actionType) {
    case AppConstants.APP_GET:
      AppStore.get(action.data);
      break;

    default:
      return true;
  }
});

export default AppStore;
