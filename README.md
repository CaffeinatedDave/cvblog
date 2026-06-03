# CV / Blog Site

This is a small Hugo static site for a CV, profile, and blog. It is designed so normal updates are Markdown-only.

## Edit The Site

- Homepage and CV: edit `content/_index.md`
- Blog posts: add Markdown files to `content/blog/`
- Site name, email, links: edit `hugo.toml`

Blog posts are sorted by date automatically. Newer posts appear first and get URLs from their title/date.

## Add A Blog Post

Copy `templates/new-blog-post.md` to `content/blog/my-new-post.md`, then edit the title, date, summary, and body. If Hugo is installed locally, you can also run:

```sh
hugo new blog/my-new-post.md
```

Example front matter:

```yaml
---
title: "What I Learned Moving Into Platform Engineering"
date: 2026-06-03
summary: "A short reflection on the shift from delivery to platform work."
draft: false
---
```

## Preview Locally

Install Hugo Extended, then run:

```sh
hugo server -D
```

Open the local URL Hugo prints.

## Publish

1. Create a GitHub repository.
2. Push this project to GitHub on the `main` branch.
3. In GitHub, go to **Settings > Pages**.
4. Set **Build and deployment > Source** to **GitHub Actions**.
5. Every `git push` to `main` will publish the site.

The publishing workflow sets the live GitHub Pages URL automatically. If you later add a custom domain, update `baseURL` in `hugo.toml` to that domain as well.

## Common Commands

```sh
git add .
git commit -m "Update site"
git push
```
