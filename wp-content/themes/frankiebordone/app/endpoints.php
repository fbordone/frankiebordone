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

        // expose resume page related ACF data to custom endpoint called 'resume'
        register_rest_route($this->namespace, 'resume', [
            'methods' => 'GET',
            'callback' => [$this, 'get_resume_acf'],
            'permission_callback' => '__return_true',
        ]);

        // expose projects page related ACF data to custom endpoint called 'projects'
        register_rest_route($this->namespace, 'projects', [
            'methods' => 'GET',
            'callback' => [$this, 'get_projects_acf'],
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

    /*
     * Helper function for custom endpoint 'resume'
     */
    public function get_resume_acf() {
        $resume_acf_data = [];
        $resume_page_id = get_field('options__resume_page_id', 'option');

        $skills['title'] = get_field('resume__skills_title', $resume_page_id);
        $skills['copy'] = get_field('resume__skills_copy', $resume_page_id);

        $timeline['title'] = get_field('resume__timeline_title', $resume_page_id);
        $timeline['cta'] = get_field('resume__timeline_cta', $resume_page_id);
        $timeline['events'] = get_field('resume__timeline', $resume_page_id);

        $resume_acf_data['skills'] = $skills;
        $resume_acf_data['timeline'] = $timeline;

        return $resume_acf_data;
    }

    /*
     * Helper function for custom endpoint 'projects'
     */
    public function get_projects_acf() {
        $projects_acf_data = [];
        $projects_page_id = get_field('options__projects_page_id', 'option');
        $projects_list = get_field('projects__list', $projects_page_id);

        foreach ($projects_list as $project_id) {
            $projects_acf_data[] = [
                'ID' => $project_id,
                'image' => get_the_post_thumbnail_url($project_id),
                'link' => get_field('project__link', $project_id),
                'title' => get_the_title($project_id),
                'tagline' => get_field('project__tagline', $project_id),
            ];
        }

        return $projects_acf_data;
    }
}

// instantiate class
$Endpoints = new Endpoints();
