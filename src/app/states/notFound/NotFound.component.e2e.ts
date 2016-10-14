describe('NotFound', () => {
  beforeEach(() => {
    browser.get('/not-found');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toBe('Not Found - Portfolio');
  });
});
