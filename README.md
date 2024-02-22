# Auto login voor UU

A browser extension that automatically logs you in on all UU sites that use your Solis-ID

Built versions for Chrome and Firefox can be found under the release section.

# Usage

You will have to use Google Authenticator as your Two-factor authentication provider.

### Setting up 2fa

When adding 2fa to you Solis-ID choose 'Google Authenticator'.
You can then get the secret from the QR code, using for example https://webqr.com/.
After you got the secret you can use the QR code to add the 2fa code to Google Authenticator.

# Installation

## Pre-built versions:

### Chrome

- Download the Chrome version from the Releases section and unzip it.
- Enable developer mode in on the Chrome extensions page ([chrome://extensions/](chrome://extensions/)).
- Choose "Load unpacked" and select the "chrome-mv3-prod" folder in `./build`.

### Firefox

- Download the Firefox version from the Releases section and unzip it.
- Go to the Firefox add-on page ([about:addons](about:addons)).
- Click on the cog icon and select 'Install add-on from file'
- Select the downloaded file.

## Building from source:

**Prerequisites:**

- Node.js and npm installed

### Chrome

```
npm install
```

```
npm run build
```

Follow the pre-built Chrome installation instructions above to add the built extension to the browser.

### Firefox

Unfortunately, self-built Firefox extensions are not permanent unless signed by Mozilla. Download the signed version from the Releases section if you want the extension to be stay permanently.

```
npm install
```

```
npm run build -- --target=firefox-mv2
```

- Go to the Firefox add-on page ([about:addons](about:addons)).
- Click the gear icon and select "Debug add-on".
- Click "Load temporary add-on" and select the built extension from the `./build` folder. **Note:** This adds the extension temporarily. It will disappear after you restart Firefox.
