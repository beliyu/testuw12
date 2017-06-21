import { Test12Page } from './app.po';

describe('test12 App', () => {
  let page: Test12Page;

  beforeEach(() => {
    page = new Test12Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
