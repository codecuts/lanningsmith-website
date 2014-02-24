<?php snippet('header') ?>
<?php //snippet('menu') ?>
<?php //snippet('submenu') ?>

<?php
	/*$category = $site->uri()->path()->last();
	if($category == 'projects'){
		$category = '';
	}
	$projects = $pages->find('projects')->children();
	$found = $projects->filterBy('categories', $category);*/
	echo $site->uri()->path()->last();
?>

<?php snippet('body') ?>

<?php snippet('footer') ?>
