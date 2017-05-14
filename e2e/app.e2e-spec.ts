import { MscDiplomaPage } from './app.po';

describe('msc-diploma App', () => {
  let page: MscDiplomaPage;

  beforeEach(() => {
    page = new MscDiplomaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
