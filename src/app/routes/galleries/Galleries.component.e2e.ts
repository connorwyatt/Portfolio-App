describe('Galleries', () => {
  beforeEach(() => {
    browser.get('/galleries');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toBe('Galleries - Portfolio');
  });
});
