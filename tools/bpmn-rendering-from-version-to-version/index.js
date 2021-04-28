
const fse = require('fs-extra');
const outputDirectory = 'build/screenshots';

//console.info('Building bpmn-visualization html documentation');

// clean existing screenshots
fse.removeSync(outputDirectory);
fse.ensureDirSync(outputDirectory);


// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign

// Notice a proper package name in require
const {chromium} = require('playwright-chromium');

// TODO for each version, access the page, wait for load, do a screenshot, save it as a file

(async () => {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  // if we want to set the viewport dimensions
  // could be interesting to avoid blank around the diagram and avoid cropping during post-processing
  // browser.newContext({
  // viewport: {
  //       width: 800,
  //       height: 600,
  //     },
  // });
  // browserContext.newPage()
  // await browserContext.close();
  // or await page.setViewportSize({ width: 1600, height: 1200 });

  // TODO to be retrieved by checking the resources directory
  const versions = [
    '0.1.0', '0.1.1', '0.1.2', '0.1.3', '0.1.4', '0.1.5', '0.1.6', '0.1.7',
    '0.2.0', '0.3.0', '0.5.0',  '0.6.0', '0.7.0', '0.10.0',];
  let counter = 0;
  for (let version of versions) {
    counter++;

    // TODO choose the miwg-test-suite file to load by passing a query parameter
    await page.goto(`http://localhost:8002/tools/version-comparator/resources/${version}/index.html`);
    // TODO check that the title matches the version?
    const title = await page.title();
    console.info('page title', title);

    // TODO wait for generated element instead of waiting for 1 second (risk of flaky generation, see https://playwright.dev/docs/api/class-page#pagewaitfortimeouttimeout)
    // we do this in tests (for specific elements, this require data attribute that are not available in all versions or the attribute name changes from version to version
    // we could at least check mxgraph initialization (svg node in the bpmn-container, but it may not have the same id in all pages)
    // or check the existence of bpmn svg nodes (probably the easiest way as they will be present for all versions)
    console.info('Waiting for diagram rendering...');
    await page.waitForTimeout(1000);
    console.info('Wait done');

    const countValue = String(counter).padStart(2, '0')
    await page.screenshot({ path: `${outputDirectory}/B.2.0-${countValue}-${version}.png` });
  }

  // TODO properly exit the script
  await browser.close();
  process.exit(0);
})();

// https://playwright.dev/docs/screenshots
