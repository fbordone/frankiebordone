<?php

namespace App;

class Endpoints {
    protected $namespace = 'wp/v2';

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    /*
     * Register custom endpoints
     */
    public function register_routes() {
        // expose wp nav menu to custom endpoint called 'menu'
        register_rest_route($this->namespace, 'menu', [
            'methods' => 'GET',
            'callback' => [$this, 'get_wp_nav_menu'],
            'permission_callback' => '__return_true',
        ]);

        // expose nav related ACF data to custom endpoint called 'nav'
        register_rest_route($this->namespace, 'nav', [
            'methods' => 'GET',
            'callback' => [$this, 'get_nav_acf'],
            'permission_callback' => '__return_true',
        ]);

        // expose home page related ACF data to custom endpoint called 'home'
        register_rest_route($this->namespace, 'home', [
            'methods' => 'GET',
            'callback' => [$this, 'get_home_acf'],
            'permission_callback' => '__return_true',
        ]);
    }

    /*
     * Helper function for custom endpoint 'menu'
     */
    public function get_wp_nav_menu() {
        $nav_menu_items = wp_get_nav_menu_items('Navigation Menu');
        $menu_items_data = [];

        if ($nav_menu_items) {
            foreach ($nav_menu_items as $item) {
                $menu_items_data[] = [
                    'ID' => $item->ID,
                    'title' => $item->title,
                    'path' => parse_url($item->url, PHP_URL_PATH),
                ];
            }
        }

        return $menu_items_data;
    }

    /*
     * Helper function for custom endpoint 'nav'
     */
    public function get_nav_acf() {
        $nav_acf_data = [];

        if ($nav_image = get_field('options__image', 'option')) {
            $nav_acf_data = [
                'image' => $nav_image
            ];
        }

        return $nav_acf_data;
    }

    /*
     * Helper function for custom endpoint 'home'
     */
    public function get_home_acf() {
        $home_acf_data = [];
        $home_page_id = get_field('options__home_page_id', 'option');

        if ($home_title = get_field('home__title', $home_page_id)) {
            $home_acf_data = [
                'title' => $home_title
            ];
        }

        if ($home_tagline = get_field('home__tagline', $home_page_id)) {
            $home_acf_data['tagline'] = $home_tagline;
        }

        return $home_acf_data;
    }
}

// instantiate class
$Endpoints = new Endpoints();
