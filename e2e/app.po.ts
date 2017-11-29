import { browser, by, element } from 'protractor';

export class MscDiplomaPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('#title')).getText();
  }

  getSigninButton() {
    return element(by.css('button#signIn'));
  }

  getTwitchUsernameInput() {
    return element(by.css('input[name=username]'));
  }

  getTwitchPasswordInput() {
    return element(by.css('input[name=password]'));
  }

  getTwitchLoginButton() {
    return element(by.cssContainingText('button[type=submit]', 'Log In'));
  }

  getTwitchAuthorizeButton() {
    return element(by.cssContainingText('button[type=submit]', 'Authorize'));
  }
}
