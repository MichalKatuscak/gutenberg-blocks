<?php
/*
Plugin Name: Katuscak Gutenberg Blocks
Description: Gutenberg plugin with awesome blocks
Author: Michal Katuščák
Version: 0.1
Author URI: https://www.katuscak.cz/
*/


include_once __DIR__ . "/inc/API.class.php";
$api = new \KatuscakGutenberg\API();
$api->init();

function katuscak_gutenberg_block_editor_assets() {
    wp_enqueue_script(
        'katuscak-gutenberg/blockquote-with-image-editor',
        plugins_url("/build/index.js",__FILE__),
        ['wp-blocks', 'wp-editor', 'wp-element']
    );

    wp_enqueue_style(
        'katuscak-gutenberg/blockquote-with-image-editor',
        plugins_url("/gutenberg/blocks/blockquote-with-image/editor.css",__FILE__),
        ['wp-edit-blocks']
    );
}

add_action('enqueue_block_editor_assets', 'katuscak_gutenberg_block_editor_assets');

function katuscak_gutenberg_block_assets() {
    if( !is_admin() ) {
        wp_enqueue_style(
            'katuscak-gutenberg/blockquote-with-image',
            plugins_url('/gutenberg/blocks/blockquote-with-image/view.css', __FILE__)
        );
    }
}

add_action('enqueue_block_assets', 'katuscak_gutenberg_block_assets');


function katuscak_gutenber_register_blocks()
{
    // Pouze pokud je Gutenberg dostupný
    if (!function_exists('register_block_type')) {
        return;
    }

    register_block_type('katuscak-gutenberg/authors', [
        'render_callback' => 'katuscak_gutenberg_authors_render',
    ]);
}

katuscak_gutenber_register_blocks();


function katuscak_gutenberg_authors_render($attributes, $content)
{
    $users = json_decode($attributes["user"]);
    var_dump($users);
}