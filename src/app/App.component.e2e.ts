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
});
