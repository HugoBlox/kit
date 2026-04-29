---
title: "Create Beautiful Presentations with Markdown"
date: '2017-01-01T00:00:00Z'

event_name: HugoBlox Showcase
event_url: https://hugoblox.com

location: Online & In-Person
address:
  street: 450 Serra Mall
  city: Stanford
  region: CA
  postcode: '94305'
  country: United States

summary: Discover how to create stunning, interactive presentations using simple Markdown — no PowerPoint, Keynote, or vendor lock-in required.
abstract: |
  Join us to explore HugoBlox's revolutionary Markdown-based slide system. Create beautiful presentations with code syntax highlighting, math equations, animations, and dual-column layouts. Edit your slides in any text editor, version control them with Git, and present them anywhere with just a browser. Experience true presentation freedom.

# Talk start and end times.
event_start: '2030-06-01T13:00:00Z'
event_end: '2030-06-01T15:00:00Z'
event_all_day: false

authors:
  - me

tags:
  - Markdown
  - Presentations
  - Open Science
  - Academic

featured: true

image:
  caption: 'Presentation freedom with Markdown'
  focal_point: Right

links:
  - icon: brands/github
    name: Star on GitHub
    url: https://github.com/HugoBlox/kit
  - icon: brands/youtube
    name: Video Tutorial
    url: https://www.youtube.com/
  - icon: book-open
    name: Documentation
    url: https://docs.hugoblox.com/guides/slides/

# Link to your Markdown slides
slides: "example"

projects: []
---

## 🎯 Why Markdown Slides?

> [!SUCCESS] True Presentation Freedom
> Unlike PowerPoint or Keynote, your presentations are **future-proof**, **portable**, and completely **under your control**. No proprietary formats, no vendor lock-in, no subscription fees.

### The Problem with Traditional Slides

**PowerPoint & Keynote:**
- 💸 Expensive licenses or subscriptions
- 🔒 Proprietary file formats (`.pptx`, `.key`)
- 💻 Platform-specific (Windows/Mac only)
- 📦 Large binary files
- 🚫 Difficult to version control
- 😰 Lost formatting when sharing

**Google Slides:**
- ☁️ Requires internet connection
- 🔐 Data stored on Google's servers
- 📱 Limited offline editing
- 🎨 Formatting breaks when exporting
- 🔗 Dependency on Google's platform

### The Hugo Blox Solution

> [!TIP] **Markdown Changes Everything**
> Write your presentations in simple, human-readable Markdown. Edit anywhere, present anywhere, own forever.

---

## ✨ What You Get

### 🎨 Professional Design, Zero Effort

- **15+ Built-in Themes** — Black, white, sky, league, and more
- **Syntax Highlighting** — Beautiful code blocks with 50+ languages
- **Math Support** — LaTeX equations render perfectly: $E = mc^2$
- **Responsive** — Looks great on any screen size

### 📝 Write in Plain Text

````markdown
## My Slide Title

- Point one
- Point two
- Point three

```python
def hello():
    return "World!"
```

---
````

That's it! No complex UI, no formatting headaches.

### 🔄 Edit Anywhere, Anytime

> [!IMPORTANT] **Zero Lock-In**
> Your slides are just Markdown files. Edit them in:
> - **Ownable CMS** — Visual editing with live preview
> - **VS Code** — With Markdown extensions
> - **Obsidian** — Note-taking app that speaks Markdown
> - **Typora** — Minimal distraction writing
> - **Any text editor** — Even Notepad works!

{{< button url="https://docs.hugoblox.com/guides/studio/" text="Try Ownable CMS" icon="paint-brush" style="secondary" size="md" new_tab="true" rounded="lg" />}}

### 🎯 Advanced Features

**Dual Column Layouts:**
```markdown
<div style="display: flex; gap: 2rem;">
  <div style="flex: 1;">Column 1</div>
  <div style="flex: 1;">Column 2</div>
</div>
```

**Fragment Animations:**
```markdown
{{</* fragment */>}}Appear on click!{{</* /fragment */>}}
```

**Speaker Notes:**
```markdown
Note: Your private notes here
(visible in presenter view only)
```

**Vertical Slide Stacks:**
Navigate down for sub-topics!

