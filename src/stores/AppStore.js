import AppDispatcher from 'dispatcher/AppDispatcher';
import AppConstants from 'constants/AppConstants';
import objectAssign from 'react/lib/Object.assign';
import EventEmitter from 'events';

let CHANGE_EVENT = 'change';

let _demo = {
  hello: 'Hello World'
};

let AppStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  get: id => {
    return _demo[id];
  }
});

AppDispatcher.register(function(payload) {
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
