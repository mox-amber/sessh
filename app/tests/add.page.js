import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class AddPage {
  constructor() {
    this.pageId = '#addPage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async add(testController, name, age, image) {
    // await this.isDisplayed(testController);
    await testController.typeText('#add-name', name);
    await testController.typeText('#add-age', age);
    await testController.typeText('#add-image', image);
    await testController.click('#add-submit');
  }
}

export const addPage = new AddPage();
