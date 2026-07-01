# Product Requirement Document (PRD)

## Project Overview

**Objective:**
Build a premium, modern, responsive, secure, and user-friendly frontend for a Health & Safety Consultancy and Academic Writing website. The visual language should feel global and professional — inspired by Apple, Stripe, Linear, Framer, Vercel, and Notion.

**Core business outcomes:**

- Publish free and premium educational content.
- Convert visitors into paying readers and booked consultancy clients.
- Enable seamless premium content purchase and consultancy booking.
- Establish trust through a polished, conversion-focused interface.

**Primary user segments:**

- Visitors seeking consultancy services.
- Students and researchers looking for academic support.
- Professionals needing writing or safety documentation services.
- Premium content buyers.
- Returning registered users and corporate clients.

**Branding and typography:**

- Entire site uses `@public/Rency-Regular.woff2` as the single brand font.
- The tone is minimal, elegant, and authoritative.
- Spacing and typography should follow premium SaaS design patterns.

---

## Sitemap and Page Hierarchy

### Public Pages

1. Home
2. About Us
3. Services
4. Academic Consultancy
5. Professional Writing
6. Health & Safety Consultancy
7. NEBOSH Consultancy
8. Research Services
9. Statistical Analysis
10. Risk Assessment Services
11. Training Services
12. Pricing
13. How It Works
14. Success Stories
15. Case Studies
16. Blog
17. Blog Category
18. Blog Tag
19. Single Blog Post
20. Premium Articles
21. Premium Article Preview
22. FAQ
23. Testimonials
24. Contact
25. Book Consultation
26. Careers
27. Privacy Policy
28. Terms & Conditions
29. Refund Policy
30. Cookies Policy
31. Disclaimer
32. 404 Page
33. Search Results

### Authentication / Conversion Pages

34. Login
35. Register
36. Forgot Password
37. Reset Password
38. Verify Email
39. Email Verification Success
40. Payment Success
41. Payment Failed
42. Premium Access Success

### User Account Pages

43. Dashboard
44. Profile
45. Purchased Articles
46. Payment History
47. Bookings
48. Downloads
49. Notifications
50. Settings
51. Logout

---

## Page Details

### 1. Home

**Why:** The primary landing page, first impression, conversion hub.
**Business problem solved:** Converts cold traffic into leads and premium buyers.
**User goal:** Learn quickly, trust the brand, engage with services and content.
**Access:** Public.
**SEO importance:** Very high.
**Conversion goal:** Subscribe, book consultation, view premium articles, read blog.

**Required sections:**

- Navigation Bar
- Hero section
- Trust badges / client logos
- Statistics / proof points
- Services overview
- Academic Consultancy highlight
- Health & Safety highlight
- Professional Writing highlight
- Featured Articles
- Premium Articles introduction
- Why Choose Us
- How It Works
- Testimonials
- Pricing overview
- Latest Blog Posts
- FAQ preview
- Newsletter signup
- Contact preview
- Footer

**Components used:**

- Header/Navbar
- Hero Banner
- Feature Card
- Stats Cards
- Service Cards
- Article Cards
- Premium Card
- Testimonial Slider
- FAQ Accordion
- Newsletter Form
- CTA Banner
- Footer

**CTAs:**

- Book Consultation
- View Services
- Unlock Premium Article
- Read Blog
- Subscribe
- Contact Us

**Internal links:**

- /about, /services, /blog, /premium, /pricing, /book, /contact

**Mobile behavior:**

- Stacked vertical sections.
- Compact hero with primary CTA and secondary action.
- Card grids collapse into one-column lists.
- Sticky bottom CTA bar if appropriate.

**Desktop behavior:**

- Wide hero with split layout and visual emphasis.
- Two-column service and article sections.
- Soft vertical rhythm and generous whitespace.
- Subtle motion on cards and section transitions.

---

### 2. About Us

**Why:** Builds trust, credibility, and brand narrative.
**Business problem solved:** Reduces hesitation by explaining purpose, values, and expertise.
**User goal:** Understand company origin, values, and team credibility.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Direct users to services, contact, or consultation booking.

**Sections:**

- Hero banner
- Company story
- Mission
- Vision
- Core values
- Meet the consultant / team
- Certifications and awards
- Work process
- CTA to book or contact

