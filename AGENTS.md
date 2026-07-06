# Repository Instructions

This is a Hugo static site for Dave's CV, profile, bookshelf, and leadership blog.

## Blog Image Generation

When generating or refreshing blog images, follow these rules unless the user explicitly overrides them.

- Save final blog images in `static/images/blog/`.
- Reference blog images from post front matter by filename only, for example `image: "my-post-image.png"`.
- Use PNG for generated blog covers.
- Match the existing cover dimensions: `1672x941`.
- Match the visual language already used by the blog: clean modern editorial illustration, geometric/isometric objects, soft shadows, subtle paper grain, crisp shapes, and conceptual engineering/leadership metaphors.
- Match the site CSS palette rather than inventing a new colour scheme:
  - background/off-white: `#f7fbfd`
  - deep teal/text: `#0e4749`
  - panel white: `#ffffff`
  - orange/header accent: `#f85e00`
  - muted teal: `#49686a`
  - line/soft blue: `#c1dff0`
  - sky blue: `#88ccf1`
  - gold: `#edd9a3`
- Keep the palette balanced; avoid making an image dominated by a single hue family.
- Blog images must never contain English words, readable labels, numbers, UI copy, logos, watermarks, or pseudo-text. Use abstract lines, checkmarks, icons, paths, cards, documents, and diagrammatic marks instead.
- For AI-related images, depict AI as a wireframe cube suspended inside a glowing transparent case. Use connected dots/edges inside the cube, and keep it abstract rather than humanoid or robotic.
- Include a potted plant somewhere in the composition. It can be a small background object, but it should be visible enough to read as part of the house style.
- Avoid robots, humanoid AI mascots, dark sci-fi styling, dystopian imagery, photorealism, and cluttered screenshots.

Suggested base prompt:

```text
Create a 16:9 blog cover image at 1672x941 for a leadership/engineering blog. Use a clean modern digital editorial illustration style with geometric/isometric objects, soft shadows, subtle paper grain, crisp shapes, and conceptual engineering metaphors. Match the site palette: #f7fbfd, #0e4749, #ffffff, #f85e00, #49686a, #c1dff0, #88ccf1, and #edd9a3. Do not include any English words, readable labels, numbers, UI copy, logos, watermarks, or pseudo-text.

For any AI subject, represent AI as a wireframe cube suspended inside a glowing transparent case, with connected dots and edges inside the cube. Include a visible potted plant somewhere in the composition. Avoid robots, humanoid AI mascots, dark sci-fi styling, dystopian imagery, photorealism, and cluttered screenshots.
```
