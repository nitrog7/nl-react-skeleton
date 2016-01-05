import AppDispatcher from 'dispatcher/AppDispatcher';
import AppConstants from 'constants/app';

let AppActions = {
  get: function(id) {
    AppDispatcher.handleAppAction({
      actionType: AppConstants.APP_GET,
      data: id
    });
  }
};

export default AppActions;
