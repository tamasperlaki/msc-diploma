import { MscDiplomaPage } from './app.po';
import { browser } from 'protractor';

describe('msc-diploma App', () => {
  let page: MscDiplomaPage;

  beforeEach(() => {
    page = new MscDiplomaPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getTitle()).toBe('Welcome to Tankika Bot!');
  });

  it('should login', () => {
    page.navigateTo();
    page.getSigninButton().click();

    browser.waitForAngularEnabled(false);
    page.getTwitchUsernameInput().sendKeys('tankikabottest');
    page.getTwitchPasswordInput().sendKeys('mscdipterv');
    page.getTwitchLoginButton().click();
  });
});
