import { Dispatcher } from 'flux';

let AppDispatcher = new Dispatcher();

AppDispatcher.handleAppAction = action => {
  this.dispatch({
    source: 'APP_ACTION',
    action: action
  });
};

export default AppDispatcher;
