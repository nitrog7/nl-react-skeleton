import AppDispatcher from 'dispatcher/AppDispatcher';
import FalcorConstants from 'constants/FalcorConstants';
import objectAssign from 'react/lib/Object.assign';
import EventEmitter from 'events';
import falcor from 'falcor';
import jsonGraph from 'falcor-json-graph';
import HttpDataSource from 'falcor-http-datasource';

let _model = new falcor.Model({
  source: new HttpDataSource('/model.json')
});

let FalcorStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: (cb) => {
    FalcorStore.on(FalcorConstants.CHANGE_EVENT, cb);
  },
  removeChangeListener: (cb) => {
    FalcorStore.removeListener(FalcorConstants.CHANGE_EVENT, cb);
  },
  getValue: (path) => {
    return _model.getValue(path);
  },
  get: (...pathSet) => {
    return _model.get(...pathSet).then((data) => {
      return data.json;
    });
  },
  setValue: (path) => {
    return _model.setValue(path);
  },
  set: (...pathValue) => {
    return _model.set(...pathValue);
  },
  call: (path, arg, ref, thisPath) => {
    return _model.call(path, arg, ref, thisPath);
  },
  createAtom: (item) => {
    return jsonGraph.atom(item);
  },
  createRef: (item) => {
    return jsonGraph.ref(item);
  },
  createError: (item) => {
    return jsonGraph.error(item);
  }
});

AppDispatcher.register(function(payload) {
  let action = payload.action;

  switch(action.actionType) {
    case FalcorConstants.FALCOR_GET_VALUE:
      FalcorStore.getValue(action.data);
      break;

    case FalcorConstants.FALCOR_GET:
      FalcorStore.get(action.data);
      break;

    case FalcorConstants.FALCOR_SET_VALUE:
      FalcorStore.setValue(action.data);
      FalcorStore.emit(FalcorConstants.CHANGE_EVENT);
      break;

    case FalcorConstants.FALCOR_SET:
      FalcorStore.set(action.data);
      FalcorStore.emit(FalcorConstants.CHANGE_EVENT);
      break;

    case FalcorConstants.FALCOR_CALL:
      let args = action.data || [];
      FalcorStore.call(args[0], args[1], args[2], args[3]);
      FalcorStore.emit(FalcorConstants.CHANGE_EVENT);
      break;

    default:
      return true;
  }
});

export default FalcorStore;
