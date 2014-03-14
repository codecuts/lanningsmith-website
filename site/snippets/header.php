<!DOCTYPE html>
<html lang="en">
<head>
    <?php 
    global $project_name; 
    global $category_name;
    ?>   
    <?php if ( isset($category_name) ) : ?>
        <title><?php echo html($site->title()) ?> - Category Archive - <?php echo html(strtoupper($category_name)) ?></title>
    <?php elseif ( isset($project_name) ) : ?>
        <title><?php echo html($site->title()) ?> - <?php echo html($page->title()) ?></title>
    <?php else : ?>
         <title><?php echo html($site->title()) ?> - <?php echo html($page->title()) ?></title>
    <?php endif; ?>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="<?php echo html($site->description()) ?>" />
    <!-- will need to get right for desktop version of this site: <meta name="viewport" content="width=device-width, initial-scale=1">-->
    <meta name="keywords" content="<?php echo html($site->keywords()) ?>" />
    <meta name="robots" content="index, follow" />

    <!-- Facebook Metatags -->
    <?php snippet('metatags',array('type' => 'facebook')); ?>
    
    <link rel="icon" type="image/png" href="<?php echo url('favicon.ico') ?>">
    <link rel="alternate" type="application/rss+xml" href="<?php echo url('blog/feed') ?>" title="Blog Feed" />
    <?php echo css('assets/styles/styles.css') ?>
    <?php echo css('http://fonts.googleapis.com/css?family=Nunito:300,400') ?>
    <script src="<?php echo $site->url() ?>/assets/js/vendor/modernizr-full.js"></script>
</head>

<body>