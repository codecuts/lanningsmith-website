<?php snippet('header') ?>
<?php //snippet('menu') ?>
<?php //snippet('submenu') ?>

<?php
	$category = $site->uri()->path()->last();
	if($category == 'projects'){
		$category = '';
	}
	$projects = $pages->find('projects')->children();
	$found = $projects->filterBy('categories', $category);
?>

<section class="gridnav" style="display:none;">
	<div class="gridframe">
		<?php //snippet('carousel', array('found' => $found, 'context'=>'gridnav')) ?>
	</div>
</section>

<section class="main">
	<div class="main-frame">
		<?php snippet('carousel', array('found' => $found, 'context'=>'mainframe')) ?>
	</div>
</section>

<?php snippet('footer') ?>
