# About

Exercises for training and testing UI and API.

All exercises have detailed descriptions available after signing up here:
https://jaktestowac.pl/gui-api-playwright/
You will receive a link to a recording of the webinar, a presentation, and tips (in Polish).

## Tested App

Information on how to access the tested app is available on the page after registering here: https://jaktestowac.pl/gui-api-playwright/

⚠️ Note: The free Glitch account is limited to 4,000 requests per hour. The app is deleted after 5 days without account activity.

## Required Software

- `Node.js`
- `Visual Studio Code`
- Extensions for VSC (these should be suggested for installation after setting up the project):
  - `Prettier - Code formatter` - for code formatting
  - `Playwright Test for VSCode` - for easy Playwright test running
  - `GitLens` - for commit handling
  - `Code Spell Checker` - for highlighting spelling mistakes

## How to Install the Project

Download this repository and open its main folder, then:

1. Install packages:

   ```sh
   npm i
   ```

2. Install Playwright browsers:

   ```sh
   npx playwright install
   ```

3. Configure `playwright.config.json`
   - Set `baseURL` to your app's main URL.
   - Set `timeout` to the desired value (the current one may be too short).

## How to Run Tests

There are a few ways to run tests:

1. Navigate to the folder with the given exercise and simply run the test by pressing the green arrow.
2. Open the `Testing` tab located in the left menu (flask icon), unfold all tests and choose one or as many as you want to run.
   If the test does not appear, refresh the tab or check `playwright.config.ts` to ensure everything is properly set in the `projects` section.
3. Run npm scripts by copying and pasting scripts from the `scripts` section of `package.json`.
4. Use the VSC npm script run section:
   - In the `Explorer` tab menu, check `NPM Scripts`.
   - At the very bottom of the Explorer tab, you will find the `NPM SCRIPTS` section.
   - Choose the script you want to run.

⚠️ Note: Some tests require different playwright configuration. In the test file you will find comment how to use it.

## UI Mode

Just run the script from `package.json`:

```sh
npm run test:ui-mode
```

The recommended option is to run this script in a separate console.

# Tips

- Break a test and try to find the problem in the report.
- Some tests are designed to fail and those tests contain the tag `@fail` in their name.
- If tests fail without a clear reason:
  - Check if the tested app is up and running.
  - Check the timeout in `playwright.config.ts` (on slow machines, it may need to be increased).
