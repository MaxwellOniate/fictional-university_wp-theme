<?php

function universityRegisterSearch()
{
  register_rest_route('university/v1', 'search', [
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => 'universitySearchResults',
  ]);
}

function universitySearchResults($data)
{
  $query = new WP_Query([
    'post_type' => ['post', 'page', 'professor', 'program', 'campus', 'event'],
    's' => sanitize_text_field($data['term'])
  ]);

  $results = [
    'generalInfo' => [],
    'professors' => [],
    'programs' => [],
    'events' => [],
    'campuses' => []
  ];

  while ($query->have_posts()) {
    $query->the_post();

    if (get_post_type() == 'post' || get_post_type() == 'page') {
      array_push($results['generalInfo'], [
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
        'postType' => get_post_type(),
        'authorName' => get_the_author()
      ]);
    }

    if (get_post_type() == 'professor') {
      array_push($results['professors'], [
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
        'img' => get_the_post_thumbnail_url(0, 'professor-landscape')
      ]);
    }

    if (get_post_type() == 'program') {
      $relatedCampuses = get_field('related_campus');

      if ($relatedCampuses) {
        foreach ($relatedCampuses as $campus) {
          array_push($results['campuses'], [
            'title' => get_the_title($campus),
            'permalink' => get_the_permalink($campus)
          ]);
        }
      }

      array_push($results['programs'], [
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
        'id' => get_the_id()
      ]);
    }

    if (get_post_type() == 'campus') {
      array_push($results['campuses'], [
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
      ]);
    }

    if (get_post_type() == 'event') {
      $eventDate = new DateTime(get_field('event_date'));

      $description = NULL;

      if (has_excerpt()) {
        $description = get_the_excerpt();
      } else {
        $description = wp_trim_words(get_the_content(), 18);
      }

      array_push($results['events'], [
        'title' => get_the_title(),
        'permalink' => get_the_permalink(),
        'month' => $eventDate->format('M'),
        'day' => $eventDate->format('d'),
        'description' => $description
      ]);
    }
  }

  if ($results['programs']) {
    $programsMetaQuery = ['relation' => 'OR'];

    foreach ($results['programs'] as $program) {
      array_push($programsMetaQuery, [
        'key' => 'related_programs',
        'compare' => 'LIKE',
        'value' => '"' . $program['id'] . '"'
      ]);
    }

    $relationshipQuery = new WP_Query([
      'post_type' => ['professor', 'event'],
      'meta_query' => $programsMetaQuery
    ]);

    while ($relationshipQuery->have_posts()) {
      $relationshipQuery->the_post();

      if (get_post_type() == 'professor') {
        array_push($results['professors'], [
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'img' => get_the_post_thumbnail_url(0, 'professor-landscape')
        ]);
      }

      if (get_post_type() == 'event') {
        $eventDate = new DateTime(get_field('event_date'));

        $description = NULL;

        if (has_excerpt()) {
          $description = get_the_excerpt();
        } else {
          $description = wp_trim_words(get_the_content(), 18);
        }

        array_push($results['events'], [
          'title' => get_the_title(),
          'permalink' => get_the_permalink(),
          'month' => $eventDate->format('M'),
          'day' => $eventDate->format('d'),
          'description' => $description
        ]);
      }
    }

    $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));

    $results['events'] = array_values(array_unique($results['events'], SORT_REGULAR));

    $results['campuses'] = array_values(array_unique($results['campuses'], SORT_REGULAR));
  }

  return $results;
}

add_action('rest_api_init', 'universityRegisterSearch');
