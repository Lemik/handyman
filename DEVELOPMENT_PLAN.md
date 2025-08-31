
# Development Plan for Handyman Business Jekyll Website

## Project Overview
Create a professional, modern Jekyll-based static website for a handyman business specializing in:
- Roofing
- Gutters (maintenance & cleaning)
- Fences
- Interior repairs

**Service Locations:** Nanaimo, Parksville, and surrounding areas

## Phase 1: Project Setup & Structure (Day 1)

### 1.1 Initialize Jekyll Project
- Create Jekyll project structure with proper directories
- Set up `_config.yml` with site configuration
- Install and configure Bootstrap 5 for styling
- Set up development environment

### 1.2 Create Base Layouts & Includes
- `_layouts/default.html` - Main layout template
- `_includes/` directory with reusable components:
  - `header.html` - Navigation bar
  - `footer.html` - Footer with contact info
  - `hero.html` - Hero section component
  - `service-card.html` - Service card template
  - `testimonial-card.html` - Testimonial template

## Phase 2: Core Pages Development (Days 2-3)

### 2.1 Homepage (`index.html`)
- Hero section with main headline and CTA
- Services grid with 4 service cards
- Service locations section
- Gallery preview section
- Testimonials preview section
- About section summary
- Request estimate form

### 2.2 Individual Service Pages
- `services/roofing.html`
- `services/gutters.html`
- `services/fences.html`
- `services/interior-repairs.html`

### 2.3 Supporting Pages
- `about.html` - Detailed business information
- `gallery.html` - Full project gallery
- `testimonials.html` - Customer reviews
- `contact.html` - Contact information and map

## Phase 3: Styling & Responsiveness (Day 4)

### 3.1 Bootstrap 5 Integration
- Mobile-first responsive design
- Custom color scheme (soft, professional colors)
- Typography optimization
- Component styling (cards, buttons, forms)

### 3.2 Responsive Design
- Mobile navigation menu
- Responsive grid layouts
- Touch-friendly CTAs
- Optimized image handling

## Phase 4: Content & Functionality (Day 5)

### 4.1 Form Integration
- Request estimate form with validation
- Success/error message handling
- Form styling and user experience
- Preparation for backend integration

### 4.2 SEO & Performance
- Meta tags and descriptions
- Clean URL structure
- Image optimization
- Page load speed optimization

## Phase 5: Testing & Polish (Day 6)

### 5.1 Cross-browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile device testing
- Responsive breakpoint verification

### 5.2 Content Review
- Placeholder content replacement guidance
- Image optimization recommendations
- Final styling adjustments

## Technical Specifications

### Frontend Framework
- **CSS Framework:** Bootstrap 5
- **CSS Preprocessor:** SCSS (optional, for custom styling)
- **JavaScript:** Vanilla JS for interactions
- **Form Handling:** HTML5 forms with validation (ready for Netlify/Formspree integration)
- **Images:** Optimized placeholder images with alt text
- **Icons:** Bootstrap Icons or Font Awesome

## File Structure
```
handyman/
├── _config.yml
├── _layouts/
│   └── default.html
├── _includes/
│   ├── header.html
│   ├── footer.html
│   ├── hero.html
│   ├── service-card.html
│   └── testimonial-card.html
├── _sass/
│   └── custom.scss
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── services/
│   ├── roofing.html
│   ├── gutters.html
│   ├── fences.html
│   └── interior-repairs.html
├── about.html
├── gallery.html
├── testimonials.html
├── contact.html
└── index.html
```

## Key Features
- **Mobile-first responsive design**
- **Professional color scheme** (soft blues, grays, whites)
- **Strong CTAs** throughout the site
- **Service area highlighting** (Nanaimo, Parksville)
- **Before/after gallery** structure
- **Customer testimonials** with rotation
- **Quick estimate request form**
- **Contact information** with map integration
- **SEO-optimized** structure

## Page Requirements

### Homepage (index.html)
- **Hero Section**
  - Headline: "Roofing • Gutters • Fences • Interior Repairs"
  - Subtext: "Serving Nanaimo, Parksville, and surrounding areas."
  - CTA button: Request an Estimate (scrolls to form)

- **Services Section**
  - Grid layout with service cards (Roofing, Gutters, Fences, Interior Repairs)
  - Each card includes an icon/image + short description

- **Service Locations Section**
  - Highlight service coverage: "Proudly serving Nanaimo, Parksville, and surrounding areas."
  - Optional: embedded Google map showing coverage area

- **Gallery Section**
  - Before-and-after project photos (placeholder images)

- **Testimonials Section**
  - Rotating customer reviews in a card or slider format

- **About Section**
  - Brief business introduction: experience, quality guarantee, and reliability

- **Request Estimation Section**
  - Quick form with fields: Name (optional), Phone or Email (required), Message (optional)
  - Submit button: "Request Estimate"
  - On submission, show success message: "Thank you! We'll contact you shortly."

### Navigation
- Home
- Services
- Gallery
- Testimonials
- About
- Contact

## Deliverables
1. Complete Jekyll project with working pages
2. Responsive design that works on all devices
3. Professional, modern UI with strong CTAs
4. Placeholder content ready for business information
5. Form structure ready for backend integration
6. Clean, maintainable code structure
7. Documentation for content updates

## Timeline
- **Total Duration:** 6 days
- **Daily Progress:** 1-2 phases per day
- **Testing & Polish:** Final day dedicated to quality assurance

## Notes
- Form should be designed to later integrate with Netlify Forms, Formspree, or EmailJS for backend handling
- Use placeholder images and dummy text for easy replacement
- Ensure SEO-friendly structure with meta tags and clean URLs
- Focus on clean, modular HTML + SCSS/TailwindCSS code
