describe('App', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should have redirected to `galleries`', function(done) {
    browser.getCurrentUrl().then((currentUrl: string) => {
      expect(currentUrl.endsWith('/galleries')).toBe(true);
      done();
    });
  });

  describe('when navigating to a URL that has no route defined', () => {
    beforeEach(() => {
      browser.get('/no-route-defined-for-this-url');
    });

    it('should redirect to `not-found`', function(done) {
      browser.getCurrentUrl().then((currentUrl: string) => {
        expect(currentUrl.endsWith('/not-found')).toBe(true);
        done();
      });
    });
  });
});
