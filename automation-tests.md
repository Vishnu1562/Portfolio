# Behavioral Contract & Test Specification: Vishnu V Personal Portfolio

## Feature / Change
Personal portfolio website for Vishnu V (Full Stack Developer at EY GDS) built with Angular and Tailwind CSS following the "Sleek Enterprise Dark / Linear" design archetype.

## Desired Behavior
A high-performance, responsive single-page portfolio application that showcases Vishnu's enterprise experience at EY GDS, skill proficiencies (Angular, .NET Core, NestJS, Flutter, etc.), key GitHub projects, interactive contact mechanisms, and downloadable resume.

---

## Preconditions
1. Modern web browser with JavaScript enabled.
2. Viewport sizes ranging from mobile (375px) to desktop (1440px+).
3. Application hosted or served locally.

---

## Test Data
* **User Profile**:
  * Name: `Vishnu V`
  * Role: `Consultant 1`
  * Company: `EY GDS`
  * Location: `Kochi, Kerala, India`
  * Phone: `+91 8078854995`
  * Email: `vishnuv2754@gmail.com`
  * GitHub: `https://github.com/Vishnu1562`
  * LinkedIn: `https://www.linkedin.com/in/vishnu-v-40a0/`
  * Honors: `National Sambo Champion (Gold in Combat Sambo, Bronze in Sports Sambo, April 2026), All-India Rank 1 Certified Referee (Grade A, FIAS)`
  * Education: `Bachelor of Technology (B.Tech), Information Technology` at `Government Engineering College, Barton Hill, Thiruvananthapuram` (2019 – 2023)
  * Certifications: `GitHub Copilot` by `Microsoft` (Issued Feb 2026, Expires Feb 2028, ID: `DE17740A659BDD83`)
* **Contact Form Valid Input**:
  * Name: `Jane Doe`
  * Email: `jane.doe@example.com`
  * Subject: `Collaboration Opportunity`
  * Message: `Hi Vishnu, we are looking for an Angular & .NET expert for an enterprise project.`
* **Contact Form Invalid Inputs**:
  * Empty fields
  * Invalid email: `jane.doe@invalid`

---

## Happy Flows

### HF-001: Header Navigation and Smooth Scrolling
* **Preconditions**: User is on the landing page.
* **Actions**:
  1. Click on navigation links: `About`, `Experience`, `Skills`, `Projects`, `Contact`.
* **Expected Results**:
  1. Window smoothly scrolls to the target section with corresponding ID.
  2. Active nav link updates to reflect the in-view section.
* **Final State**: Target section is visible in the viewport.

### HF-002: Hero Section Display and Primary CTAs
* **Preconditions**: Page is loaded at root.
* **Actions**:
  1. View Hero section.
  2. Click "View Projects" CTA.
  3. Click "Contact Me" CTA.
* **Expected Results**:
  1. Name "Vishnu V" and headline "Consultant 1" are prominently displayed in the Hero section without awkward inline employer tags.
  2. Single primary Resume action is maintained in the navigation header, removing duplicate hero resume buttons.
  3. "View Projects" scrolls smoothly to `#projects`.
  4. "Contact Me" scrolls smoothly to `#contact`.
* **Final State**: Target section brought into view.

### HF-003: Skill Matrix Filtering
* **Preconditions**: User is in the `#skills` section.
* **Actions**:
  1. Default tab is "All" (shows all skills: Angular, NgRx, Flutter, ASP.NET Core, NestJS, etc.).
  2. Click "Frontend" filter button.
  3. Click "Backend" filter button.
  4. Click "Mobile" filter button.
  5. Click "Cloud & Tools" filter button.
* **Expected Results**:
  1. Only skills belonging to the selected category are displayed with smooth animation.
  2. Category button shows active visual state.
* **Final State**: Filtered list matches selected tag.

