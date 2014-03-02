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

    <!-- Facebook Metatags -->
    <meta property="og:type"            content="website" />
    <meta property="og:site_name"       content="<?php echo $site->title() ?>"/> 
    <meta property="og:url"             content="<?php echo $site->url().'/'.$site->uri()->path(2); ?>" /> 
    <?php if ( $site->uri()->path() == 'projects' ) : ?>
        <meta property="og:title" content="<?php echo $site->title().' - HOME' ?>" />
        <meta property="og:description" content="<?php echo $site->description ?>" />
        <meta property="og:image" content="" /> 
    <?php else : ?>
        <meta property="og:title" content="<?php echo $site->title().' - '.$pages->find($site->uri())->title() ?>" />
        <meta property="og:description" content="<?php echo $page->text() ?>" />
        <meta property="og:image" content="<?php echo $pages->active()->children()->first()->images()->first()->url(); ?>" />
    <?php endif; ?>
    
    <link rel="icon" type="image/png" href="<?php echo url('favicon.ico') ?>">

    <?php //echo css('assets/styles/bootstrap-full.css') ?>
    <?php echo css('assets/styles/styles.css') ?>
    <?php echo css('http://fonts.googleapis.com/css?family=Nunito:300,400') ?>

    <script src="<?php echo $site->url() ?>/assets/js/vendor/modernizr-full.js"></script>
</head>

<body>