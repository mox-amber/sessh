import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
// eslint-disable-next-line import/named,no-unused-vars
import { userPage } from './user.page';
// eslint-disable-next-line import/named,no-unused-vars
import { searchPage } from './search.page';
import { addPage } from './add.page';
import { editPage } from './edit.page';
import { messagePage } from './messages.page';
import { sendPage } from './send.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'foo', name: 'John Foo', age: '20', image: 'https://i.pinimg.com/originals/e7/af/9e/e7af9e4eef3c9804d0496082bd7e3313.png', instrument: 'Guitar', genre: 'Pop' };

const dm = { to: 'john@foo.com', from: 'john@foo.com', message: 'test test test' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that user dashboard works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserDashboardPage(testController);
  await userPage.isDisplayed(testController);
});

test('Test that search page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSearchPage(testController);
  await searchPage.isDisplayed(testController);
});

test('Test that add musician page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddPage(testController);
  await addPage.isDisplayed(testController);
  await addPage.add(testController, credentials.name, credentials.age, credentials.image, credentials.instrument, credentials.genre);
});

test('Test that edit page works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoEditPage(testController);
  await editPage.isDisplayed(testController);
  await editPage.edit(testController, credentials.name, credentials.age, credentials.instrument, credentials.genre);
});

test('Test that send messages pages works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoSendMessagesPage(testController);
  await sendPage.isDisplayed(testController);
  await sendPage.send(testController, dm.to, dm.from, dm.message);
  await navBar.gotoMessagesPage(testController);
  await messagePage.isDisplayed(testController);
});
