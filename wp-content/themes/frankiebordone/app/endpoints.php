<?php

namespace App;

class Endpoints {
    protected $namespace = 'wp/v2';

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route($this->namespace, 'menu', [
            'methods' => 'GET',
            'callback' => [$this, 'get_wp_nav_menu'],
        ]);
    }

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
}

// instantiate class
$Endpoints = new Endpoints();
