<?php

function university_post_types()
{
  register_post_type('campus', [
    'capability_type' => 'campus',
    'map_meta_cap' => true,
    'supports' => ['title', 'editor', 'excerpt'],
    'rewrite' => ['slug' => 'campuses'],
    'has_archive' => true,
    'public' => true,
    'menu_icon' => 'dashicons-location-alt',
    'labels' => [
      'name' => 'Campuses',
      'add_new_item' => 'Add New Campus',
      'edit_item' => 'Edit Campus',
      'all_items' => 'All Campuses',
      'singular_name' => 'Campus'
    ]
  ]);
  register_post_type('event', [
    'capability_type' => 'event',
    'map_meta_cap' => true,
    'supports' => ['title', 'editor', 'excerpt'],
    'rewrite' => ['slug' => 'events'],
    'has_archive' => true,
    'public' => true,
    'menu_icon' => 'dashicons-calendar',
    'labels' => [
      'name' => 'Events',
      'add_new_item' => 'Add New Event',
      'edit_item' => 'Edit Event',
      'all_items' => 'All Events',
      'singular_name' => 'Event'
    ]
  ]);
  register_post_type('program', [
    'supports' => ['title'],
    'rewrite' => ['slug' => 'programs'],
    'has_archive' => true,
    'public' => true,
    'menu_icon' => 'dashicons-awards',
    'labels' => [
      'name' => 'Programs',
      'add_new_item' => 'Add New Program',
      'edit_item' => 'Edit Program',
      'all_items' => 'All Programs',
      'singular_name' => 'Program'
    ]
  ]);
  register_post_type('professor', [
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail'],
    'public' => true,
    'menu_icon' => 'dashicons-welcome-learn-more',
    'labels' => [
      'name' => 'Professors',
      'add_new_item' => 'Add New Professor',
      'edit_item' => 'Edit Professor',
      'all_items' => 'All Professors',
      'singular_name' => 'Professor'
    ]
  ]);
  register_post_type('note', [
    'capability_type' => 'note',
    'map_meta_cap' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor'],
    'public' => false,
    'show_ui' => true,
    'menu_icon' => 'dashicons-welcome-write-blog',
    'labels' => [
      'name' => 'Notes',
      'add_new_item' => 'Add New Note',
      'edit_item' => 'Edit Note',
      'all_items' => 'All Notes',
      'singular_name' => 'Note'
    ]
  ]);
  register_post_type('like', [
    'supports' => ['title'],
    'public' => false,
    'show_ui' => true,
    'menu_icon' => 'dashicons-heart',
    'labels' => [
      'name' => 'Likes',
      'add_new_item' => 'Add New Like',
      'edit_item' => 'Edit Like',
      'all_items' => 'All Likes',
      'singular_name' => 'Like'
    ]
  ]);
}

add_action('init', 'university_post_types');
