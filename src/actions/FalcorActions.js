import { Dispatcher } from 'nl-flux';
import { FalcorConstants } from 'constants';

let FalcorActions = {
  getValue: data => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_GET_VALUE, data);
  },
  get: data => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_GET, data);
  },
  setValue: data => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_SET_VALUE, data);
  },
  set: data => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_SET, data);
  },
  call: (path, arg, ref, thisPath) => {
    Dispatcher.dispatch(FalcorConstants.FALCOR_CALL, [path, arg, ref, thisPath]);
  }
};

export default FalcorActions;
