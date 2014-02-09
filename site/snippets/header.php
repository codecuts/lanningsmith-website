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

  <?php echo css('assets/styles/styles.css') ?>
  <script src="assets/js/vendor/modernizr-full.js"></script>
</head>

<body>

  <header>
    <h1><a href="<?php echo url() ?>"><img src="<?php echo url('assets/images/logo.png') ?>" width="115" height="41" alt="<?php echo html($site->title()) ?>" /></a></h1>
  </header>