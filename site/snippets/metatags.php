<?php if ($type === 'facebook') : ?>
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
<?php endif; ?>

<?php if ($type === 'twitter') : ?>
<?php endif; ?>	