source "https://rubygems.org"

# GitHub Pages compatible gems
gem "github-pages", group: :jekyll_plugins
gem "jekyll-multiple-languages-plugin"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Development dependencies
group :development do
  gem "webrick", "~> 1.7"
end

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1"
  gem "tzinfo-data"
end

# Performance optimization
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Specify Ruby version
ruby ">= 2.7.0"
