class LoadingGroup {
  constructor(fetchesInProgress = 0) {
    this.fetchesInProgress = fetchesInProgress;
    this.isLoading = fetchesInProgress === 'first' ? (true) : (fetchesInProgress > 0);
  }

  startFetch() {
    if (this.fetchesInProgress === 'first') {
      return new LoadingGroup(1);
    }
    return new LoadingGroup(this.fetchesInProgress + 1);
  }

  completeFetch() {
    if (this.fetchesInProgress === 0 || this.fetchesInProgress === 'first') {
      throw new Error('Could not complete fetch, none were in progress');
    }
    return new LoadingGroup(this.fetchesInProgress - 1);
  }
}

export default LoadingGroup;
