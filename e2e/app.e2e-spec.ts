import { MyDreamAppPage } from './app.po';

describe('my-dream-app App', () => {
  let page: MyDreamAppPage;

  beforeEach(() => {
    page = new MyDreamAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
