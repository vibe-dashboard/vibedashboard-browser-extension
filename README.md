# Vibe Dashboard browser extension

This fork adapts the Gitpod/Ona browser extension for **Vibe Dashboard**.

The extension injects an **Open in VD** button into supported GitHub pages and sends the current page URL to your configured Vibe Dashboard server using:

```text
/dashboard?from_gh_url=<encoded current GitHub URL>
```

The server origin is configurable in the extension popup, so each user can point the extension at their own VD deployment.

![Gitpodify](./docs/github-injected.png "Gitpodify")

### Development

Build and load locally:

```
pnpm install
pnpm dev
```

Then load `build/chrome-mv3-dev` as an unpacked extension in Chrome.

To build production bundles:

```
pnpm build --target=chrome-mv3 # or --target=firefox-mv3
pnpm package --target=chrome-mv3 # or --target=firefox-mv3
```

### Testing

Run targeted unit tests:

```bash
node ./node_modules/.pnpm/ts-node@10.9.2_@swc+core@1.3.96_@swc+helpers@0.5.1__@types+node@20.14.5_typescript@5.5.4/node_modules/ts-node/dist/bin-esm.js ./node_modules/.pnpm/mocha@11.1.0/node_modules/mocha/bin/mocha.js src/utils/build-vd-open-url.spec.ts
```
