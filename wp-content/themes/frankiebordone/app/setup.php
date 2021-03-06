<?php

namespace App;

use Roots\Sage\Container;
use Roots\Sage\Assets\JsonManifest;
use Roots\Sage\Template\Blade;
use Roots\Sage\Template\BladeProvider;

/**
 * Theme assets
 */
add_action('wp_enqueue_scripts', function () {
    // main CSS
    wp_enqueue_style('frankiebordone/main.css', asset_path('styles/main.css'), false, null);

    // main JS
    wp_enqueue_script('frankiebordone/main.js', asset_path('scripts/main.js'), ['jquery'], null, true);

    // passes data into a globally available JS object (i.e. `FRANKIEBORDONE.theme_uri`)
    wp_localize_script('frankiebordone/main.js', 'frankiebordone', [
        'home_url' => home_url(),
        'ajax_url' => admin_url('admin-ajax.php'),
        'theme_uri' => config('theme.uri'),
        'theme_assets' => config('assets.uri'),
        'theme_fonts' => asset_path('styles/fonts.css')
    ]);
}, 100);

/**
 * Theme setup
 */
add_action('after_setup_theme', function () {
    /**
     * Enable features from Soil when plugin is activated
     * @link https://roots.io/plugins/soil/
     */
    add_theme_support('soil-clean-up');
    add_theme_support('soil-jquery-cdn');
    add_theme_support('soil-nav-walker');
    add_theme_support('soil-nice-search');
    add_theme_support('soil-relative-urls');

    /**
     * Enable plugins to manage the document title
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Register navigation menus
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'nav_menu' => __('Navigation Menu', 'frankiebordone')
    ]);

    /**
     * Enable post thumbnails
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Add image sizes (and reference wordpress sizes)
     * @link https://developer.wordpress.org/reference/functions/add_image_size/
     */
    add_image_size('w320', 320, 9999);
    // 'thumbnail' wordpress size (320x320 cropped)
    // 'medium' wordpress size (480w)
    add_image_size('w640', 640, 9999);
    // 'medium-large' wordpress size (768w)
    // 'large' wordpress size (960w)
    add_image_size('w1280', 1280, 9999);
    add_image_size('w1536', 1536, 9999);
    add_image_size('w1680', 1680, 9999);
    add_image_size('w1920', 1920, 9999);

    /**
     * Enable HTML5 markup support
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', ['caption', 'comment-form', 'comment-list', 'gallery', 'search-form']);

    /**
     * Enable selective refresh for widgets in customizer
     * @link https://developer.wordpress.org/themes/advanced-topics/customizer-api/#theme-support-in-sidebars
     */
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Use main stylesheet for visual editor
     * @see resources/assets/styles/layouts/_tinymce.scss
     */
    add_editor_style(asset_path('styles/main.css'));
}, 20);

/**
 * Register custom post types
 * @link https://codex.wordpress.org/Function_Reference/register_post_type
 */
add_action('init', function() {
    // Projects
    $args = [
        'labels' => [
            'name' => __('Projects', 'frankiebordone'),
            'singular_name' => __('Project', 'frankiebordone'),
            'add_new_item' => __('Add New Project', 'frankiebordone'),
            'edit_item' => __('Edit Project', 'frankiebordone'),
            'new_item' => __('New Project', 'frankiebordone'),
            'view_item' => __('View Project', 'frankiebordone'),
            'view_items' => __('View Projects', 'frankiebordone'),
            'search_items' => __('Search Projects', 'frankiebordone'),
            'not_found' => __('No Projects Found', 'frankiebordone'),
            'not_found_in_trash' => __('No Projects Found In Trash', 'frankiebordone'),
            'all_items' => __('All Projects', 'frankiebordone'),
            'archives' => __('Project Archives', 'frankiebordone'),
            'attributes' => __('Project Attributes', 'frankiebordone'),
            'filter_items_list' => __('Filter Projects List', 'frankiebordone'),
            'items_list' => __('Projects List', 'frankiebordone'),
        ],
        'public' => true,
        'menu_icon' => 'dashicons-portfolio',
        'show_in_rest' => true,
        'supports' => ['title', 'thumbnail'],
        'has_archive' => true,
        'rewrite' => ['slug' => 'projects'],
        'query_var' => 'project',
    ];

    register_post_type('project', $args);
});

/**
 * Updates the `$post` variable on each iteration of the loop.
 * Note: updated value is only available for subsequently loaded views, such as partials
 */
add_action('the_post', function ($post) {
    sage('blade')->share('post', $post);
});

/**
 * Setup Sage options
 */
add_action('after_setup_theme', function () {
    /**
     * Add JsonManifest to Sage container
     */
    sage()->singleton('sage.assets', function () {
        return new JsonManifest(config('assets.manifest'), config('assets.uri'));
    });

    /**
     * Add Blade to Sage container
     */
    sage()->singleton('sage.blade', function (Container $app) {
        $cachePath = config('view.compiled');
        if (!file_exists($cachePath)) {
            wp_mkdir_p($cachePath);
        }
        (new BladeProvider($app))->register();
        return new Blade($app['view']);
    });

    /**
     * Create @asset() Blade directive
     */
    sage('blade')->compiler()->directive('asset', function ($asset) {
        return "<?= " . __NAMESPACE__ . "\\asset_path({$asset}); ?>";
    });

    /**
     * Create @shortcode() Blade directive
     *
     * Must include quotes ('' or "") when calling this directive
     */
    sage('blade')->compiler()->directive('shortcode', function ($shortcode) {
        return "<?= do_shortcode({$shortcode}); ?>";
    });
});
