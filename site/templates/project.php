<?php snippet('header') ?>
<?php snippet('menu') ?>
<?php snippet('submenu') ?>

<section class="content">

  <article>
    <h1><?php echo html($page->title()) ?></h1>
    <?php echo kirbytext($page->text()) ?>
    <?php echo kirbytext($page->tags()) ?>

    
  </article>

</section>

<?php snippet('footer') ?>
