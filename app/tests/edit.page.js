import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class EditProfilePage {
  constructor() {
    this.pageId = '#editPage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async edit(testController, name, age, instrument, genre) {
    // await this.isDisplayed(testController);
    await testController.click('#name');
    await testController.pressKey('ctrl+a delete');
    await testController.typeText('#name', name);
    await testController.click('#age');
    await testController.pressKey('ctrl+a delete');
    await testController.typeText('#age', age);
    await testController.typeText('#instrument', instrument);
    await testController.typeText('#genre', genre);
    await testController.click('#edit-submit');
  }
}

export const editPage = new EditProfilePage();
