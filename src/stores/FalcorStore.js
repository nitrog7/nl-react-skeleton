import Dispatcher from 'dispatcher/Dispatcher';
import Store from 'stores/Store';
import { FalcorConstants } from 'constants';
import falcor from 'falcor';
import jsonGraph from 'falcor-json-graph';
import HttpDataSource from 'falcor-http-datasource';

let _model = new falcor.Model({
  source: new HttpDataSource('/model.json')
});

class FalcorStore extends Store {
  constructor() {
    super();
  }

  onAction(action) {
    switch(action.type) {
      case FalcorConstants.FALCOR_GET_VALUE:
        this.getValue(action.data);
        break;

      case FalcorConstants.FALCOR_GET:
        this.get(action.data);
        break;

      case FalcorConstants.FALCOR_SET_VALUE:
        this.setValue(action.data);
        this.emit(FalcorConstants.CHANGE_EVENT);
        break;

      case FalcorConstants.FALCOR_SET:
        this.set(action.data);
        this.emit(FalcorConstants.CHANGE_EVENT);
        break;

      case FalcorConstants.FALCOR_CALL:
        let args = action.data || [];
        this.call(args[0], args[1], args[2], args[3]);
        this.emit(FalcorConstants.CHANGE_EVENT);
        break;

      default:
        return true;
    }
  }

  addChangeListener(callback) {
    this.on(FalcorConstants.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(FalcorConstants.CHANGE_EVENT, callback);
  }

  getValue(path) {
    return _model.getValue(path);
  }

  get(...pathSet) {
    return _model.get(...pathSet).then(data => {
      return data.json;
    });
  }

  setValue(path) {
    return _model.setValue(path);
  }

  set(...pathValue) {
    return _model.set(...pathValue);
  }

  call(path, arg, ref, thisPath) {
    return _model.call(path, arg, ref, thisPath);
  }

  createAtom(item) {
    return jsonGraph.atom(item);
  }

  createRef(item) {
    return jsonGraph.ref(item);
  }

  createError(item) {
    return jsonGraph.error(item);
  }
}

let falcorStore = new FalcorStore();
Dispatcher.registerStore(falcorStore);
export default falcorStore;