**Components:**

- SectionHeading
- Info Panels
- Timeline / process steps
- Team card
- Certification badges
- Quotes
- CTA Banner

**CTAs:**

- Book consultation
- Contact us
- Explore services

**Mobile:** linear storytelling with expandable content.
**Desktop:** split narrative with side panels, alternating text and visuals.

---

### 3. Services

**Why:** Central page for all service offerings.
**Business problem solved:** Organizes complex service portfolio into a clear hierarchy.
**User goal:** Find the right consulting service quickly.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Guide users to specific service pages or booking.

**Sections:**

- Hero overview
- Service categories grid
- Key benefits
- How it works
- Featured case studies
- CTA to book / contact

**Components:**

- Category cards
- Service cards
- Icon list
- CTA buttons
- Internal navigation menu

**CTAs:**

- Explore Academic Consultancy
- Explore Health & Safety Consultancy
- Book consultation

**Internal links:**

- /services/academic, /services/professional-writing, /services/health-safety, /services/research, /services/statistical-analysis, /services/risk-assessment, /services/training

**Mobile:** single-column card stack with prominent service links.
**Desktop:** 3-4 column grid with hover interactions.

---

### 4. Academic Consultancy

**Why:** Dedicated page for academic support offerings.
**Business problem solved:** Converts student and researcher traffic with focused service details.
**User goal:** Discover all academic consultancy services and take action.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Book academic consultancy or capture contact.

**Sections:**

- Hero section
- Introduction and value proposition
- Services grid (projects, thesis, dissertation, methodology, SPSS, STATA, Excel, questionnaire design, editing, referencing, Turnitin reduction)
- Process overview
- Packages / pricing summary
- FAQs
- Testimonials
- CTA to book

**Components:**

- Hero Banner
- Service Grid
- Process Steps
- Pricing Cards
- FAQ Accordion
- Testimonial Card
- CTA Banner

**CTAs:**

- Book Academic Consulting
- Request quote
- Download service guide

**Mobile:** service list with collapsible details.
**Desktop:** 2-column layout and grid-based service features.

---

### 5. Professional Writing

**Why:** Captures users needing CVs, SOPs, proposals, and technical documents.
**Business problem solved:** Clarifies scope of writing services and reduces friction.
**User goal:** Select writing service and initiate order.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Book or request consultation.

**Sections:**

- Hero banner
- Writing service overview
- Specialized offerings (CV, SOP, personal statement, business plan, grant proposal, technical report)
- Portfolio samples
- Pricing / packages
- Testimonials
- CTA

**Components:**

- Service cards
- Portfolio slider
- Pricing cards
- Testimonial slider
- CTA Banner

**CTAs:**

- Book writing service
- View portfolio

**Mobile:** streamlined with sample previews in a swipeable format.
**Desktop:** large service cards and side-by-side visuals.

---

### 6. Health & Safety Consultancy

**Why:** Focuses on NEBOSH and workplace safety solutions.
**Business problem solved:** Positions the brand as an expert in HSE compliance.
**User goal:** Assess relevant compliance services and book an expert.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Contact for assessment or booking.

**Sections:**

- Hero banner
- NEBOSH services summary
- Risk assessment packages
- HSE documentation support
- Safety training offerings
- Compliance and audit services
- Consultancy process
- Testimonials
- CTA

**Components:**

- Hero Banner
- Service tiles
- Stats / compliance metrics
- Process flow
- Pricing cards
- CTA

**CTAs:**

- Book HSE consultancy
- Request compliance review

**Mobile:** collapsible service blocks with icon-led highlights.
**Desktop:** rich visual process layout and feature grid.

---

### 7. NEBOSH Consultancy

**Why:** Separate focus page for NEBOSH-specific clients.
**Business problem solved:** Targets students and businesses requiring NEBOSH-aligned documents.
**User goal:** Learn about NEBOSH services and start a booking.
**Access:** Public.
**SEO importance:** Medium to high.
**Conversion goal:** Consultation booking or course inquiry.

**Sections:**

- Hero overview
- NEBOSH service details
- Training and documentation
- Compliance packages
- Process
- Case examples
- CTA

**Components:**

- Feature cards
- Process steps
- CTA Banner

**CTAs:**

- Book NEBOSH support
- Get a quote

