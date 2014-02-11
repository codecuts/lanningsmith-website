<!DOCTYPE html>
<html lang="en">
<head>
  
  <title><?php echo html($site->title()) ?> - <?php echo html($page->title()) ?></title>

  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="<?php echo html($site->description()) ?>" />
  <!-- will need to get right for desktop version of this site: <meta name="viewport" content="width=device-width, initial-scale=1">-->
  <meta name="keywords" content="<?php echo html($site->keywords()) ?>" />
  <meta name="robots" content="index, follow" />

  <?php //echo css('assets/styles/bootstrap-full.css') ?>
  <?php echo css('assets/styles/styles.css') ?>

  <script src="assets/js/vendor/modernizr-full.js"></script>
</head>

<body>

  <div class="container">

    <header></header>