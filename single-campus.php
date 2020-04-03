<?php

get_header();
pageBanner();

$mapLocation = get_field('map_location');

while (have_posts()) {
  the_post();
?>

  <div class="container container--narrow page-section">

    <div class="metabox metabox--position-up metabox--with-home-link">
      <p><a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('campus'); ?>"><i class="fa fa-home" aria-hidden="true"></i> All Campuses </a> <span class="metabox__main"><?php the_title(); ?></span></p>
    </div>

    <div class="generic-content">
      <?php the_content(); ?>
    </div>

    <div class="acf-map">
      <div class="marker" data-lat="<?php echo $mapLocation['lat']; ?>" data-lng="<?php echo $mapLocation['lng']; ?>">
        <h3><?php the_title(); ?></h3>
        <?php echo $mapLocation['address']; ?>
      </div>
    </div>

    <?php
    $programs = new WP_Query([
      'posts_per_page' => -1,
      'post_type' => 'program',
      'orderby' => 'title',
      'order' => 'ASC',
      'meta_query' => [
        [
          'key' => 'related_campus',
          'compare' => 'LIKE',
          'value' => '"' . get_the_ID() . '"'
        ]
      ],
    ]);

    if ($programs->have_posts()) {
      echo "
        <hr class='section-break'>
        <h2 class='headline headline--medium'>Programs Available:</h2>
        <ul class='min-list link-list'>
      ";
      while ($programs->have_posts()) {
        $programs->the_post();
        echo "
        <li>
          <a href='" . get_the_permalink() . "'>
            " . get_the_title() . "
          </a>
        </li>
        ";
      }
      echo "</ul>";
    }

    wp_reset_postdata();

    ?>


  </div>

<?php }

get_footer();
