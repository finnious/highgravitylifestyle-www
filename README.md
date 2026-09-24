# highgravitylifestyle-www

Public site for [www.highgravitylifestyle.com](https://www.highgravitylifestyle.com).

Static HTML and CSS on **Cloudflare Pages**. There is no npm build. A push to `main` is the deploy.

## Cloudflare Pages

Connect this repository and use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `/` |
| Custom domain | `www.highgravitylifestyle.com` |

The site root is the repository root. `index.html` and `styles.css` are served as-is. Do not set a build command or a subdirectory output path.

## Editing

Cursor and Grok Bot will iterate on this site through pull requests. Merge to `main` when a change should go live on Pages.
