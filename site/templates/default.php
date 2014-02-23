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
	<div class="main-frame">

	
		

		<?php //snippet('carousel', array('found' => $found, 'context'=>'mainframe')) ?>
	</div>
	<nav class="main-nav">
		<div class="ctrl shutter" title="Open Thumb Menu">Shutter</div>
		<div class="ctrl left" title="Previous Image">Prev</div>
		<div class="ctrl right" title="Next Image">Next</div>
		<div class="ctrl up" title="Previous Project">Prev</div>
		<div class="ctrl down" title="Next Project">Next</div>
	</nav>
</section>

<section class="gridnav" >
	<div class="gridframe">
		<div class='jcarousel thumbs'>
			<ul></ul>
			<a class="jcarousel-control-prev" href="#">Prev</a>
		    <a class="jcarousel-control-next" href="#">Next</a>
		</div>
	</div>
	<nav class="thumbmenu-nav">
		<div class="ctrl shutter">Close</div>
	</nav>
</section>

<?php snippet('footer') ?>
