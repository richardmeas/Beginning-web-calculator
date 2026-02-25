# Web Calculator

A simple, modern web calculator UI built with plain HTML, CSS, and JavaScript. It supports mouse and keyboard input and is ready to be hosted on GitHub Pages.

## Features

- Basic operations: addition, subtraction, multiplication, division
- Percent, sign toggle (±), clear (AC)
- Keyboard support: number keys, `+ - * /`, `%`, `Enter`, `=`, `Backspace`, `Escape`
- Responsive, modern UI that works well on desktop and mobile

## Running locally

You can open the calculator directly in your browser:

1. Download or clone this folder.
2. Double-click `index.html` to open it in your browser.

Or, if you prefer a local server (recommended for some browsers):

```bash
cd "Web Calculator"
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

There are two common ways to use this on GitHub Pages.

### Option 1: As your main GitHub Pages site

1. Create a new GitHub repository, e.g. `username.github.io`.
2. Copy the contents of this `Web Calculator` folder into the root of that repo:
   - `index.html`
   - `style.css`
   - `script.js`
3. Commit and push to the `main` (or `master`) branch.
4. In GitHub, go to **Settings → Pages**.
5. Under **Build and deployment**, set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`), folder `/ (root)`
6. Save. After a minute or two, your site will be live at:
   - `https://username.github.io`

### Option 2: As a project page under an existing profile

1. Create a new repository, e.g. `web-calculator`.
2. Put these files in the root of that repo:
   - `index.html`
   - `style.css`
   - `script.js`
3. Commit and push.
4. In GitHub, go to **Settings → Pages**.
5. Under **Build and deployment**, set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`), folder `/ (root)`
6. Save. After a short delay, your calculator will be live at:
   - `https://username.github.io/web-calculator/`

You can rename the repository if you want a different URL path.

## Customizing

- To change the title or subtitle, edit `index.html` in the header section.
- To tweak colors or spacing, edit CSS variables at the top of `style.css`.
- To adjust calculator behavior (additional operations, memory, etc.), edit `script.js`.

Once you’re done customizing, just commit and push again and GitHub Pages will serve the updated version.
