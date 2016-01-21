import Dispatcher from 'dispatcher/Dispatcher';
import Store from 'stores/Store';
import { AppConstants } from 'constants';

let _demo = {
  hello: 'Hello World'
};

class AppStore extends Store {
  constructor() {
    super();
  }

  onAction(action) {
    switch(action.type) {
      case AppConstants.APP_GET:
        this.get(action.data);
        break;

      default:
        return true;
    }
  }

  addChangeListener(callback) {
    this.on(AppConstants.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  }

  get(id) {
    return _demo[id];
  }
}

let appStore = new AppStore();
Dispatcher.registerStore(appStore);
export default appStore;