### HF-004: Featured Projects Exploration & Categorization
* **Preconditions**: User is in the `#projects` section.
* **Actions**:
  1. Inspect project cards: Clear division between Enterprise EY GDS work and Personal Projects.
  2. Projects listed:
     - `Saudi Ministry & Government Web Applications` (EY GDS Client Initiative)
     - `Developer Productivity IDE Extensions` (EY GDS Strategic Initiative)
     - `Martial Arts Event Manager Platform` (Personal Project)
     - `Multi-Profile Job Radar Bot` (Personal Project)
     - `AI Resume Tailor — Chrome Extension` (Personal Project)
  3. Click project link on a project card.
* **Expected Results**:
  1. Cards accurately describe real implementations without buzzwords (no microservices, no AST, no test suites claim).
  2. Prioritizes EY GDS enterprise client work above personal projects.
  3. External links open with `target="_blank"` and `rel="noopener noreferrer"`.
* **Final State**: Correct project links and cards verified.

### HF-005: Resume Download / View (Industry ATS Standard)
* **Preconditions**: User clicks "Download Resume" in header or hero section.
* **Actions**:
  1. Click "Download Resume" button.
* **Expected Results**:
  1. Opens the CV modal and triggers download of the industry standard PDF resume (`Vishnu_V_Resume.pdf`).
  2. Resume content follows clean ATS standards with zero decorative emojis (`📍`, `📧`, `🔗`, `💻`, `📌`, `🛠️`, `💼`, `🚀`, `🎓`) and removes generic AI fluff.
  3. Clearly presents verified contact information including phone (`+91 8078854995`), email (`vishnuv2754@gmail.com`), location (`Kochi, Kerala, India`), LinkedIn, and GitHub.
  4. Clearly separates EY GDS Enterprise Experience from Independent/Personal Projects, giving priority to EY GDS.
  5. Omits unverified skills (no microservices, no AST, no testing suites).
* **Final State**: ATS-compliant resume download initiated without error.

### HF-006: Contact Form Successful Submission
* **Preconditions**: User navigates to `#contact` section.
* **Actions**:
  1. Fill in valid Name, valid Email, Subject, and Message.
  2. Click "Send Message".
* **Expected Results**:
  1. Form enters submitting state (button shows loading spinner / disabled).
  2. Success notification is displayed ("Thank you! Your message has been sent successfully.").
  3. Form fields reset to empty.
* **Final State**: Form is cleared, success confirmation visible.

### HF-007: Enterprise Career & IDE Extension Development Details
* **Preconditions**: User navigates to `#experience` section.
* **Actions**: Inspect EY GDS enterprise experience card.
* **Expected Results**:
  1. Displays full-stack enterprise accomplishments at EY GDS across Government/Public Sector (Saudi Ministry, SDAIA, MODON) and Energy & Oil/Gas (Saudi Aramco, leading UAE national energy corporation under NDA).
  2. Specifically highlights in-IDE developer productivity extension development for SDAIA across both IntelliJ IDEA and Visual Studio ecosystems.
  3. Adheres strictly to NDA constraints by anonymizing ADNOC as a leading UAE national energy corporation.
  4. Displays associated technologies: NestJS, ASP.NET Core, IntelliJ Plugin SDK, Visual Studio (VSIX), PostgreSQL, SQL Server, Angular.
* **Final State**: Enterprise experience details verified.

### HF-008: Honors & Athletic Leadership (National Sambo Champion)
* **Preconditions**: User navigates to `#experience` section.
* **Actions**: Inspect Honors & Athletic Leadership card.
* **Expected Results**:
  1. Displays National Sambo Champion (Gold Medal in Combat Sambo, Bronze Medal in Sports Sambo, April 2026).
  2. Displays All-India Rank 1 Certified Referee (Grade A Referee, FIAS affiliated).
* **Final State**: Athletic honors and domain authority verified.

### HF-009: Verified Contact Details & Direct Email Reach-out
* **Preconditions**: User navigates to `#contact` section.
* **Actions**: Inspect contact channels.
* **Expected Results**:
  1. Contact information reflects verified email `vishnuv2754@gmail.com`.
  2. Direct mailto link is active and properly structured.
  3. Professional network links point to `linkedin.com/in/vishnu-v-40a0` and `github.com/Vishnu1562`.
