class Dispatcher {
  /**
   * Create a new instance of the Dispatcher.  Note that the Dispatcher
   * is a Singleton pattern, so only one should ever exist.
   *
   * @constructor
   * @this {Dispatcher}
   * @param {object} options  Over-rides for the default set of options
   */
  constructor(options = {}) {
    this.options = options;

    // Create a hash of all the stores - used for registration / deregistration
    this.stores = {};
  }

  /**
   * Dispatches an Action to all the stores
   *
   * @param {Action} action The action to dispatch to all the stores
   */
  dispatch(type, data = {}) {
    if(typeof actionType !== 'string') {
      return;
    }

    let action = {type, data};

    // When an action comes in, it must be completely handled by all stores
    for(let storeName in this.stores) {
      this.stores[storeName].onAction(action);
    }
  }

  /**
   * Registers a new Store with the Dispatcher
   *
   * @param {string} name A unique name for the Store
   * @param {Store} store The store object
   * @throws {Exception} Store Already Exists
   */
  registerStore(store) {
    let uid = store.uid;
    if(uid in this.stores) {
      throw 'Store Already Exists';
    }
    this.stores[uid] = store;
  }

  /**
   * De-registers a named store from the Dispatcher (completeness of API)
   *
   * @param {string} name The name of the store
   * @param {bool} force Force the store to unmount
   */
  deregisterStore(uid, force = false) {
    if(uid in this.stores) {
      delete this.stores[uid];
    } else {
      if(!force) {
        throw 'Store is not registered';
      }
    }
  }

  /**
   * Gets a store that is registered with the Dispatcher
   *
   * @param {string} name The name of the store
   * @returns {Store} the store object
   * @throws 'Invalid Store' if the store does not exist
   */
  getStore(uid) {
    if(uid in this.stores) {
      return this.stores[uid];
    } else {
      throw 'Invalid Store';
    }
  }
}

let dispatcher = new Dispatcher();
export default dispatcher;