**Mobile/desktop:** similar to Health & Safety page with narrower focus.

---

### 8. Research Services

**Why:** Captures advanced research assistance demand.
**Business problem solved:** Helps visitors find support for research design and analysis.
**User goal:** Request research consultation.
**Access:** Public.
**SEO importance:** Medium to high.
**Conversion goal:** Book research support.

**Sections:**

- Hero overview
- Research service list
- Methodology and data analysis support
- Tools and platforms
- Client outcomes
- CTA

**Components:**

- Service cards
- Data visuals
- CTA Banner

**CTAs:**

- Book research service
- Contact research team

---

### 9. Statistical Analysis

**Why:** Positions the company as analytics capable.
**Business problem solved:** Converts users needing SPSS, STATA, Excel analysis support.
**User goal:** Initiate statistical analysis service.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Book service.

**Sections:**

- Hero
- Analytics capabilities
- Tool-specific services
- Example deliverables
- Why work with us
- CTA

**Components:**

- Feature grid
- Example cards
- CTA

**CTAs:**

- Book analysis service
- Request a demo

---

### 10. Risk Assessment Services

**Why:** Targets compliance and safety evaluation projects.
**Business problem solved:** Captures visitors needing risk assessment expertise.
**User goal:** Engage with risk assessment service.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Book evaluation.

**Sections:**

- Hero
- Risk assessment offerings
- Workflow
- Benefits
- Testimonials
- CTA

**Components:**

- Process panels
- Benefit cards
- CTA

**CTAs:**

- Book risk assessment

---

### 11. Training Services

**Why:** Highlights educational and corporate training programs.
**Business problem solved:** Converts organizations seeking training.
**User goal:** Learn about training options and inquire.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Book training.

**Sections:**

- Hero overview
- Training categories
- Delivery formats
- Outcomes
- CTA

**Components:**

- Training cards
- CTA

**CTAs:**

- Enquire about training

---

### 12. Pricing

**Why:** Helps prospects compare and choose offers.
**Business problem solved:** Reduces purchase hesitation by making costs transparent.
**User goal:** Evaluate plans and choose a service level.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Book or contact sales.

**Sections:**

- Pricing hero
- Package comparisons
- Add-ons
- Custom quote
- FAQ
- CTA

**Components:**

- Pricing cards
- Comparison table
- CTA Banner
- FAQ Accordion

**CTAs:**

- Start now
- Request custom quote

---

### 13. How It Works

**Why:** Explains the process to improve trust.
**Business problem solved:** Eliminates uncertainty around delivery and steps.
**User goal:** Understand engagement flow.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Move users toward booking.

**Sections:**

- Hero
- Step-by-step journey
- What to expect
- FAQs
- CTA

**Components:**

- Process timeline
- Info cards
- CTA

**CTAs:**

- Book consultancy

---

### 14. Success Stories

**Why:** Showcases outcomes and success metrics.
**Business problem solved:** Proves credibility with real results.
**User goal:** See evidence of impact.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Book service.

**Sections:**

- Hero
- Success story cards
- Metrics
- Quotes
- CTA

**Components:**

- Case cards
- Stats cards
- CTA

**CTAs:**

- Read case study
- Contact us

---

### 15. Case Studies

**Why:** Deep-dive proof of expertise.
**Business problem solved:** Converts enterprise and higher-value clients.
**User goal:** Examine detailed work examples.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Contact sales.

**Sections:**

- Case study showcase
- Industry filters
- Case details
- Outcomes
- CTA

**Components:**

- Case cards
- Filter tabs
- CTA

**CTAs:**

- Book consultation

---

### 16. Blog

**Why:** Provide content, SEO, and thought leadership.
**Business problem solved:** Increases organic traffic and nurtures leads.
**User goal:** Discover educational articles.
**Access:** Public.
**SEO importance:** Very high.
**Conversion goal:** Read articles, subscribe, and convert to premium.

**Sections:**

- Search bar
- Featured posts
- Categories
- Tags
- Latest posts
- Popular posts
- Premium posts
- Newsletter signup
- Sidebar
- Pagination

**Components:**

- Blog cards
- Search bar
- Tag chips
- Category list
- Featured post hero
- Pagination
- Newsletter form

**CTAs:**

- Read more
- Subscribe
- Unlock premium

