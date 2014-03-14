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
    <meta property="og:type"            content="website" />
    <meta property="og:site_name"       content="<?php echo $site->title() ?>"/> 
    <meta property="og:url"             content="<?php echo $site->url().'/'.$site->uri()->path(2); ?>" /> 
    <?php if ($page->isHomePage() ) : ?>
        <meta property="og:title" content="<?php echo $site->title() ?> - <?php echo $page->title()?>" />
        <meta property="og:description" content="<?php echo $site->description()?>" />
        <meta property="og:image" content="" />
    <?php elseif ( isset($category_name) ) : ?>
        <meta property="og:title" content="<?php echo $site->title.' - Category Archive - '.$category_name ?>" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
    <?php elseif ( isset($project_name) ) : ?>
        <meta property="og:title" content="<?php echo $site->title.' - '.$page->title()?>" />
        <meta property="og:description" content="<?php echo $page->text() ?>" />
        <meta property="og:image" content="" /> 
        <?php if ( $pages->active()->template() == 'project' || $pages->active()->isHomePage() ) : ?>
            <?php if ( $pages->active()->children()->first()->template() === 'image' ) : ?>
            <meta property="og:image" content="<?php echo $pages->active()->children()->first()->images()->first()->url(); ?>" />
            <?php elseif ( $pages->active()->children()->first()->template() === 'video' ) : ?>
            <meta property="og:image" content="<?php echo videos::thumb($pages->active()->children()->first()->video_url()); ?>" />
            <?php endif; ?>
        <?php endif; ?>
    <?php endif; ?>
    
    <link rel="icon" type="image/png" href="<?php echo url('favicon.ico') ?>">
    <link rel="alternate" type="application/rss+xml" href="<?php echo url('blog/feed') ?>" title="Blog Feed" />
    <?php echo css('assets/styles/styles.css') ?>
    <?php echo css('http://fonts.googleapis.com/css?family=Nunito:300,400') ?>
    <script src="<?php echo $site->url() ?>/assets/js/vendor/modernizr-full.js"></script>
</head>

<body>