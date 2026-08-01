# Master Developer Reference & Maintenance Guide
> **Mechatronics & Control Engineering Portfolio Website**  
> *Author / Maintainer:* Andreyas  
> *Data Architecture:* Centralized JavaScript Data Object (`js/portfolioData.js`)

---

## 📘 Overview & Architecture

This website utilizes a **decoupled central data model**. All personal details, engineering projects, work history, skills, certifications, and media links are stored inside a single file:

```text
📁 Project Root
 ├── 📁 js/
 │    ├── 📄 portfolioData.js     <-- 🌟 MAIN DATA CONFIGURATION FILE (Edit this!)
 │    ├── 📄 projects.js          <-- Project rendering engine
 │    ├── 📄 project-detail.js    <-- Individual project details renderer
 │    └── 📄 main.js              <-- Main UI interactions & section injectors
 ├── 📁 assets/                   <-- Local images, logos, PDFs, icons
 ├── 📄 index.html                <-- Primary portfolio single-page application
 └── 📄 project-detail.html       <-- Deep-dive project details viewer
```

> **Pro Tip:** You do **NOT** need to edit HTML or CSS to update your portfolio details! Simply modify `js/portfolioData.js` and save the file. The entire website updates automatically.

---

## 1. Section-by-Section Content Management

All configuration settings sit inside `window.portfolioData` within `js/portfolioData.js`.

### 1.1 Personal Info & Hero Section
To update your name, titles, contact numbers, and social links, locate the `personal` block in `js/portfolioData.js`:

```javascript
personal: {
    fullName: "ANDREYAS",
    brandName: "Andreyas",
    brandSubtext: "MECHATRONICS & TECH VENTURES",
    logoImg: "./assets/tech_logo.jpg",
    profileImg: "./assets/profile.jpeg",
    title: "Final-Year Mechatronics & Control Engineering Student",
    tagline: "Bridging the gap between software intelligence and mechanical reality through innovative robotics and embedded systems.",
    location: "Lahore, Punjab, Pakistan",
    locationShort: "Lahore, Pakistan",
    statusText: "Available for Hire",
    email: "eng.andreyas@gmail.com",
    phone: "+92 326 6876694",
    whatsapp: "https://wa.me/923266876694",
    resumeUrl: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
    socials: {
        github: "https://github.com/andreyas-dev",
        linkedin: "https://www.linkedin.com/in/eng-andreyas/",
        whatsapp: "https://wa.me/923266876694",
        email: "mailto:eng.andreyas@gmail.com",
        locationMap: "https://maps.google.com/?q=Lahore,Punjab,Pakistan"
    }
}
```

> **Note:** Ensure your social profile links begin with `https://` so external redirects function properly.

---

### 1.2 Resume & Public Documents
Your resume and document buttons are driven by the `resumeUrl` field inside `personal`.

#### Google Drive Permission Checklist:
1. Open your document in Google Drive.
2. Click **Share** (top right) $\rightarrow$ Change General Access to **"Anyone with the link"**.
3. Set role to **Viewer**.
4. Copy link structure: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`.
5. Paste this URL directly into `resumeUrl`.

> **Pro Tip:** The built-in `PortfolioMediaHelper` automatically sanitizes Google Drive links and optimizes them for seamless opening across desktop and mobile devices.

---

### 1.3 Projects Section Management

Projects are stored inside `portfolioData.projects` as an array of structured JavaScript objects.

#### Complete Copy-and-Paste Project Template:
```javascript
{
    id: "proj-4",                           // Unique ID (e.g. proj-4)
    visible: true,                          // Set false to temporarily hide from portfolio
    featured: true,                         // Set true to highlight
    title: "Autonomous Swarm Mapping Drone",
    category: "Robotics & Computer Vision",
    shortDescription: "A decentralized quadcopter swarm designed for rapid 3D volumetric mapping.",
    description: "A decentralized quadcopter swarm designed for rapid 3D volumetric mapping in GPS-denied indoor environments.",
    problemStatement: "Traditional single-drone SAR operations suffer from limited flight endurance and single-point-of-failure vulnerabilities.",
    engineeringApproach: "Distributed ROS 2 node architecture with onboard LiDAR SLAM and Ultra-Wideband (UWB) relative localization.",
    mechanicalDesign: "Custom carbon-fiber 250mm frame optimized using SolidWorks FEA structural stress simulation under dynamic flight loads.",
    electronics: "STM32F4 flight controller running FreeRTOS paired with an NVIDIA Jetson Orin Nano for edge vision inference.",
    software: "C++ for realtime ESC control loops; Python (ROS 2 Humble) for decentralized swarm consensus and LiDAR point-cloud fusion.",
    components: ["STM32F4", "NVIDIA Jetson Orin Nano", "RPLiDAR A2M8", "UWB DWM1000", "Carbon Fiber Frame"],
    tools: ["ROS 2", "SolidWorks", "C++", "Python", "Gazebo", "FreeRTOS"],
    challenges: "Suppressing sensor noise during multi-path UWB radio reflection inside enclosed concrete corridors.",
    results: "Reduced volumetric mapping time by 65% compared to single-agent systems across 10 indoor flight trials.",
    media: {
        thumbnail: "./assets/projects/drone_thumb.jpg",
        heroImage: "./assets/projects/drone_hero.jpg",
        videoDemo: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
    },
    links: {
        github: "https://github.com/andreyas-dev/drone-swarm",
        demo: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
        docs: "https://drive.google.com/file/d/YOUR_DOC_FILE_ID/view?usp=sharing"
    }
}
```

#### Image Paths vs. External URLs:
* **Local Images:** Save file into `assets/projects/my-image.jpg` and set path as `./assets/projects/my-image.jpg`.
* **External CDN Images:** Provide full URL, e.g. `https://images.unsplash.com/photo-1518770660439...`.