**Mobile:** sticky search, single-column list, collapsible filters.
**Desktop:** two-column layout with sticky sidebar and featured panels.

---

### 17. Blog Category

**Why:** Organizes content by topic.
**Business problem solved:** Improves discoverability and SEO relevance.
**User goal:** Browse content by category.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** More engaged reading and newsletter signups.

**Sections:**

- Category hero
- Filtered post list
- Sidebar recommendations
- CTA

**Components:**

- Category header
- Post cards
- Sidebar widgets
- Pagination

**CTAs:**

- Read more

---

### 18. Blog Tag

**Why:** Separates content through tags.
**Business problem solved:** Supports long-tail SEO.
**User goal:** Discover related content.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Increase session depth.

**Sections:**

- Tag hero
- Tagged posts
- Related tags

**Components:**

- Tag chips
- Post cards

**CTAs:**

- Read more

---

### 19. Single Blog Post

**Why:** Primary content consumption page.
**Business problem solved:** Converts readers with depth and trust.
**User goal:** Read an article and engage.
**Access:** Public.
**SEO importance:** Very high.
**Conversion goal:** Signup, premium conversion, or service inquiry.

**Sections:**

- Hero image + metadata
- Title / author / date / read time
- Table of contents
- Article body
- Related posts
- Comments or engagement
- Share buttons
- Newsletter CTA
- Premium lock if required

**Components:**

- Article header
- TOC
- Content blocks
- Share bar
- Related cards
- Comment section
- CTA Banner

**CTAs:**

- Unlock premium content
- Subscribe
- Contact us

**Mobile:** floating table of contents or collapsible content nav.
**Desktop:** sidebar TOC and author panel.

---

### 20. Premium Articles

**Why:** Showcase paid content collection.
**Business problem solved:** Monetizes authority content.
**User goal:** Discover premium articles and purchase.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Unlock premium content.

**Sections:**

- Hero overview
- Premium cards
- Benefits
- Pricing / packages
- FAQ
- CTA

**Components:**

- Premium article cards
- Benefits list
- Pricing cards
- CTA

**CTAs:**

- Unlock now
- Learn more

---

### 21. Premium Article Preview

**Why:** Gives users a teaser of locked content.
**Business problem solved:** Drives conversions on premium content.
**User goal:** Evaluate whether to purchase.
**Access:** Public, with purchase prompt.
**SEO importance:** Medium.
**Conversion goal:** Payment.

**Sections:**

- Preview hero
- Blurred content snippet
- Benefits of purchase
- Payment options
- FAQs

**Components:**

- Locked content block
- Payment CTA
- Unlock modal

**CTAs:**

- Unlock article

---

### 22. FAQ

**Why:** Answer common questions and remove barriers.
**Business problem solved:** Reduces support load and increases confidence.
**User goal:** Get quick answers.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Reduce friction in buying.

**Sections:**

- FAQ hero
- Category accordions
- Contact CTA

**Components:**

- FAQ Accordion
- Search input

**CTAs:**

- Contact support

---

### 23. Testimonials

**Why:** Social proof and credibility.
**Business problem solved:** Improves trust and conversion.
**User goal:** Validate service quality.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Book or buy.

**Sections:**

- Hero
- Video testimonials
- Written reviews
- Ratings
- Case studies
- CTA

**Components:**

- Testimonial slider
- Quote cards
- Video embed
- CTA

**CTAs:**

- Book consultation

---

### 24. Contact

**Why:** Primary communication page.
**Business problem solved:** Provides multiple contact channels.
**User goal:** Reach the company easily.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Contact form submission.

**Sections:**

- Hero contact intro
- Contact cards
- Map embed
- Form
- Office hours
- Social links
- FAQ preview

**Components:**

- Contact cards
- Map component
- Contact form
- CTA

**CTAs:**

- Send message
- Book consultation

---

### 25. Book Consultation

**Why:** Converts visitors into appointments.
**Business problem solved:** Centralizes consultancy booking.
**User goal:** Schedule a service.
**Access:** Public.
**SEO importance:** High.
**Conversion goal:** Booking submission.

**Sections:**

- Hero
- Booking steps
- Booking form
- File upload
- FAQ
- Contact details

**Components:**

- Booking form
- File upload component
- Step indicator
- CTA

