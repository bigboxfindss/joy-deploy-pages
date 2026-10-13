# Joy Deploy Pages
## GitHub Pages

`.github/workflows/deploy-pages.yml` builds a static SPA (`GITHUB_PAGES=true`, `BASE_PATH=/<repo>/`) with Bun and deploys `dist/client`. In the repo, set **Settings → Pages → Source** to **GitHub Actions**. For a custom domain or `<user>.github.io` repo, set `BASE_PATH` to `/`.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://joy-deploy-pages.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3c52b6be-5a58-472d-8acd-0d7cbec38f71).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