---

## 2. Advanced Toggles & Controls (Hide / Show)

### 2.1 Project-Level Visibility
To hide a project without deleting its code from your codebase, change `visible: true` to `visible: false`:

```javascript
{
    id: "proj-2",
    visible: false, // <-- This project will immediately be hidden from the website!
    title: "Smart Prosthetic Arm with EMG Control",
    ...
}
```

---

### 2.2 Section-Level Visibility
You can turn off entire sections of your website (e.g. Experience, Research, or Certificates) by adjusting `sectionToggles` in `js/portfolioData.js`:

```javascript
sectionToggles: {
    skills: true,      // Set to false to hide Skills section & nav link
    process: true,     // Set to false to hide Engineering Process
    projects: true,    // Set to false to hide Projects Carousel
    experience: true,  // Set to false to hide Experience section
    education: true,   // Set to false to hide Education section
    credentials: true, // Set to false to hide Certificates & Awards
    research: true     // Set to false to hide Research Interests
}
```

> **Warning:** Hiding a section also automatically hides its corresponding link from the top navigation bar, preserving layout alignment!

---

## 3. Media & Link Handling Best Practices

### 3.1 Google Drive Integration Guide
To embed or link Google Drive assets (PDFs, Videos, Images):

| Asset Type | Google Drive Sharing Link | Built-In Automated Output |
| :--- | :--- | :--- |
| **PDF Document / Report** | `https://drive.google.com/file/d/1A2B3C4D5E/view?usp=sharing` | Sanitized for clean external tab launch |
| **Video Demo Preview** | `https://drive.google.com/file/d/1A2B3C4D5E/view?usp=sharing` | Converted to `.../file/d/1A2B3C4D5E/preview` for iframe player |

---

### 3.2 YouTube Embed Guide
When embedding YouTube videos in your project details:

* **Standard Watch URL:** `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
* **Short URL:** `https://youtu.be/dQw4w9WgXcQ`

> **Note:** `PortfolioMediaHelper.formatYouTubeEmbedUrl()` automatically transforms any standard watch link or short URL into responsive `https://www.youtube.com/embed/VIDEO_ID?rel=0` format. You can paste standard YouTube URLs directly!

---

### 3.3 Image Optimization Standards

| Asset Type | Aspect Ratio | Resolution | Recommended Format | Size Limit |
| :--- | :--- | :--- | :--- | :--- |
| **Project Hero Image** | 16:9 | $1920 \times 1080\text{ px}$ | WebP or JPG | $< 500\text{ KB}$ |
| **Project Thumbnail** | 16:9 | $800 \times 450\text{ px}$ | WebP or JPG | $< 200\text{ KB}$ |
| **Profile Photo** | 1:1 | $800 \times 800\text{ px}$ | JPG or PNG | $< 300\text{ KB}$ |
| **Brand Tech Logo** | 1:1 | $400 \times 400\text{ px}$ | PNG or SVG | $< 100\text{ KB}$ |

---

## 4. Step-by-Step Local Workflow & Deployment

### 4.1 Local Editing Workflow
1. Open the project folder in **VS Code**.
2. Edit `js/portfolioData.js`.
3. Save the file (`Ctrl + S` or `Cmd + S`).
4. Double-click `index.html` or use VS Code **Live Server** extension to preview changes instantly in your browser.

---

### 4.2 Hosting & Deployment Guide

#### Deploying on GitHub Pages:
1. Commit your changes to Git:
   ```bash
   git add .
   git commit -m "Updated portfolio project data"
   git push origin main
   ```
2. Go to your GitHub repository $\rightarrow$ **Settings** $\rightarrow$ **Pages**.
3. Select **Source:** `main` branch $\rightarrow$ `/ (root)`.
4. Click **Save**. Your site will be live at `https://yourusername.github.io/repository-name/`.

#### Deploying on Vercel or Netlify:
1. Connect your GitHub repository to Vercel/Netlify.
2. Framework Preset: **Other / Static HTML**.
3. Build Command: Leave blank (Static site).
4. Output Directory: `./` (Root directory).

---

## 5. Troubleshooting & Error Prevention

### 5.1 Common JavaScript Syntax Errors
Because `portfolioData.js` is a JavaScript file, follow standard JS object formatting:

* ❌ **Missing Comma between items:**
  ```javascript
  // BAD
  title: "My Project"
  description: "Text here"
  
  // GOOD
  title: "My Project",
  description: "Text here",
  ```
* ❌ **Unescaped Quotes inside Strings:**
  ```javascript
  // BAD
  description: "Designed a "smart" gripper."
  
  // GOOD
  description: "Designed a 'smart' gripper."
  ```

---

### 5.2 What to do if Media Fails to Load
1. Check that the file exists in the `assets/` folder.
2. Verify spelling and case sensitivity (`.jpg` vs `.JPG`).
3. If using Google Drive links, double check that permissions are set to **"Anyone with the link"**.

---

### 5.3 Emergency Rollback Procedure
If a editing mistake breaks the screen layout:
1. Undo recent edits in VS Code using `Ctrl + Z` / `Cmd + Z`.
2. Or discard local changes via Git:
   ```bash
   git checkout -- js/portfolioData.js
   ```

---
*End of Master Developer Reference Guide*