**CTAs:**

- Submit booking

---

### 26. Careers

**Why:** Attracts talent and partners.
**Business problem solved:** Supports company growth.
**User goal:** Explore job openings.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Job applications.

**Sections:**

- Hero
- Open roles
- Culture highlights
- Application CTA

**Components:**

- Role cards
- CTA

**CTAs:**

- Apply now

---

### 27. Privacy Policy

**Why:** Compliance and trust.
**Business problem solved:** Legal protection.
**User goal:** Review data handling.
**Access:** Public.
**SEO importance:** Low.
**Conversion goal:** Trust retention.

**Sections:**

- Policy content

**Components:**

- Legal text layout

---

### 28. Terms & Conditions

**Why:** Legal foundation.
**Access:** Public.
**SEO importance:** Low.

### 29. Refund Policy

**Why:** Sets expectations.
**Access:** Public.

### 30. Cookies Policy

**Why:** Compliance.
**Access:** Public.

### 31. Disclaimer

**Why:** Legal clarity.
**Access:** Public.

### 32. 404 Page

**Why:** Keeps visitors engaged after an error.
**Business problem solved:** Reduces bounce from invalid URLs.
**Access:** Public.
**SEO importance:** Low.
**Conversion goal:** Return to home or relevant content.

**Components:**

- Illustration
- Search
- Popular links
- CTA

### 33. Search Results

**Why:** Allows users to find content quickly.
**Business problem solved:** Improves discoverability.
**Access:** Public.
**SEO importance:** Medium.
**Conversion goal:** Engagement.

**Components:**

- Search input
- Result cards
- Filters

---

## Authentication Pages

### Login

**Why:** Authenticate returning users.
**Access:** Public.
**SEO importance:** Low.
**Conversion goal:** Session start.

**Sections:**

- Login form
- Benefits callout
- Links to register and forgot password

**Components:**

- Input fields
- Buttons
- Secondary links

### Register

**Why:** Capture new users.
**Access:** Public.
**Conversion goal:** Sign ups.

**Sections:**

- Registration form
- Guest continuation option
- Benefits list

### Forgot Password

**Why:** Password recovery.
**Access:** Public.
**Conversion goal:** Retention.

### Reset Password

**Why:** Secure password reset.

### Verify Email / Email Verification Success

**Why:** Account verification.

### Payment Success / Failed / Premium Access Success

**Why:** Close the purchase flow and reassure users.

---

## User Account Pages

### Dashboard

**Why:** Home for logged-in users.
**Business problem solved:** Keeps customers engaged and returning.
**User goal:** Access purchases, payments, and bookings.
**Access:** Login required.
**SEO importance:** None.
**Conversion goal:** Repeat usage.

**Sections:**

- Welcome summary
- Quick actions
- Recent purchases
- Booking status
- Notifications

### Profile

**Why:** Manage user details.
**User goal:** Update personal info.

### Purchased Articles

**Why:** Access unlocked content.
**User goal:** Read premium assets.

### Payment History

**Why:** Build trust and transparency.

### Bookings

**Why:** Review consultancy bookings.

### Downloads

**Why:** Centralize downloadable files.

### Notifications

**Why:** Display status updates and confirmations.

### Settings

**Why:** Manage preferences and security.

---

## Home Page Specification

### Hero

- Purpose: Capture attention and explain the value proposition.
- Layout: Full-width split hero with headline, supporting text, CTA buttons, and supporting image or abstract visual.
- Content: Bold headline, subheadline, trust message.
- Animations: Soft fade-in, subtle text reveal.
- Buttons: Primary "Book Consultation", secondary "Explore Services".
- Images: Minimal abstract illustration or professional photography.
- Icons: Small trust icons under headline.
- Spacing: Generous vertical padding.
- Typography: Large, elegant weight for headline.
- Desktop: side-by-side text and visual.
- Tablet: stacked with smaller image.
- Mobile: single column; CTA full width.
- Why exists: Builds trust immediately and directs conversion.
- Expected conversion: click CTA.

### Trust Badges

- Purpose: show credibility.
- Layout: horizontal row of logos or value metrics.
- Content: partner logos, certifications.
- Desktop: inline icons.
- Mobile: horizontal scroll.
- Expected conversion: build trust.

### Statistics

