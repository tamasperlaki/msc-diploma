import { browser, by, element } from 'protractor';

export class MscDiplomaPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('#title')).getText();
  }
}
