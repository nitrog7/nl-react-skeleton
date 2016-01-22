import { Dispatcher, Store } from 'nl-flux';
import { FalcorConstants } from 'constants';
import falcor from 'falcor';
import jsonGraph from 'falcor-json-graph';
import HttpDataSource from 'falcor-http-datasource';
import { AuthService } from 'services';

let _model = new falcor.Model({
  cache: localStorage.getItem('cache') ? JSON.parse(localStorage.getItem('cache')) : null,
  source: new HttpDataSource('/model.json', {
    headers: {
      Authorization: AuthService.getKey()
    }
  }),
  onChange: () => {
    if(_model) {
      localStorage.setItem('cache', JSON.stringify(_model.getCache()));
    }
  }
});

class FalcorStore extends Store {
  constructor() {
    super();
  }

  onAction(action) {
    switch(action.type) {
      case FalcorConstants.FALCOR_GET_VALUE:
        this.getValue(action.data).then(item => {
          this.emit(FalcorConstants.GET_EVENT, item);
        });
        break;

      case FalcorConstants.FALCOR_GET:
        this.get(action.data).then(item => {
          this.emit(FalcorConstants.GET_EVENT, item);
        });
        break;

      case FalcorConstants.FALCOR_SET_VALUE:
        this.setValue(action.data);
        this.emit(FalcorConstants.CHANGE_EVENT);
        break;

      case FalcorConstants.FALCOR_SET:
        this.set(action.data).then(item => {
          this.emit(FalcorConstants.CHANGE_EVENT, item);
        });
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

  getValue(path) {
    return _model.getValue(path).then(results => results.json);
  }

  get(...pathSet) {
    return _model.get(...pathSet)
      .then(results => {
        if(results) {
          if(results.json) {
            return results.json;
          }
          else if(results.jsonGraph) {
            return results.jsonGraph;
          } else {
            return {};
          }
        } else {
          return {};
        }
      });
  }

  setValue(path) {
    return _model.setValue(path);
  }

  set(...pathValue) {
    return _model.set(...pathValue)
      .then(results => {
        if(results) {
          if(results.json) {
            return results.json;
          }
          else if(results.jsonGraph) {
            return results.jsonGraph;
          } else {
            return {};
          }
        } else {
          return {};
        }
      });
  }

  call(...args) {
    return _model.call(...args).then(results => {
      return results.json;
    });
  }

  createPath(item) {
    return jsonGraph.pathValue(item);
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
