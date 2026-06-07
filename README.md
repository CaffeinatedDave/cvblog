# CV / Blog Site

This is a small Hugo static site for a CV, profile, and blog. It is designed so normal updates are Markdown-only.

## Edit The Site

- Homepage and CV: edit `content/_index.md`
- Blog posts: add Markdown files to `content/blog/`
- Bookshelf entries: add Markdown files to `content/bookshelf/`
- Site name, email, links: edit `hugo.toml`

Blog posts are sorted by date automatically. Newer posts appear first and get URLs from their title/date.

## Add A Blog Post

Run:

```sh
hugo new blog/my-new-post.md
```

Then edit the title, date, summary, image filename, and body. Blog images live in `static/images/blog/`, and posts should reference only the filename, for example `image: "my-post-image.png"`.

Example front matter:

```yaml
---
title: "What I Learned Moving Into Platform Engineering"
date: 2026-06-03
summary: "A short reflection on the shift from delivery to platform work."
draft: false
---
```


## Add A Book

Run:

```sh
hugo new bookshelf/book-name.md
```

Then edit the title, author, cover image, description, and takeaway. Books are ordered using the `weight` field.

Place real cover images in `static/images/books/` and reference them like:

```yaml
cover: "/images/books/book-name.jpg"
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
