describe('Galleries', () => {
  beforeEach(() => {
    browser.get('/galleries');
  });

  xit('should have a title', () => {  // TODO Find the best way to test a state with resolves
    expect(browser.getTitle()).toBe('Galleries - Portfolio');
  });
});
