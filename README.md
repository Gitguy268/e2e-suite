<div align="center">

# e2e-suite

Browser smoke tests for 26 web apps, using tester-army/e2e with locators only.

</div>

Each app is served from its existing build, so rebuild an app before trusting a pass. Serve commands live in `apps.ts`, and results land in `.e2e/results.txt`.

<!-- run-steps:start -->
## Run it locally, step by step

1. **Install [Node.js](https://nodejs.org) 22** or newer.

2. **Get the code:**

   ```sh
   git clone https://github.com/Gitguy268/e2e-suite.git
   cd e2e-suite
   ```

3. **Keep the apps next to each other,** with this folder and the apps in the same parent folder as listed in `apps.ts`, and build each app first. Set `E2E_PROJECTS_DIR` if they live somewhere other than your home folder.

4. **Install the dependencies:**

   ```sh
   npm ci
   ```

5. **Run everything, or name apps:**

   ```sh
   ./run-all.sh
   ./run-all.sh qrer spot-light
   ```
<!-- run-steps:end -->

## Licence

See [LICENSE](LICENSE).
