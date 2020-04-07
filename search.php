<?php

get_header();
pageBanner([
  'title' => 'Search Results',
  'subtitle' => 'You searched for &ldquo;' . esc_html(get_search_query(false)) . '&rdquo;'
]);

?>

<div class="container container--narrow page-section">
  <?php

  get_search_form();

  echo "<hr class='section-break'>";

  if (have_posts()) {
    while (have_posts()) {
      the_post();

      get_template_part('template-parts/content', get_post_type());
    }

    echo "<hr class='section-break'>";

    echo paginate_links();
  } else {
    echo "<h2 class='headline headline--small-plus'>No Results</h2>";
  }
  ?>

</div>

<?php get_footer(); ?>