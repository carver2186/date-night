# Atlanta Date Night — iPhone Setup Guide

## Step 1: Host the App on GitHub Pages

GitHub Pages is free and works perfectly for this static app.

1. **Create a GitHub account** at github.com if you don't have one.

2. **Create a new repository:**
   - Click the **+** icon → *New repository*
   - Name it something like `date-night` or `atlanta-date-night`
   - Set it to **Public** (required for free GitHub Pages)
   - Click *Create repository*

3. **Upload your files:**
   - Click *uploading an existing file* on the new repo page
   - Drag and drop the entire `DateNight` folder contents:
     - `Atlanta_Date_Night.html`
     - `gift-ideas.html`
     - `manifest.json`
     - `sw.js`
     - `icons/` folder (with both PNG files)
   - Scroll down, click **Commit changes**

4. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages** (left sidebar)
   - Under *Source*, select **Deploy from a branch**
   - Choose branch: `main`, folder: `/ (root)`
   - Click **Save**
   - Wait ~60 seconds, then your URL appears at the top — something like:
     `https://yourusername.github.io/date-night/Atlanta_Date_Night.html`

---

## Step 2: Add to iPhone Home Screen

> **Important:** You must use **Safari** — Chrome and other browsers on iOS cannot install PWAs.

1. Open Safari on your iPhone.
2. Navigate to your GitHub Pages URL (e.g. `https://yourusername.github.io/date-night/Atlanta_Date_Night.html`).
3. Wait for the page to fully load.
4. Tap the **Share** button (the box with an arrow pointing up) at the bottom of Safari.
5. Scroll down in the share sheet and tap **"Add to Home Screen"**.
6. Edit the name if desired (it defaults to "Date Night").
7. Tap **Add** in the top-right corner.

The app icon will appear on your home screen. Tap it to open the app in full-screen mode (no Safari browser chrome).

---

## Step 3: What Works Offline vs. What Needs Internet

### Works Offline ✅
These are cached by the service worker on first load:
- The full app shell (both HTML pages load instantly)
- All tab content, links, and layout
- Gift Ideas page with all 42 gift entries
- The curated Claude prompts (copy & paste functionality)
- Weekly calendar strip (uses device date — no network needed)

### Requires Internet 🌐
- **All external links** — clicking any venue, event site, or shop link opens a real website
- **Live Search / Ask Claude buttons** — these open claude.ai, which requires internet
- **"Open in Claude.ai →"** button in the Live Search tab
- **Facebook, Eventbrite, Google Events** links throughout the app
- Any images or resources from CDNs (Tailwind CSS in gift-ideas, React CDN)

### A Note on CDN Resources
The gift-ideas app loads React and Tailwind from CDN links. These are **not** cached by the service worker (by design — caching third-party CDNs can cause version conflicts). The gift-ideas page requires internet to fully render on first load, but once React loads, filtering and favorites work without further network requests.

---

## Tips

- **Bookmark the URL first** in Safari before adding to home screen, so you can easily return to it.
- **Update the app:** If you make changes and re-upload to GitHub, open the app in Safari and hard-refresh (pull down to refresh) to pick up the new service worker cache.
- **Share with your partner:** Send them the GitHub Pages URL — they can add it to their home screen too.
