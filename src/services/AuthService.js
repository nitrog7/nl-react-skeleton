class AuthService {
  getCache() {
    let cache = localStorage.getItem('cache');
    return cache ? JSON.parse(cache) : {};
  }

  getKey() {
    let cache = this.getCache();
    let key = '';

    if(cache.user && cache.user.key) {
      key = cache.user.key.value || '';
    }

    return key;
  }
}

export default new AuthService();
