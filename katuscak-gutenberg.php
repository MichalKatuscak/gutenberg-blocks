<?php
/*
Plugin Name: Katuscak Gutenberg Blocks
Description: Gutenberg plugin with awesome blocks
Author: Michal Katuščák
Version: 0.1
Author URI: https://www.katuscak.cz/
*/

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
    wp_enqueue_style(
        'katuscak-gutenberg/blockquote-with-image',
        plugins_url('/gutenberg/blocks/blockquote-with-image/view.css',__FILE__)
    );
}

add_action('enqueue_block_assets', 'katuscak_gutenberg_block_assets');