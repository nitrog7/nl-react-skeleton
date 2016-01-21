import AppDispatcher from 'dispatcher/Dispatcher';
import AppConstants from 'constants/app';

let AppActions = {
  get: function(id) {
    Dispatcher.dispatch(AppConstants.APP_GET, id);
  }
};

export default AppActions;
