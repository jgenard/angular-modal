import { AngularModalPage } from './app.po';

describe('angular-modal App', () => {
  let page: AngularModalPage;

  beforeEach(() => {
    page = new AngularModalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
