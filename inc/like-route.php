<?php

function createLike($data)
{
  if (is_user_logged_in()) {
    $professorID = sanitize_text_field($data['professorID']);

    $existQuery = new WP_Query([
      'post_type' => 'like',
      'author' => get_current_user_id(),
      'meta_query' => [
        [
          'key' => 'liked_professor_id',
          'compare' => '=',
          'value' => $professorID
        ]
      ]
    ]);

    if ($existQuery->found_posts == 0 && get_post_type($professorID) == 'professor') {
      return wp_insert_post([
        'post_type' => 'like',
        'post_status' => 'publish',
        'post_title' => 'Our Test',
        'meta_input' => [
          'liked_professor_id' => $professorID
        ]
      ]);
    } else {
      die('Invalid professor ID.');
    }
  } else {
    die('Only logged in users can create a like.');
  }
}

function deleteLike()
{
  return 'Thanks for deleting!';
}

function university_like_routes()
{
  register_rest_route('university/v1', 'like', [
    'methods' => 'POST',
    'callback' => 'createLike',
  ]);

  register_rest_route('university/v1', 'like', [
    'methods' => 'DELETE',
    'callback' => 'deleteLike',
  ]);
}

add_action('rest_api_init', 'university_like_routes');
