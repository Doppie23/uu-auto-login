/**
 * The correct namespace for the current browser.
 *
 * Based on process.env.PLASMO_BROWSER
 */
let browserNamespace = chrome;
if (process.env.PLASMO_BROWSER !== "chrome") {
  // @ts-ignore
  browserNamespace = browser;
}

export { browserNamespace };
