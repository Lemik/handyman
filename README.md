# Handyman Services Website

A professional, modern Jekyll-based static website for a handyman business specializing in roofing, gutters, fences, and interior repairs.

## 🏠 Business Overview

**Service Areas:** Nanaimo, Parksville, and surrounding areas on Vancouver Island, BC  
**Services:** Roofing, Gutters (maintenance & cleaning), Fences, Interior Repairs

## 🚀 Features

- **Mobile-first responsive design** with Bootstrap 5
- **Professional color scheme** with soft, modern aesthetics
- **Strong CTAs** throughout the site
- **Service area highlighting** for local SEO
- **Before/after gallery** structure
- **Customer testimonials** with rotation
- **Quick estimate request form**
- **Contact information** with map integration
- **SEO-optimized** structure

## 🛠️ Technology Stack

- **Static Site Generator:** Jekyll
- **CSS Framework:** Bootstrap 5
- **Icons:** Bootstrap Icons
- **Fonts:** Google Fonts (Inter)
- **JavaScript:** Vanilla JS with modern ES6+ features
- **Form Handling:** HTML5 forms (ready for Netlify/Formspree integration)

## 📁 Project Structure

```
handyman/
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html        # Main layout template
├── _includes/
│   ├── header.html         # Navigation component
│   ├── footer.html         # Footer component
│   ├── hero.html           # Hero section component
│   ├── service-card.html   # Service card template
│   └── testimonial-card.html # Testimonial template
├── _sass/
│   └── custom.scss         # Custom SCSS styles
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet
│   ├── js/
│   │   └── main.js         # Main JavaScript
│   └── images/             # Image assets
├── services/                # Individual service pages
├── index.html              # Homepage
├── about.html              # About page
├── gallery.html            # Gallery page
├── testimonials.html       # Testimonials page
└── contact.html            # Contact page
```

## 🚀 Getting Started

### Prerequisites

- Ruby (2.7.0 or higher)
- RubyGems
- Jekyll (4.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd handyman
   ```

2. **Install Jekyll and dependencies**
   ```bash
   gem install jekyll bundler
   bundle install
   ```

3. **Run the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

### Development Commands

```bash
# Build the site
bundle exec jekyll build

# Serve with live reload
bundle exec jekyll serve --livereload

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Clean build artifacts
bundle exec jekyll clean
```

## 🎨 Customization

### Colors
The site uses CSS custom properties for consistent theming. Main colors are defined in `assets/css/main.css`:

```css
:root {
    --primary-color: #0d6efd;
    --primary-dark: #0b5ed7;
    --secondary-color: #6c757d;
    --accent-color: #fd7e14;
    /* ... more colors */
}
```

### Content Updates
- **Business Information:** Update `_config.yml` for company details
- **Services:** Modify service descriptions in `index.html` and individual service pages
- **Contact Info:** Update phone, email, and address in `_config.yml`
- **Images:** Replace placeholder images in `assets/images/` with actual project photos

### Form Integration
The estimate request form is ready for backend integration:

- **Netlify Forms:** Add `netlify` attribute to forms
- **Formspree:** Update form action to Formspree endpoint
- **EmailJS:** Configure EmailJS service in JavaScript

## 📱 Responsive Design

The website is built with a mobile-first approach using Bootstrap 5:

- **Mobile:** Optimized for small screens with collapsible navigation
- **Tablet:** Responsive grid layouts that adapt to medium screens
- **Desktop:** Full-featured layout with hover effects and animations

## 🔍 SEO Features

- Meta tags for social media sharing
- Structured data markup
- Clean, semantic HTML
- Optimized heading hierarchy
- Alt text for images
- Sitemap generation

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your Git repository
2. Set build command: `bundle exec jekyll build`
3. Set publish directory: `_site`
4. Deploy automatically on push

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source to GitHub Actions
3. Create `.github/workflows/jekyll.yml` workflow

### Traditional Hosting
1. Build the site: `bundle exec jekyll build`
2. Upload `_site/` contents to your web server

## 📋 Development Checklist

- [x] Project structure setup
- [x] Jekyll configuration
- [x] Base layout and includes
- [x] Homepage with all sections
- [x] CSS styling and animations
- [x] JavaScript functionality
- [x] Responsive design
- [ ] Individual service pages
- [ ] About page
- [ ] Gallery page
- [ ] Testimonials page
- [ ] Contact page
- [ ] Content review and optimization
- [ ] Testing and bug fixes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support:
- **Email:** info@handymanservices.com
- **Phone:** (250) XXX-XXXX
- **Service Area:** Nanaimo, Parksville, and surrounding areas

---

**Built with ❤️ for the Vancouver Island community**
