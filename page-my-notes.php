<?php

if (!is_user_logged_in()) {
  wp_redirect(esc_url(site_url('/')));
  exit;
}

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

    <div class="create-note">
      <h2 class="headline headline--medium">Create New Note</h2>
      <input type="text" placeholder="Title" class="new-note-title">
      <textarea placeholder="Type in a note here..." class="new-note-body"></textarea>
      <span class="submit-note">Create Note</span>
      <span class="note-limit-message">Note limit reached: delete an existing note to make room for a new one.</span>
    </div>

    <ul id="my-notes" class="min-list link-list">
      <?php
      $notes = new WP_Query([
        'post_type' => 'note',
        'posts_per_page' => -1,
        'author' => get_current_user_id()
      ]);

      while ($notes->have_posts()) {
        $notes->the_post();
      ?>

        <li data-id="<?php the_ID(); ?>">

          <input readonly class="note-title-field" type="text" value="<?php echo str_replace('Private: ', '', esc_attr(get_the_title())); ?>">

          <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
          <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>

          <textarea readonly class="note-body-field"><?php echo esc_textarea(get_the_content()); ?></textarea>

          <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>

        </li>

      <?php
      }
      ?>
    </ul>
  </div>


<?php

}

get_footer();