- Purpose: proof of impact.
- Layout: cards with key metrics.
- Content: articles published, satisfied clients, projects completed.
- Desktop: 4 cards row.
- Mobile: stacked.
- Expected conversion: trust.

### Featured Services

- Purpose: expose core offerings.
- Layout: cards with icons.
- Content: Academic, Writing, Safety.
- Desktop: 3 card grid.
- Mobile: swipeable cards.
- Expected conversion: navigate deeper.

### Academic Consultancy / Health & Safety / Professional Writing

- Purpose: highlight key verticals.
- Layout: alternating split sections.
- Content: service benefits and CTA.
- Desktop: alternating text + imagery.
- Mobile: stacked.

### Featured Articles

- Purpose: surface valuable content.
- Layout: wide cards with image preview.
- Content: 2-3 top posts.
- CTA: Read article.

### Premium Articles

- Purpose: promote monetized content.
- Layout: premium cards with price tags.
- CTA: Unlock now.

### Why Choose Us

- Purpose: differentiate from competitors.
- Layout: value propositions in icon cards.
- Content: expertise, security, speed, satisfaction.
- Expected conversion: trust.

### How It Works

- Purpose: simplify the process.
- Layout: 3-4 steps with icons.
- Content: choose service, book, receive support.
- CTA: Book consultation.

### Testimonials

- Purpose: social proof.
- Layout: carousel or cards.
- Content: quotes, names, roles.
- Expected conversion: trust.

### Industries Served / Research Areas

- Purpose: highlight relevance.
- Layout: horizontal tags or cards.
- Expected conversion: credibility.

### Call To Action

- Purpose: primary conversion push.
- Layout: full-width banner.
- Content: compelling offer.
- Buttons: Book consultation.

### FAQ

- Purpose: answer objections.
- Layout: accordion.
- Expected conversion: reduce friction.

### Newsletter

- Purpose: capture leads.
- Layout: simple form.
- Buttons: Subscribe.

### Contact Preview

- Purpose: provide quick access.
- Layout: contact card with CTA.

### Footer

- Purpose: site navigation and trust.
- Layout: multi-column footer.
- Content: links, socials, copyright.

---

## Services Page Specification

**Why this page exists:** It is the central discovery page for all offerings.

**Service categories:**

- Academic Consultancy
- Professional Writing
- Health & Safety Consultancy
- NEBOSH Consultancy
- Research Services
- Statistical Analysis
- Risk Assessment
- Training Services

**Filtering:**

- Category tabs or pills.
- Option to filter by audience: student, professional, corporate.

**Icons:**

- Minimal line icons for each service category.

**Cards:**

- Clean cards with title, summary, and CTA.
- Hover elevation on desktop.

**Buttons:**

- Primary button on each card: Explore service.

**How users navigate to booking:**

- Service pages link to /book or in-page booking CTA.
- Persistent action button in header: Book Now.

**Internal linking:**

- Each card to specific page.
- Sidebar-related articles or case studies.

**SEO:**

- Descriptive headings.
- Category keywords.
- Internal links to service landing pages.

---

## Blog System Specification

**Blog homepage:**

- Search, featured posts, category filters, tags, latest posts, popular posts, premium posts.

**Categories:**

- Clear topical breakdown.
- Cards or pills for navigation.

**Tags:**

- Display as chips under posts and in sidebar.

**Search:**

- Prominent search input.
- Autocomplete and suggestions.

**Featured posts:**

- Top hero section for priority posts.

**Recent posts:**

- Chronological list.

**Popular posts:**

- Sidebar or section for engagement.

**Related articles:**

- Shown on single post pages.

**Author information:**

- Author bio block on single posts.

**Breadcrumb:**

- Breadcrumb trail for blog navigation.

**Table of contents:**

- On single posts for long-form content.

**Reading time:**

- Display near metadata.

**Share buttons:**

- Social share actions at top and bottom.

**Comments:**

- Optional moderation-enabled section.

**Download attachments:**

- PDF or resource links on posts.

**Newsletter:**

- Inline CTA in sidebar and post bottom.

**Sticky sidebar:**

- On desktop, keep filters and CTA visible.

**Recommended articles:**

- Based on categories and tags.

**Pagination:**

- Classic numbered pagination or infinite scroll.

**SEO:**

