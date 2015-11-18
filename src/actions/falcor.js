import AppDispatcher from '../dispatcher/AppDispatcher';
import FalcorConstants from '../constants/falcor';

let FalcorActions = {
  getValue: function(path) {
    AppDispatcher.handleFalcorAction({
      actionType: FalcorConstants.FALCOR_GET_VALUE,
      data: path
    });
  },
  get: function(...pathSet) {
    AppDispatcher.handleFalcorAction({
      actionType: FalcorConstants.FALCOR_GET,
      data: pathSet
    });
  },
  setValue: function(path) {
    AppDispatcher.handleFalcorAction({
      actionType: FalcorConstants.FALCOR_SET_VALUE,
      data: path
    });
  },
  set: function(...pathValue) {
    AppDispatcher.handleFalcorAction({
      actionType: FalcorConstants.FALCOR_SET,
      data: pathValue
    });
  },
  call: function(path, arg, ref, thisPath) {
    AppDispatcher.handleFalcorAction({
      actionType: FalcorConstants.FALCOR_CALL,
      data: [path, arg, ref, thisPath]
    });
  }
};

export default FalcorActions;
