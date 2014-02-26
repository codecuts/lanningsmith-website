<div class="container">

	<header>
		<div id="logo"><a href="">LANNINGSMITH</a></div>
	</header>

	<section class="about">
		<h2 class="site-description"><?php echo $site->description() ?></h2>
		<?php echo kirbytext($pages->find('/about-us')->text()) ?>
	</section>

	<section class="main">
		<nav class="main-nav">
			<div class="ctrl shutter" title="Open Thumb Menu"></div>
			<div class="ctrl left" title="Previous Image"></div>
			<div class="ctrl right" title="Next Image"></div>
			<div class="ctrl up" title="Previous Project"></div>
			<div class="ctrl down" title="Next Project"></div>
		</nav>
		<div class="main-frame">
			<?php //snippet('carousel', array('found' => $found, 'context'=>'mainframe')) ?>
		</div>
	</section>

	<section class="gridnav" >
		<nav class="thumbmenu-nav"></nav>
		<div class="gridframe">
			<div class='jcarousel thumbs'>
				<ul></ul>
			</div>
		</div>
		<div class="jcarousel-pagination"></div>
	</section>

	<footer></footer>

</div><!-- .container -->