- Structured headings, metadata, and canonical URLs.

**Schema:**

- Article schema with author, date, image, tags.

---

## Premium Articles Specification

**Locked content:**

- Display preview with blurred or truncated sections.

**Preview:**

- Clear premium badge and teaser.

**Blurred content:**

- Partial article visible to entice purchase.

**Premium badge:**

- Strong visual label.

**Unlock modal:**

- Payment gateway selection.

**Payment flow:**

- Gateway choice, payment details, confirmation.

**Purchase confirmation:**

- Success screen and email receipt.

**Already purchased state:**

- Full access and download link.

**Guest purchase:**

- Option to purchase without account.

**Logged in purchase:**

- Single-click unlock and history save.

**Purchased article experience:**

- Seamless content unlocking and read state.

---

## Payment Flow Specification

**Steps:**

1. User clicks Unlock
2. Payment modal appears
3. Choose gateway
4. Complete payment
5. Verification
6. Success page
7. Email confirmation
8. Article unlocks
9. Payment history updated
10. Dashboard reflects purchase

**Pages involved:**

- Premium article preview
- Payment modal / checkout overlay
- Payment success page
- Payment failed page
- Account purchase history
- Premium access success page

**Gateways:**

- Stripe
- Paystack
- Flutterwave
- PayPal

**Experience:**

- Clear gateway badges.
- Secure trust messaging.
- Progress states.

---

## Booking System Specification

**Booking process:**

- Choose service → fill booking form → upload files → confirm → receive notification.

**Booking page:**

- Hero, form, steps, FAQs.

**Booking confirmation:**

- Confirmation page and email.

**Required fields:**

- Full name
- Email
- Phone number
- WhatsApp
- Country
- Service required
- Project title
- Deadline
- Budget (optional)
- Description
- File upload

**File upload:**

- Word, PDF, Excel, PPT, Image, ZIP.
- Max size 100 MB.

**Calendar:**

- Deadline selector with date picker.

**Budget selector:**

- Optional range or text.

**Progress indicator:**

- Step-by-step booking flow.

**Confirmation email:**

- Automatic with booking details.

**Admin notification:**

- Internal alert for new bookings.

**Booking success page:**

- Summary and next steps.

---

## Contact Page Specification

**Contact cards:**

- Phone, email, WhatsApp, office address.

**Map:**

- Interactive or static map embed.

**Office hours:**

- Display key business hours.

**Contact form:**

- Name, email, subject, message.

**FAQ:**

- Quick support questions.

**Emergency contact:**

- Dedicated urgent support.

---

## About Page Specification

**Sections:**

- Company story
- Mission
- Vision
- Values
- Our process
- Meet the team
- Achievements
- Certifications
- Statistics
- CTA

**Purpose:**

- Reinforce trust and brand narrative.

---

## Pricing Page Specification

**Sections:**

- Pricing hero
- Pricing cards
- Comparison table
- Custom quote
- FAQ
- CTA

**Purpose:**

- Clarify offering tiers and support decision-making.

---

## Testimonials Page Specification

**Sections:**

- Video testimonials
- Written reviews
- Ratings
- Case studies
- Before/after
- CTA

**Purpose:**

- Strengthen trust with social proof.

---

## Dashboard Specification

### Dashboard

- Purpose: central user workspace.
- Sections: summary, quick actions, recent activity.

### Purchased Articles

- Purpose: access paid content.

### Payment History

- Purpose: transparency.

### Bookings

- Purpose: manage consultations.

### Downloads

- Purpose: retrieve purchased files.

### Notifications

- Purpose: update users.

### Settings

- Purpose: manage account preferences.

### Profile

- Purpose: update details.

---

## UI Component Library

### Navigation

- Navbar
- Mega Menu
- Mobile Navigation
- Breadcrumb

### Interaction

- Button
- Dropdown
- Tabs
- Accordion
- Modal
- Drawer
- Pagination
- Search
- Toast

### Content Blocks

- Cards
- Feature Cards
- Blog Cards
- Premium Cards
- Pricing Cards
- Booking Cards
- Stats Cards
- Timeline
- Newsletter Card

### Form Elements

- Inputs
- Textareas
- Select
- Checkbox
- Radio
- File Upload

### Feedback

- Loading skeletons
- Empty states
- Success states
- Error states
- 404 state

