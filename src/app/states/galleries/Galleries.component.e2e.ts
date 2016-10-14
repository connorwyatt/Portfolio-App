describe('Galleries', () => {
  beforeEach(() => {
    browser.get('/galleries');
  });

  xit('should have a title', () => {
    expect(browser.getTitle()).toBe('Galleries - Portfolio');
  });
});
