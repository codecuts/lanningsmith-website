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
			<div class="ctrl left" title="Previous Image"><img src="/assets/images/arrow_rightleft.png" alt"left arrow"/></div>
			<div class="ctrl right" title="Next Image"><img src="/assets/images/arrow_rightleft.png" alt"right arrow"/></div>
			<div class="ctrl up" title="Previous Project"><img src="/assets/images/arrow_updown.png" alt"up arrow"/></div>
			<div class="ctrl down" title="Next Project"><img src="/assets/images/arrow_updown.png" alt"down arrow"/></div>
		</nav>
		<div class="main-frame">
			<?php //snippet('carousel', array('found' => $found, 'context'=>'mainframe')) ?>
		</div>
	</section>

	<section class="gridnav" >
		<nav class="thumbmenu-nav">
			<div class="ctrl shutter" title="Close Thumb Menu"></div>
			<div class="ctrl left" title="Previous Thumb Menu Page"></div>
			<div class="ctrl right" title="Next Thumb Menu Page"></div>
		</nav>
		<div class="gridframe">
			<div class='jcarousel thumbs'>
				<ul></ul>
			</div>
		</div>
		<div class="jcarousel-pagination"></div>
	</section>

	<footer></footer>

</div><!-- .container -->