---

## 🚀 Getting Started is Easy

> [!EXAMPLE] **Create Your First Slide Deck in 3 Steps**

### Step 1: Create Your Slides

Create `content/slides/my-talk/index.md`:

```yaml
---
title: "My Amazing Talk"
type: slides
slides:
  theme: black
---

# My Amazing Talk
### Your Name

---

## Main Points

- Point 1
- Point 2
- Point 3

---

## Thank You!
```

### Step 2: Link to Your Event

In your event page (`content/events/my-event/index.md`):

```yaml
---
title: "My Conference Presentation"
slides: "my-talk"  # References the slides folder name
---
```

### Step 3: Present!

Your slides are automatically:
- ✅ Embedded on the event page
- ✅ Available in fullscreen mode (click {{< icon name="arrows-expand" >}} button)
- ✅ Accessible at a direct URL
- ✅ Keyboard-navigatable (→ ← keys)

{{< button url="https://docs.hugoblox.com/guides/slides/" text="Read Full Documentation" icon="book-open" style="outline" size="md" align="center" />}}

---

## 💎 Why Academics & Researchers Love It

> [!QUOTE]
> "I can finally version control my presentations with Git, collaborate using GitHub, and never worry about formatting breaking again. Game changer for reproducible research!"
> — *Dr. Xin Liu, MIT*

### Perfect for Research

- **Version Control** — Track every change with Git
- **Collaboration** — Use GitHub pull requests for slide reviews
- **Reproducibility** — Slides are plain text, commit them with your code
- **Open Science** — Share presentations on GitHub, no barriers
- **Citations** — Include BibTeX references easily
- **Jupyter Integration** — Embed notebooks and visualizations

### Perfect for Teaching

- **Reusable Content** — Mix and match slides across courses
- **Student Contributions** — Students can submit slide PRs
- **Live Coding** — Syntax highlighting for all languages
- **Interactive Examples** — Embed interactive visualizations
- **Accessible** — Keyboard navigation, screen reader friendly

---

## 🎬 See It In Action

> [!NOTE]
> **Try it now!** The slides embedded above demonstrate all these features:
> - Code highlighting with Python
> - Mathematical equations with LaTeX  
> - Dual column layouts (slides 4-6)
> - Fragment animations
> - Multiple themes
> 
> Click the {{< icon name="arrows-expand" >}} **fullscreen button** (top right) to experience presentation mode!

### Live Features to Try

1. **Navigate**: Use arrow keys (→ ←) or click controls
2. **Fullscreen**: Click the expand button to go fullscreen
3. **Speaker Notes**: Press `S` to open presenter view (try it!)
4. **Overview**: Press `ESC` to see all slides at once
5. **Search**: Press `/` to search slide content
6. **Zoom**: `Alt+Click` to zoom into details

{{< button url="/slides/example/" text="Open Slides in New Tab" icon="external-link" style="ghost" new_tab="true" />}}

---

## 🆚 Comparison

| Feature | PowerPoint | Google Slides | **Hugo Blox** |
|---------|-----------|---------------|---------------|
| **Cost** | $159.99/year | Free* | **Free Forever** |
| **Format** | Binary (`.pptx`) | Proprietary | **Plain Markdown** |
| **Version Control** | ❌ Difficult | ❌ Limited | **✅ Git Native** |
| **Offline Editing** | ✅ Yes | ⚠️ Limited | **✅ Fully Offline** |
| **Platform Lock-in** | ⚠️ Microsoft | ⚠️ Google | **✅ None** |
| **Code Highlighting** | ⚠️ Basic | ⚠️ Limited | **✅ 50+ Languages** |
| **Math Equations** | ⚠️ Clunky | ⚠️ Basic | **✅ Full LaTeX** |
| **Portability** | ❌ Poor | ❌ Requires Google | **✅ Works Anywhere** |
| **Future-Proof** | ❌ Format changes | ⚠️ API changes | **✅ Plain Text Forever** |
| **Open Source** | ❌ No | ❌ No | **✅ Yes** |

> [!SUCCESS]
> **Hugo Blox wins on freedom, portability, and long-term sustainability.**

---

## 🛠️ Advanced Capabilities

