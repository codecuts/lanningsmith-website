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

<section class="gridnav">
	<?php snippet('carousel', array('found' => $found, 'context'=>'gridnav')) ?>
</section>

<section class="main">
	<div class="main-frame">
		<?php //snippet('carousel', array('found' => $found, 'context'=>'main-frame')) ?>
	</div>
</section>


<?php snippet('footer') ?>
