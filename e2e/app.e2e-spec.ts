import { Ng2LinaPage } from './app.po';

describe('ng2-lina App', function() {
  let page: Ng2LinaPage;

  beforeEach(() => {
    page = new Ng2LinaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
