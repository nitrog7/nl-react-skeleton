/**
 * This is the Store object, using this enables some
 * common functions across all inheriting classes.
 *
 * @class Store
 * @constructor
 */
import EventEmitter from 'events';

class Store extends EventEmitter {
  constructor() {
    super();
    this.registeredViews = {};
    this.storeData = {};
  };

  /**
   * A view needs to be able to register itself with the store to receive
   * notifications of updates to the store
   *
   * @param {function} callback the method to call back
   * @returns {string} an ID to be used when un-registering
   */
  registerView(callback) {
    let id = this.uid;
    this.registeredViews[id] = callback;
    return id;
  }

  /**
   * A view also needs to be able to de-register itself with the store to
   * stop receiving notifications of updates to the store.
   *
   * @param {string} id the ID from the call to registerView()
   * @param {boolean} force don't throw an error if it doesn't exist
   */
  deregisterView(id, force = false) {
    if (id in this.registeredViews) {
      delete this.registeredViews[id];
    } else {
      if (!force) {
        throw 'Invalid View Registration ID';
      }
    }
  }

  /**
   * Pass on change store events to the registered views
   */
  onStoreChange() {
    for (let viewID in this.registeredViews) {
      this.registeredViews[viewID]();
    }
  }

  /**
   * Initialize the store with a key-value pair
   *
   * @param {string} key the key name
   * @param {object} value the key value
   */
  initialize(key, value) {
    this.storeData[key] = value;
  }

  /**
   * Set a key in the store to a new value
   *
   * @param {string} key the key name
   * @param {object} value the key value
   * @throws exception if the key does not exist
   */
  set(key, value, squashEvent = false) {
    if (key in this.storeData) {
      this.storeData[key] = value;
      if (!squashEvent) {
        this.changeStore();
      }
    } else {
      throw `Unknown key ${key} in store`;
    }
  }

  /**
   * Retrieve a key in the store
   *
   * @param {string} key the key name
   * @returns {object} the key value
   * @throws exception if the key does not exist
   */
  get(key) {
    if (key in this.storeData) {
      return this.storeData[key];
    } else {
      throw `Unknown key ${key} in store`;
    }
  }

  /**
   * Generate an RFC-4122 Version 4 compliant Unique ID.  We only need
   * pseudo IDs since we are salting with the name of the store.
   *
   * @return {string}
   */
  get uid() {
    let u = '', i = 0;
    while (i++ < 36) {
      let c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
        r = Math.random() * 16 | 0, v = (c === 'x' ? r : ( r & 0x3 | 0x8));
      u += (c === '-' || c === '4') ? c : v.toString(16);
    }
    return u;
  }
}

export default Store;
