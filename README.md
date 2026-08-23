# ✨ AuraEvents — Premium Event Management Website

A modern, highly interactive, and fully responsive frontend website designed for a luxury Event Management Company. Built from scratch using semantic **HTML5**, custom styled **CSS3**, and vanilla **JavaScript** to deliver a premium user experience with fluid animations and state-of-the-art aesthetics.

---

## 🚀 Live Demo & Key Features

Here is what makes AuraEvents stand out:

*   ⏳ **2.5-Second Glowing Preloader**: An elegant, neon-glow intro page featuring custom animations to build brand premium feel on first page load.
*   🖱️ **Dynamic Custom Cursor (Lerping)**: A custom double-layered cursor (cyan dot + trailing purple aura) that follows the user's mouse with smooth mathematical lag (lerping) and scales up/highlights on interactive elements.
*   🎨 **Glassmorphism & Rich Styling**: Sleek neon gradients (cyan, purple, and gold) combined with custom backdrop blur filters (`backdrop-filter`) to achieve an ultra-premium layout look.
*   📱 **Fully Responsive Grid Layouts**: Optimised across all viewport resolutions (Desktop, Tablet, Mobile) using fluid CSS Grid and Flexbox structures.
*   🎭 **Scroll Entrance Animations**: Intersection Observer animations that trigger slide-ins and zooms as items come into the viewport.
*   🔍 **Filterable Portfolio Gallery**: Seamless instant sorting by category (Weddings, Corporate, Concerts, Parties) with custom animations.
*   🖼️ **Dynamic Lightbox Modal**: Click on any portfolio image to launch a full-screen gallery viewer featuring next/prev navigation and keyboard bindings (`Esc`, `Left`, `Right`).
*   💬 **Auto-rotating Reviews Slider**: Responsive customer testimonials carousel with manual dots navigation.
*   ✍️ **Interactive Booking Form Validation**: Validates client fields in real-time (detects past dates, enforces guest minimums) and displays a success checkmark toast.

---

## 🛠️ Technology Stack

*   **Structure**: Semantic [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) Markup
*   **Styling**: Vanilla [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (using CSS Variables, custom keyframes, grids, and backdrop filters)
*   **Behavior**: Native [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) (ES6+, DOM Manipulation, lerp animations, and IntersectionObserver)
*   **Typography**: [Google Fonts](https://fonts.google.com/) (Outfit for Headings, Inter for Body text)
*   **Icons**: [Font Awesome v6.4.0](https://fontawesome.com/)

---

## 📂 Project Directory Structure

```text
EVENT-MANAGEMENT-COMPANY/
│
├── index.html       # Main webpage structure (Semantic markup & CDNs)
├── style.css        # Core stylesheet (Design tokens, components, responsive rules)
├── script.js        # Interactivity script (Preloader, Cursor, Lightbox, Form Validator)
└── README.md        # Project documentation (This file)
```

---

## 💻 Local Setup & Installation

To run this project locally, simply clone the repository and open the files in a browser:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/auraevents.git
    cd auraevents
    ```

2.  **Run with local server (Recommended)**:
    Since the website loads external images and font libraries, it is best to serve it through a local server. You can run one of the following commands in the directory:
    
    *   **Using Node.js** (e.g., `http-server`):
        ```bash
        npx http-server ./ -p 8080
        ```
    *   **Using Python**:
        ```bash
        python -m http.server 8080
        ```
    
3.  **Open in Browser**:
    Open your browser and navigate to `http://localhost:8080`.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to adapt and use it for your planning businesses!