* **Final State**: User contact reach-out channels verified.

### HF-010: Verified Academic Background (Education)
* **Preconditions**: User navigates to `#experience` section or inspects education metadata.
* **Actions**: Inspect Education details on the website and resumes.
* **Expected Results**:
  1. Displays degree: `Bachelor of Technology (B.Tech), Information Technology`.
  2. Displays college: `Government Engineering College, Barton Hill, Thiruvananthapuram` (GEC Barton Hill).
  3. Displays tenure: `2019 – 2023`.
  4. Removes placeholder/generic degree text.
* **Final State**: Verified educational background displayed accurately.

### HF-011: Verified Microsoft Certifications (GitHub Copilot)
* **Preconditions**: User navigates to `#experience` section or inspects certifications metadata.
* **Actions**: Inspect Licenses & Certifications on the website and resumes.
* **Expected Results**:
  1. Displays certification: `GitHub Copilot`.
  2. Displays issuing authority: `Microsoft`.
  3. Displays credential period: `Issued Feb 2026 · Expires Feb 2028`.
  4. Displays credential ID: `DE17740A659BDD83`.
* **Final State**: Official Microsoft certification verified.

### HF-013: AI Resume Tailor Project Showcase
* **Preconditions**: User navigates to `#projects` section or inspects project list.
* **Actions**: Inspect `AI Resume Tailor — Chrome Extension` project card.
* **Expected Results**:
  1. Displays title: `AI Resume Tailor — Chrome Extension`.
  2. Highlights Manifest V3 side panel architecture, multi-LLM cascading (Google Gemini Flash & Groq Llama 3.3 70B), and anti-hallucination grounding.
  3. Lists technologies: TypeScript, Manifest V3, Gemini API, Groq, PDF.js, Vitest.
  4. Links directly to `https://github.com/Vishnu1562/AI_Resume_Tailor`.
* **Final State**: AI Resume Tailor project verified on website and resumes.

### HF-014: Custom Brand Monogram Icon & Favicon
* **Preconditions**: User visits the website in browser.
* **Actions**: Inspect the browser tab icon and the header brand navbar logo.
* **Expected Results**:
  1. Browser tab displays custom Vishnu V monogram icon (`favicon.svg` and `favicon.ico`) instead of the default Angular framework logo.
  2. Header navigation brand contains the matching custom vector monogram icon.
  3. Page title accurately reflects `Vishnu V | Consultant 1 @ EY GDS | Full Stack & Platform Engineer`.
* **Final State**: Custom brand identity established across browser tab and header.

### HF-015: Enterprise Public Sector & Energy Experience in Bio and Experience Summary
* **Preconditions**: User navigates to `#about` and `#experience` sections.
* **Actions**: Inspect Personal Info Bio and EY GDS enterprise experience summary.
* **Expected Results**:
  1. Bio clearly details enterprise platforms across Public Sector (Saudi Ministry, SDAIA, MODON) and Energy & Oil/Gas (Saudi Aramco & UAE Energy Leader).
  2. Bio highlights SDAIA in-IDE developer productivity extensions for IntelliJ IDEA and Visual Studio.
  3. Adheres to NDA by strictly keeping ADNOC anonymized as a leading UAE national energy corporation.
* **Final State**: Enterprise consulting domain breadth visible in primary bio and experience summaries.

### HF-016: Direct Phone Contact Card in Contact Section
* **Preconditions**: User navigates to `#contact` section.
* **Actions**: Inspect contact channels.
* **Expected Results**:
  1. Displays direct phone contact card with verified number `+91 8078854995`.
  2. Includes active `tel:+918078854995` link for one-click calling or reach-out.
* **Final State**: Direct telephone reach-out channel active in Contact section.

---

## Negative Flows

### NF-001: Contact Form Blank Submission
* **Preconditions**: User is at `#contact` section.
* **Actions**:
  1. Leave Name, Email, and Message blank.
  2. Click "Send Message".
