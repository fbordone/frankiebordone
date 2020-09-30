<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class App extends Controller {
    /**
     * Find path to spritemap if it exists
     *
     * @uses config()
     * @see  `../../../app/helpers.php`
     */
    public function sprite_path() {
        $_theme_path = \App\config('theme.dir');
        $_spritemap = glob("{$_theme_path}/dist/spritemap*.svg");

        if ( !empty($_spritemap) && file_exists($_spritemap[0]) )
            return $_spritemap[0];

        return false;
    }
}
