<?php

get_header();
pageBanner([
  'title' => 'All Events',
  'subtitle' => 'See what is going on in our world.'
]);

?>


<div class="container container--narrow page-section">
  <?php
  while (have_posts()) {
    the_post();
    get_template_part('template-parts/content', 'event');
  }
  ?>

  <hr class="section-break">
  <p>Looking for past events? <a href="<?php echo site_url('/past-events'); ?>">Click here.</a></p>

  <?php

  echo paginate_links();
  ?>

</div>

<?php get_footer(); ?>