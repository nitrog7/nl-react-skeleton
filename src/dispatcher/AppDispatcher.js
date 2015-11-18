import { Dispatcher } from 'flux';

let AppDispatcher = new Dispatcher();

AppDispatcher.handleAppAction = action => {
  this.dispatch({
    source: 'APP_ACTION',
    action: action
  });
};

AppDispatcher.handleFalcorAction = action => {
  this.dispatch({
    source: 'FALCOR_ACTION',
    action: action
  });
};

export default AppDispatcher;
