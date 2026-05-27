# Editable Link Page

This is a standalone personal link page inspired by the structure of `warzy.dog`: a full-screen background, a large identity mark, social icons, contact handles, and a credits panel.

## Edit Your Info

Open `site.config.js` and change:

- `name`, `tagline`, and `logoText`
- `backgroundImage`
- `profileImage`, if you want a centered avatar above the logo
- `socials`
- `contacts`
- `credits`
- `accent`

## Replace The Background

Put your image in `assets/`, then update:

```js
backgroundImage: "assets/your-background.jpg"
```

You can use `.jpg`, `.png`, `.webp`, or `.gif`.

## Add Or Remove Socials

Each social link looks like this:

```js
{
  label: "Instagram",
  icon: "instagram",
  url: "https://instagram.com/yourname"
}
```

Available built-in icons are `instagram`, `x`, `tiktok`, `youtube`, `discord`, `telegram`, and `link`.
