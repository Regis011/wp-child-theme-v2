<?php
/**
 * functions and definitions
 */
function child_enqueue_styles() {

    $parent_style = 'parent-style';
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/dist/style.build.css',
        array( $parent_style ),
        false
    );

    wp_register_script(
			'child-scripts',
			get_stylesheet_directory_uri() . '/dist/build.js',
			array(),
			null,
			true
		);
    wp_enqueue_script('child-scripts');

}
add_action( 'wp_enqueue_scripts', 'child_enqueue_styles' );

/**
 * Setup Child Theme's textdomain.
 *
 * Declare textdomain for this child theme.
 * Translations can be filed in the /languages/ directory.
 */
function np011_child_theme_setup() {
    load_child_theme_textdomain( 'child-textdomain', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'np011_child_theme_setup' );
