describe('Gallery', () => {
  beforeEach(() => {
    browser.get('/galleries/1');
  });

  xit('should have a title', () => {  // TODO Find the best way to test a state with resolves
    expect(browser.getTitle()).toBe('Gallery - Portfolio');
  });
});
