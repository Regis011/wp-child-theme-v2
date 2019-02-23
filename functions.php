<?php

add_action( 'wp_enqueue_scripts', 'twentyseventeen_parent_theme_enqueue_styles' );

function twentyseventeen_parent_theme_enqueue_styles() {
	/*
	* Parent and child style
	*/
	wp_enqueue_style(
		'parent-style', get_template_directory_uri() . '/style.css'
	);
	wp_enqueue_style(
		'child-style',
		get_stylesheet_directory_uri() . '/dist/style.build.css',
		array( 'parent-style' )
	);


	/*
	* Child script build
	*/
	wp_enqueue_script(
		'wp-build',
		get_stylesheet_directory_uri() . '/dist/build.js',
		array( 'jquery' ),
		1,
		false
	);

}
