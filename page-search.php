<?php

get_header();
pageBanner();

$parent = wp_get_post_parent_id(get_the_ID());

if ($parent) {
  $findChildrenOf = $parent;
} else {
  $findChildrenOf = get_the_ID();
}

while (have_posts()) {
  the_post();
?>

  <div class="container container--narrow page-section">

    <?php
    if ($parent) {
    ?>

      <div class="metabox metabox--position-up metabox--with-home-link">
        <p><a class="metabox__blog-home-link" href="<?php echo get_permalink($parent); ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($parent); ?></a> <span class="metabox__main"><?php the_title(); ?></span></p>
      </div>

    <?php
    }
    ?>

    <?php

    $isParent = get_pages([
      'child_of' => get_the_ID()
    ]);

    if ($parent || $isParent) {

    ?>

      <div class="page-links">
        <h2 class="page-links__title"><a href="<?php echo get_permalink($parent); ?>"><?php echo get_the_title($parent); ?></a></h2>
        <ul class="min-list">
          <?php

          wp_list_pages([
            'title_li' => NULL,
            'child_of' => $findChildrenOf,
            'sort_column' => 'menu_order'
          ]);

          ?>
        </ul>
      </div>

    <?php } ?>

    <div class="generic-content">
      <?php get_search_form(); ?>
    </div>

  </div>

<?php }

get_footer();
