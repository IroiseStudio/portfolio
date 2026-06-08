# Personal Portfolio

A sleek, modern, dark-mode personal portfolio webpage. It uses a dynamic data-driven architecture, allowing you to manage your profile and all your project data purely through a single JSON configuration file.

## Features
- **Dynamic Data Loading**: All text, links, and images are loaded dynamically from `data/data.json`.
- **Glassmorphism & Neon UI**: Premium dark mode aesthetics with subtle glows and skeleton loading animations.
- **Multiple Layouts**: Support for default two-column project cards and full-width banner cards.
- **Dynamic Image Carousels**: Built-in sliders supporting multiple aspect ratios (landscape, portrait, banner).
- **Store Badges**: Automatic rendering of premium Google Play and iOS App Store badges.
- **Fully Responsive**: Adapts seamlessly to desktop, tablet, and mobile displays.

## Tech Stack & Architecture
This portfolio is built from the ground up to be ultra-fast, lightweight, and incredibly easy to maintain without the overhead of heavy web frameworks:
- **HTML5**: Semantic and accessible document structure.
- **Vanilla CSS3**: Uses modern CSS features including CSS variables for theming, CSS Grid/Flexbox for complex responsive layouts, and native keyframe animations for the shimmering skeleton loading states.
- **Vanilla JavaScript (ES6+)**: Handles the dynamic `fetch` of the JSON data, template string DOM injection, and custom carousel logic completely dependency-free (no React, Vue, or jQuery required).
- **Boxicons**: A lightweight web font icon library used for modern UI accents and the authentic app store badges.
- **JSON Configuration**: Acts as a lightweight, text-based headless CMS. You never need to touch the HTML or JS to update your portfolio content.

## Local Development
To run this project locally, you need a local web server to bypass strict browser security restrictions (CORS) when fetching local JSON files.

You can easily start a server using Python (which is usually pre-installed):
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## Data Configuration (`data.json`)

The entire portfolio is driven by the `data/data.json` file. Below is a complete breakdown of all available configuration options.

### 1. `profile` Object
This configures the header section at the very top of your portfolio.

| Property | Type | Description |
|---|---|---|
| `name` | string | Your name or greeting (e.g., "Hi, I'm Alban."). |
| `bio` | string | Your biography or intro description. |
| `image` | string | Path to your profile picture (e.g., `"images/profile_picture.png"`). |

### 2. `projects` Array
An array of objects representing your portfolio items. Each object can have the following properties:

| Property | Type | Description | Required |
|---|---|---|---|
| `id` | string | Unique identifier for the project (used for internal DOM logic, no spaces). | Yes |
| `title` | string | The display title of the project. | Yes |
| `type` | string | Layout style: `"default"` (two-column) or `"banner"` (wide banner image on top). | Yes |
| `description` | string | Detailed description of the project. Supports paragraph breaks (`\n\n`). | Yes |
| `status` | string | Current state (e.g., `"Completed"`, `"In Progress"`). | Yes |
| `tags` | array | List of general string tags (e.g., `["Mobile", "UI/UX"]`). | Yes |
| `company` | string | Client or company name. | Yes |
| `dateRange` | string | Duration of the project (e.g., `"Jan 2024 - May 2024"`). | Yes |
| `role` | string | Your specific role in the project. | Yes |
| `techStack` | array | List of technologies used (e.g., `["React Native", "TypeScript"]`). | Yes |
| `logo` | string / object| Path to the project's logo, or an advanced configuration object (see below). | Optional |
| `carouselType` | string | Aspect ratio of the image carousel: `"landscape"` (default), `"portrait"`, or `"banner"`. | Optional |
| `carouselImages`| array | Array of image objects to display in the carousel (see below). | Yes |
| `links` | object | Collection of external project links and app store badges (see below). | Yes |

---

### Advanced Objects Breakdown

#### The `logo` Object
Instead of just providing a file path string, you can provide a configuration object to control exactly how the logo is formatted:
```json
"logo": {
  "url": "images/my_logo.png",
  "bgColor": "#ffffff",
  "format": "square"
}
```
- **`url`**: Path to the image.
- **`bgColor`**: Any valid CSS color for the logo's background. Extremely useful if you have a transparent logo that needs a white background.
- **`format`**: Aspect ratio sizing. Options: `"square"`, `"portrait"`, `"landscape"`, `"banner"`.

#### The `carouselImages` Array Items
```json
{
  "url": "images/screenshot1.png",
  "caption": "Home screen showing daily activity."
}
```
- **`url`**: Path to the carousel slide image.
- **`caption`**: A short sentence describing the image shown at the bottom of the slide.

#### The `links` Object
```json
"links": {
  "websites": ["https://example.com"],
  "publications": ["https://example.com/paper.pdf"],
  "googlePlay": "https://play.google.com/...",
  "appStore": "https://apps.apple.com/..."
}
```
- **`websites`**: Array of standard URLs to render as external website links.
- **`publications`**: Array of URLs to render as document/paper links.
- **`googlePlay`**: (Optional) String URL to automatically generate a sleek Google Play Store badge.
- **`appStore`**: (Optional) String URL to automatically generate an authentic iOS App Store badge.
