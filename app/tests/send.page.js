import { Selector } from 'testcafe';

class SendPage {
  constructor() {
    this.pageId = '#addPage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async send(testController, to, from, message) {
    // await this.isDisplayed(testController);
    await testController.typeText('#add-to', to);
    await testController.typeText('#add-from', from);
    await testController.typeText('#add-message', message);
  }
}

export const sendPage = new SendPage();
