import Dispatcher from 'dispatcher/Dispatcher';
import AppConstants from 'constants/app';

let AppActions = {
  get: id => {
    Dispatcher.dispatch(AppConstants.APP_GET, id);
  }
};

export default AppActions;
