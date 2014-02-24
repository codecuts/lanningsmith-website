<div class="container">

	<header>
		<div id="logo"><a href="">LANNINGSMITH</a></div>
	</header>

	<section class="about">
		<h2 class="site-description"><?php echo $site->description() ?></h2>
		<?php echo kirbytext($pages->find('/about-us')->text()) ?>
	</section>

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
			</div>
		</div>
		<nav class="thumbmenu-nav">
			<div class="ctrl shutter">Close</div>
		</nav>
	</section>

	<footer></footer>

</div><!-- .container -->