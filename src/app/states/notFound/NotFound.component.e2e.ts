describe('NotFound', () => {
  beforeEach(() => {
    browser.get('/not-found');
  });

  xit('should have a title', () => {
    expect(browser.getTitle()).toBe('Not Found - Portfolio');
  });
});
