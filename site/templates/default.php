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



<section class="main">
	<div class="shutter">X</div>
	<div class="main-frame">
		<?php snippet('carousel', array('found' => $found, 'context'=>'mainframe')) ?>
	</div>
	<nav class="main-nav">
		<div class="left" title="Previous Image">Prev</div>
		<div class="right" title="Next Image">Next</div>
		<div class="top" title="Previous Project">Prev</div>
		<div class="bottom" title="Next Project">Next</div>
	</nav>
</section>

<section class="gridnav" >
	<div class="shutter">X</div>
	<div class="gridframe">
		<?php snippet('carousel', array('found' => $found, 'context'=>'gridnav')) ?>
	</div>
</section>

<?php snippet('footer') ?>