### Code Blocks with Syntax Highlighting

```python
import torch
import torch.nn as nn

class Transformer(nn.Module):
    def __init__(self, d_model=512, nhead=8):
        super().__init__()
        self.attention = nn.MultiheadAttention(d_model, nhead)
    
    def forward(self, x):
        return self.attention(x, x, x)[0]
```

### Mathematical Equations

Display equations with LaTeX:

```latex
$$
\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}
$$

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Dual Column Layouts

Perfect for before/after comparisons, code + explanation, or image + text:

```markdown
<div style="display: flex; gap: 2rem;">
  <div style="flex: 1;">Left content</div>
  <div style="flex: 1;">Right content</div>
</div>
```

See slides 4-6 in the embedded presentation above for live examples!

---

## 🎓 For Educators: Teach the Future

> [!TIP] **Empower Your Students**
> Teaching with Hugo Blox means teaching modern, transferable skills:
> - Markdown (used everywhere: GitHub, Notion, Obsidian)
> - Version control (essential for careers)
> - Web technologies (HTML, CSS)
> - Reproducible science practices

### Course Integration

```markdown
courses/
├── ml-101/
│   ├── lecture-1/
│   │   ├── index.md (slides)
│   │   └── notes.md
│   ├── lecture-2/
│   │   └── index.md
│   └── _index.md
```

Each lecture gets its own slide deck, all version controlled, all editable by students as PRs.

---

## 🌍 Join the Community

> [!IMPORTANT] **Built by Academics, for Academics**
> Hugo Blox is used by researchers at:
> - 🎓 Stanford, MIT, Harvard, Oxford, Cambridge
> - 🏢 Google Research, Meta AI, OpenAI
> - 🔬 CERN, NASA, NIH
> - 🌐 Thousands of universities worldwide

{{< button url="https://github.com/HugoBlox/kit" text="Star on GitHub" icon="brands/github" style="primary" size="lg" align="center" rounded="full" />}}

### Get Help & Connect

- 📚 [Documentation](https://docs.hugoblox.com/guides/slides/)
- 💬 [Discord Community](https://discord.gg/z8wNYzb)
- 🐛 [GitHub Issues](https://github.com/HugoBlox/kit/issues)
- 🐦 [Follow @GoOwnable](https://twitter.com/GoOwnable)

---

## 🚀 Ready to Create?

> [!SUCCESS] **Start Building Beautiful Presentations Today**
> No installation required. No account needed. Just Markdown and your creativity.

{{< button url="https://docs.hugoblox.com/start/" text="Get Started Now" icon="rocket-launch" style="primary" size="xl" align="center" rounded="full" />}}

<br>

{{< button url="https://docs.hugoblox.com/guides/studio/" text="Try Ownable CMS" icon="paint-brush" style="secondary" size="lg" align="center" rounded="lg" />}}

---

## 📖 Additional Resources

### Templates & Examples

- [Academic Slides Template](https://github.com/HugoBlox/theme-academic-cv)

<!--
- [Conference Talk Template](https://github.com/HugoBlox/starter-presentation)
- [Course Lecture Template](https://github.com/HugoBlox/starter-course)


### Tutorials

- [Creating Your First Slide Deck](https://docs.hugoblox.com/tutorial/slides/)
- [Advanced Slide Layouts](https://docs.hugoblox.com/reference/slides/)
- [Customizing Themes](https://docs.hugoblox.com/customization/)
- [Using Ownable CMS](https://docs.hugoblox.com/studio/)
-->

### Tips & Tricks

> [!TIP] **Pro Tips for Better Presentations**
> 1. Keep slides simple — one idea per slide
> 2. Use dual columns for comparisons
> 3. Add speaker notes with `Note:` prefix
> 4. Test presenter view before your talk
> 5. Use fragments to control pacing
> 6. Version control your slides with Git
> 7. Share source files for reproducibility

---

**Have questions?** Check out the [FAQ](https://docs.hugoblox.com/guides/slides/) or [ask the community](https://discord.gg/z8wNYzb)!

**Want to contribute?** Hugo Blox is open source! [Contributions welcome](https://github.com/HugoBlox/kit/blob/main/CONTRIBUTING.md).