### Visual Tokens

- Badges
- Tags
- Avatars
- Icons

---

## Design System Recommendations

**Color palette:**

- Primary: dark charcoal and near-black.
- Accent: deep blue or teal.
- Neutral: soft grey and off-white.
- Support: muted green for success, amber for warning.

**Typography:**

- Single brand font: `Rency Regular`.
- Large expressive headings.
- Balanced body text with open line height.

**Spacing:**

- Generous whitespace.
- 24px+ vertical rhythm.
- Clear separation between sections.

**Border radius:**

- 16px for cards.
- 9999px for pills and buttons.

**Shadows:**

- Soft, layered shadows.
- Minimal depth for premium subtlety.

**Icons:**

- Line-based, refined, consistent.

**Animations:**

- Entrance fades, upward motion.
- Subtle hover transforms.
- Micro interactions on buttons and cards.

**Glassmorphism:**

- Sparingly for hero overlays or modals.

**Gradients:**

- Soft brand gradients for backgrounds and CTA overlays.

**Illustrations / Photography:**

- Use abstract shapes and minimal brand photography.
- Avoid cliché stock photography.

**Dark mode:**

- Optional but recommended for brand polish.

**Accessibility:**

- WCAG AA contrast.
- Keyboard navigation.
- Screen reader-friendly labels.
- Focus outlines.

---

## User Journey Flows

### Visitor reads article → finds premium content → registers → pays → reads article → books consultancy → receives confirmation → returns to dashboard → downloads files

### Guest

- Discover content
- Read free article
- Preview premium content
- Checkout as guest
- Consume unlocked content

### Registered User

- Login / register
- Save purchases
- Access dashboard
- Manage profile

### Returning Customer

- Revisit dashboard
- Review purchase history
- Book additional service

### Premium Customer

- Unlock article
- Access purchased content
- Receive receipt
- Download attachments

### Corporate Client

- Browse case studies
- Contact sales
- Book enterprise service
- Receive tailored proposal

---

## SEO Recommendations

- Unique page titles and meta descriptions for every page.
- Open Graph images and descriptions.
- Structured data for articles, FAQ, breadcrumbs.
- Canonical URLs for paginated content.
- Sitemap.xml and robots.txt.
- Fast performance and Core Web Vitals.
- Clean semantic markup.

---

## Responsive Behaviour

**Desktop:**

- Full-width sections.
- Multi-column layouts.
- Sticky sidebars.
- Hover interactions.

**Laptop:**

- Similar to desktop with slightly compressed spacing.

**Tablet:**

- Two-column to single-column shift.
- Larger tap targets.

**Mobile:**

- Prioritize content hierarchy.
- Collapsible panels.
- Fixed bottom CTA on critical flows.

**Large mobile:**

- Wide cards, accessible touch areas.

**Small mobile:**

- Single column, simplified text.
- Fast load and easy scrolling.

---

## Conversion and UX Recommendations

- Use a minimal, professional visual language.
- Keep messaging concise and benefit-driven.
- Present a clear primary CTA on every page.
- Use trust signals: certifications, testimonials, stats.
- Optimize forms for fast completion.
- Keep purchase and booking flows short.
- Use clear progress indicators.

---

## Accessibility Recommendations

- Always use `Rency Regular` but ensure readable sizes.
- High contrast for text and buttons.
- Responsive focus states.
- Labels for form inputs.
- Accessible alternative text for images.
- Keyboard-friendly navigation.

---

## Deliverables

1. Complete sitemap and page hierarchy.
2. Detailed specification for every page.
3. Purpose and user goal for each page.
4. Required sections and components.
5. UX and navigation flow.
6. Wireframe-level descriptions.
7. SEO and accessibility strategy.
8. Conversion optimization guidance.
9. Mobile-first design recommendations.
10. Animation and visual design guidance.
11. Suggested premium illustrations and imagery.
12. Best practices for a consultancy website.

---

## Notes

- The entire frontend should adopt a premium international consultancy tone.
- The single font asset is `@public/Rency-Regular.woff2` and should be applied globally.
- Every page should feel intentionally crafted with generous spacing, elegant typography, and subtle motion.
- The product is oriented toward both content monetization and service bookings.
- The UX should prioritize trust, clarity, and conversion.
