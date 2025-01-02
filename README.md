# Frankie Bordone's Personal Portfolio Website (v1)

This is the first iteration of my personal portfolio website, built with a React frontend and a headless WordPress CMS. This project demonstrates foundational skills in modern JavaScript frameworks, REST API integration, and custom WordPress development.

> ⚠️ **Deprecated as of 01/01/2025:**  
> This version is no longer live, as it has been replaced by the second iteration of my website. You can view the new version [here](https://frankiebordone.com/), as well as the source code [here](https://github.com/fbordone/frankiebordone-v2/).

## Project Overview

This website is powered by WordPress as the CMS and uses a modified version of the modern [Sage Starter Theme](https://roots.io/sage/) for the theme foundation. The project incorporates advanced tools and frameworks to provide a seamless and responsive user experience.

## Server/Environment Requisites

- [WordPress](https://wordpress.org/) >= 5.1
- [PHP](https://secure.php.net/manual/en/install.php) >= 7.2 (with [`php-mbstring`](https://secure.php.net/manual/en/book.mbstring.php) enabled)
- [Composer](https://getcomposer.org/download/)
- [Node.js](http://nodejs.org/) >= 10.0.0
- [Yarn](https://yarnpkg.com/en/docs/install)

## Theme Structure

```shell
themes/frankiebordone/         # → Root of Sage based theme
├── app/                       # → Theme PHP
│   ├── Controllers/           # → Controller files
│   ├── filters.php            # → Theme filters
│   ├── helpers.php            # → Helper functions
│   └── setup.php              # → Theme setup
├── composer.json              # → Autoloading for `app/` files
├── composer.lock              # → Composer lock file (never edit)
├── dist/                      # → Built theme assets (never edit)
├── node_modules/              # → Node.js packages (never edit)
├── package.json               # → Node.js dependencies and scripts
├── resources/                 # → Theme assets and templates
│   ├── assets/                # → Front-end assets
│   │   ├── config.json        # → Settings for compiled assets
│   │   ├── build/             # → Webpack and ESLint config
│   │   ├── fonts/             # → Theme fonts
│   │   ├── images/            # → Theme images
│   │   ├── scripts/           # → Theme JS
│   │   └── styles/            # → Theme stylesheets
│   ├── functions.php          # → Composer autoloader, theme includes
│   ├── index.php              # → Never manually edit
│   ├── screenshot.png         # → Theme screenshot for WP admin
│   ├── style.css              # → Theme meta information
│   └── views/                 # → Theme templates
│       ├── 01_components/     # → Simplest components
│       └── 02_modules/        # → Self-contained modules
│       └── 03_layouts/        # → Large sections and regions of the website
└── vendor/                    # → Composer packages (never edit)
```

## Theme Development

1. Spin up your local development server (via Vagrant/VVV, etc.).
2. Navigate to the `[theme-name-here]` theme directory, and run:
    - `composer install`
    - `yarn`
3. Clone `resources/assets/config.json` as `config-local.json` if you'd like to modify:
    - `devUrl` - should reflect your local development hostname
    - `publicPath` - should reflect your local WordPress folder structure
4. Edit `app/setup.php` in order to enable, disable, and/or customize theme features.
5. Use the following build commands while developing:
    - `yarn start` — Compile assets when file changes are made, start Browsersync session
    - `yarn build` — Compile and optimize the files in your assets directory
    - `yarn build:production` — Compile assets for production

## Documentation

If you have questions about how the Sage theme works under the hood, these two resources will serve as great reference:
- [Sage theme documentation](https://roots.io/sage/docs/)
- [Controller documentation](https://github.com/soberwp/controller#usage)

## Transition to Version 2

The second iteration of my portfolio website [(v2)](https://frankiebordone.com/) is now live, focusing on a Gutenberg-based approach for enhanced customization and functionality. This project serves as an archival reference for my earlier work. See screen recordings: [Mobile](https://drive.google.com/file/d/1p-_P0HxLs5R4mqdJVRfeX2bVajkKoH3H/view?usp=drive_link) | [Desktop](https://drive.google.com/file/d/171rbu3GLMJ0pwmxi0uHr-ILScLk9fvNA/view?usp=drive_link)

## Get in Touch
Feel free to explore this repository and reach out with any questions, feedback, or collaboration opportunities!
- **Website**: [https://frankiebordone.com/](https://frankiebordone.com)
- **LinkedIn**: [https://www.linkedin.com/in/francescobordone/](https://www.linkedin.com/in/francescobordone/)
- **GitHub**: [https://github.com/fbordone](https://github.com/fbordone)
