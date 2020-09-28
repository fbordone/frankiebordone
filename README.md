# FrankieBordone

My personal portfolio website, built with React and a headless WordPress CMS

This website is built on the WordPress CMS platform, and is using a modified version of the modern [Sage starter theme](https://roots.io/sage/). We are currently using `v9.0.9`.

### Server/environment requisites:
* [WordPress](https://wordpress.org/) >= 5.1
* [PHP](https://secure.php.net/manual/en/install.php) >= 7.2 (with [`php-mbstring`](https://secure.php.net/manual/en/book.mbstring.php) enabled)
* [Composer](https://getcomposer.org/download/)
* [Node.js](http://nodejs.org/) >= 10.0.0
* [Yarn](https://yarnpkg.com/en/docs/install)

### Theme structure

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

### Theme development

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

### Documentation

If you have questions about how the Sage theme works under the hood, these two resources will serve as great reference:
- [Sage theme documentation](https://roots.io/sage/docs/)
- [Controller documentation](https://github.com/soberwp/controller#usage)
