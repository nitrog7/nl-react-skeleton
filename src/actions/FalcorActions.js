import { Dispatcher } from 'nl-flux';
import { FalcorConstants } from 'constants';

let FalcorActions = {
  getValue: path => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_GET_VALUE, path);
  },
  get: (...pathSet) => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_GET, pathSet);
  },
  setValue: path => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_SET_VALUE, path);
  },
  set: (...pathValue) => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_SET, pathValue);
  },
  call: (path, arg, ref, thisPath) => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_CALL, [path, arg, ref, thisPath]);
  }
};

export default FalcorActions;
