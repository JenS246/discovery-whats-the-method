# Discovery! What's the Method?

A standalone 15-question review game for introductory civil litigation students. It practices identifying discovery methods and common paralegal tasks. Answers are checked in the browser, with immediate explanations and a final score. No student information is collected or stored.

## Run locally

Open `index.html` in a modern browser. No installation, backend, API key, or build step is needed. The game works from a repository subpath using relative asset links.

## Publish on GitHub Pages

Push the files to the default branch of a public GitHub repository. In repository Settings → Pages, choose **GitHub Actions** as the source. The included Pages workflow deploys on pushes to `main` and can also be run manually. The expected URL is `https://jens246.github.io/discovery-whats-the-method/` if that repository name is used. Update this README with the actual URL once published.

## Files

- `index.html`: page structure
- `style.css`: responsive styling
- `game.js`: question content and game logic
- `.github/workflows/pages.yml`: GitHub Pages deployment
