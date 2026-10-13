# Bradley Chan · Code Minion

Static demo index for a conversation with [Kami](https://www.kamiapp.com/). Plain HTML, CSS, and a small script that renders cards from [`demos.json`](demos.json). No framework and no build step in the browser.

Expected site: <https://kit-chan-ops.github.io/effective-system/>

## Add a demo

Edit the `demos` array in `demos.json`. Each entry:

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Card heading |
| `description` | yes | One line |
| `status` | yes | `Live` or `In build` |
| `url` | no | `https` link. Omit it when there is no public URL |
| `note` | no | Short label, such as `Kami demo` |

Push to `main`. The Pages workflow validates the file, then publishes.

## Preview locally

`demos.json` is loaded with `fetch`, so open the page over HTTP rather than as a file.

```bash
python3 -m http.server 8080
```

Then visit <http://127.0.0.1:8080/>.

## Deploy

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) deploys with `actions/deploy-pages` on every push to `main`, and when the workflow is run by hand from the Actions tab. It publishes `index.html`, `styles.css`, `main.js`, `demos.json`, and `favicon.svg`.

## Manual step still required

GitHub Pages is not turned on for this repository yet. Someone with admin access needs to set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

After that, push to `main` again or re-run **Deploy static content to Pages**. The site is then served at <https://kit-chan-ops.github.io/effective-system/>.

## License

[Apache-2.0](LICENSE)
