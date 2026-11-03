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
  * Role: `Full Stack Developer`
  * Company: `EY GDS`
  * Location: `Kerala, India`
  * GitHub: `https://github.com/Vishnu1562`
  * LinkedIn: `https://www.linkedin.com/in/vishnu-v-40a0/`
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
  1. Name "Vishnu V", headline "Full Stack Developer", and "EY GDS" badge are clearly visible.
  2. Status indicator ("Available for new opportunities") is displayed.
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

### HF-004: Featured Projects Exploration
* **Preconditions**: User is in the `#projects` section.
* **Actions**:
  1. Inspect project cards: `StudentAdminPortal.API`, `Flutter World Time App`, `NestJS Enterprise API`.
  2. Click GitHub repository link on a project card.
* **Expected Results**:
  1. Cards render title, description, technology badges, and external links.
  2. Links open the respective GitHub repository in a new tab (`target="_blank"` with `rel="noopener noreferrer"`).
* **Final State**: Correct project repository opens in external tab.

### HF-005: Resume Download / View
* **Preconditions**: User clicks "Download Resume" in header or hero section.
* **Actions**:
  1. Click "Download Resume" button.
* **Expected Results**:
  1. Triggers download of the placeholder resume asset (`vishnu-v-resume.pdf` / markdown summary) or displays a modal confirming placeholder status.
* **Final State**: File download initiates without error.

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
