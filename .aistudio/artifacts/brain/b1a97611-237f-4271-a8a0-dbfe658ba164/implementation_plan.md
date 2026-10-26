# The Wealth Code — Minnesota Executive Event Landing Page

An ultra-refined, high-conversion landing page for **The Wealth Code** executive business event taking place in Minnesota on November 21, 2026, hosted by Visionary Leadership Development (`visionaryleadershipdevelopment.com/minnesota-event`). Features award-winning display serif reveal animations, real-time 1,000-seat capacity tracking, zero-shadow minimalist hairline aesthetic, automatic system-preference dark/light mode, instant confirmation email preview, and downloadable attendee tickets.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed during the clarification phase:
> - **Display Typography**: High-contrast luxury editorial serif styling inspired by Avigea/Transcity with choreographed dramatic reveal entrance before form presentation.
> - **Color Mood**: Midnight royal navy (`#0B132B`, `#1C2541`) with luminous platinum silver (`#E0E6ED`, `#C5D3E8`) and subtle icy steel accents, strictly avoiding heavy shadow boxes and using micro-thin tinted hairline strokes.
> - **Theme Mode**: Automatic detection based on the user's phone/system settings (`prefers-color-scheme`) with an interactive toggle for manual override.
> - **Post-Submission Confirmation & Ticket**: Interactive confirmation modal featuring an instant simulated confirmation email dispatch and one-click downloadable VIP pass / digital ticket with QR code and unique reservation ID.

---

### 1. Overview & Core Concept

- **What It Does**: Serves as the premier digital gateway for Minnesota business owners, executives, and wealth builders to secure one of strictly 1,000 available seats for *The Wealth Code* on November 21, 2026.
- **Target Audience**: Minnesota founders, entrepreneurs, investors, and business leaders seeking modern capital strategies, operational leverage, and leadership acceleration.
- **Key Value**: Delivers an effortless reservation experience that builds prestige and urgency through live seat countdowns, breathtaking editorial typography, and immediate tangible confirmation with ticket generation.

---

### 2. User Experience & Visual Design

#### A. Key User Flows
1. **Dramatic Entrance**:
   - The user arrives; the high-contrast display serif text *"The Wealth Code"* reveals through a sleek kinetic opacity and tracking animation.
   - The registration interface and event essentials gently fade into view below the title.
2. **Reservation & Seat Scarcity**:
   - Live seat inventory displays remaining availability out of 1,000 seats with real-time feedback.
   - Clean, focused form captures Full Name, Email, and Phone Number with live inline validation.
3. **Instant Confirmation Pop-up**:
   - Upon submitting, a pop-up modal opens revealing:
     - Reservation confirmation and personalized Welcome Notice.
     - Interactive **"View Confirmation Email"** drawer showcasing the exact email delivered to their inbox.
     - One-click **"Download Ticket"** action generating a clean digital VIP ticket with custom QR code, seat tier, date, and reservation code.
4. **Adaptive System Theme**:
   - Automatically synchronizes with the user's phone or desktop system theme (light/dark) using `window.matchMedia('(prefers-color-scheme: dark)')` with smooth transitions.

#### B. Visual Identity & Atmosphere
- **Aesthetic Direction**: High-end editorial luxury minimalism. Zero drop-shadow cards; instead, structure is formed through generous whitespace and razor-thin tinted hairline strokes (`border border-slate-700/30` in dark mode, `border border-slate-200` in light mode).
- **Color Palette**:
  - *Dark Mode (Midnight Royal Navy)*:
    - Canvas: `#080D1A` to `#0B132B`
    - Structural Surfaces: `#101B33` with `rgba(224, 230, 237, 0.08)` hairline borders
    - Primary Text: Platinum White `#F8FAFC`
    - Accent / Highlight: Luminous Platinum `#C5D3E8` & Subtle Frosted Silver
  - *Light Mode (Crisp Alabaster & Royal Navy)*:
    - Canvas: Crisp Pure Alabaster `#F8FAFC`
    - Structural Surfaces: Pure White `#FFFFFF` with `rgba(15, 23, 42, 0.08)` hairline borders
    - Primary Text: Deep Royal Slate `#0B132B`
    - Accent / Highlight: Deep Midnight Navy `#1E293B`
- **Typography**:
  - *Display Headline*: High-contrast editorial serif (`Playfair Display` / `Bodoni Moda` style) with balanced letter-spacing and refined ligatures.
  - *Body / Form*: Clean, high-legibility geometric sans (`Plus Jakarta Sans`).
  - *Data & Timestamps*: Clean tabular numerals (`tabular-nums font-mono`) for the 1,000-seat capacity and countdown counter.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Persistent Reservation Store vs. Static Form**
  - *Chosen Approach*: Store reservations in `localStorage` with initial seed data, decrementing the 1,000 seat capacity in real-time as users register.
  - *Why*: Allows immediate testing and demonstration in the preview environment without requiring third-party database credentials, while keeping the seat tally reactive and persistent.
- **Decision 2: Instant Email Simulation Modal + Downloadable SVG/Canvas Pass**
  - *Chosen Approach*: Deliver both an interactive inbox-style email viewer modal and an instant high-resolution ticket pass generator (downloadable as an image/receipt).
  - *Why*: Meets the user's exact specification ("Instant Email that confirms their reservation and prompts them to stay tuned" + "download ticket should be on the pop up thank you page") directly in the browser environment.
- **Decision 3: Zero-Box Shadow Discipline**
  - *Chosen Approach*: Strict prohibition of `box-shadow` or `shadow-*` utility classes. Rely on subtle hairline borders and background luminance delta ($\le 8\%$).
  - *Why*: Directly aligns with user requirement ("I dont like shadow box and incase you want to use border stroke keep it very thin and tint").

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root (Theme Provider)                       │
│     - Detects user's phone prefers-color-scheme (dark/light)           │
│     - Manages current reservations list & seats remaining counter      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌───────────────────────────────────┐             ┌──────────────────────┐
│        Top Navigation Bar         │             │  Hero Section        │
│  - Visionary Leadership Mark      │             │  - Bold Serif Reveal │
│  - Event Date & Location Tag      │             │  - Scarcity Ticker   │
│  - Theme Mode Toggle              │             │  - Value Proposition │
└───────────────────────────────────┘             └──────────┬───────────┘
                                                             │
                                                             ▼
                                                  ┌──────────────────────┐
                                                  │  RSVP Capture Form   │
                                                  │  - Full Name         │
                                                  │  - Email Address     │
                                                  │  - Phone Number      │
                                                  │  - Seat Reservation  │
                                                  └──────────┬───────────┘
                                                             │ (Submit)
                                                             ▼
                                                  ┌──────────────────────┐
                                                  │ Post-RSVP Modal      │
                                                  │  - Confirmed Notice  │
                                                  │  - Email Simulator   │
                                                  │  - Download Ticket   │
                                                  └──────────────────────┘
```

#### State & Data Handling:
- `theme`: `'dark' | 'light'` initialized from `window.matchMedia('(prefers-color-scheme: dark)')` with listener for runtime phone setting updates.
- `reservations`: Array of registered attendees stored in browser storage (`name`, `email`, `phone`, `ticketId`, `seatNumber`, `timestamp`).
- `seatsRemaining`: Computed from `1000 - reservations.length` with animated counter.
- `isSubmitted`: Boolean triggering the post-submission confirmation pop-up modal.
- `ticketGenerator`: Canvas/SVG render engine that renders an executive ticket badge with attendee name, custom seat number, QR code placeholder, and date for instant PNG download.