* **Expected Results**:
  1. Form submission is prevented.
  2. Validation error messages appear below required fields ("Name is required", "Valid email is required", "Message is required").
  3. No network dispatch or simulated success occurs.
* **Final State**: Fields highlighted with error states.

### NF-002: Contact Form Invalid Email Format
* **Preconditions**: User enters valid Name and Message, but enters invalid email `invalid-email-address`.
* **Actions**:
  1. Click "Send Message".
* **Expected Results**:
  1. Email field displays error: "Please enter a valid email address".
  2. Submission is blocked.
* **Final State**: Form remains in error state.

---

## Edge Cases

### EC-001: Mobile Viewport Navigation
* **Preconditions**: Viewport width <= 768px.
* **Actions**:
  1. Desktop nav menu collapses into a hamburger icon.
  2. Tap hamburger icon.
  3. Tap a navigation link.
* **Expected Results**:
  1. Slide-over / dropdown mobile navigation opens with accessible controls.
  2. Tapping any section link closes the mobile drawer and navigates to the anchor.
* **Final State**: Mobile drawer is closed, viewport scrolled to anchor.

### EC-002: Rapid Filter Switching
* **Preconditions**: User rapidly clicks between "Frontend", "Backend", "Mobile", "All" in the Skills section.
* **Actions**: Rapid consecutive clicks on category tabs.
* **Expected Results**: No UI freeze or broken states; the latest selected category is displayed correctly.

---

## Validation Rules
* **VR-001**: Name field must not be empty or whitespace only (min length 2 characters).
* **VR-002**: Email field must conform to standard email regex `^[^@\s]+@[^@\s]+\.[^@\s]+$`.
* **VR-003**: Message field must have a minimum length of 10 characters.

---

## Loading & State Transitions
* **ST-001**: Contact form submission transitions through `idle` -> `submitting` -> `success` / `error`.
* **ST-002**: Filter transitions update skill cards dynamically.

---

## Recovery / Retry
* User can dismiss or clear success message and submit another message.
* If submission fails, user inputs are retained so the user does not have to retype everything.

---

## Authentication / Authorization
* Public portfolio website — no authentication required.

---

## Regression Requirements
* **RR-001**: All external links (`github.com`, `linkedin.com`) must have `rel="noopener noreferrer"` and `target="_blank"`.
* **RR-002**: Portfolio must maintain WCAG AA contrast standards in dark mode.
* **RR-003**: Keyboard navigation (Tab, Enter) must allow traversing all interactive elements.

---

## Priority
* High (P0): Hero, About, Experience, Skills matrix, Projects showcase, Contact section, Responsive layout.
* Medium (P1): Interactive skill filtering, Contact form validation, Resume download placeholder.
* Polish (P2): Subtle hover animations, glassmorphism visual flair.

---

## Implementation Notes
* Framework: Angular 22 (Standalone components, Signals, Reactive forms, OnPush change detection).
* State Management: `@ngrx/signals` (`signalStore`) managing portfolio data, skill category filtering, and UI modal/navigation state.
* Architecture: Clean Architecture modular structure:
  - `core/models/`: `skill.model.ts`, `project.model.ts`, `experience.model.ts`, `contact.model.ts`
  - `state/`: `portfolio.store.ts` (NgRx SignalStore)
  - `components/`: `header/`, `hero/`, `experience/`, `skills/`, `projects/`, `contact/`, `resume-modal/`, `footer/`
  - `app.ts` / `app.html`: Root composition orchestrator
* Styling: Tailwind CSS configured with custom enterprise dark palette (`slate-950`, `cyan-400`, `indigo-500`, etc.).
* Unit / Integration Tests: Vitest + Angular Testbed covering end-to-end integration across all section components, the NgRx signalStore, and form validation.

---

## Unverified Decisions
* None remaining for initial version (confirmed: Option 1 Sleek Enterprise Dark, Option A Angular + Tailwind CSS, all standard sections, placeholder resume).
