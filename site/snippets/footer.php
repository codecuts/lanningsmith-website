	<?php
		$allprojects = $pages->find('projects')->children();
		$transfer = array();
		$i=0;
		foreach ($allprojects as $p) {
			$media = array();
			$thumb = null;
			if ( $p->countChildren() > 0 ) {
				$thumb = thumb($p->children()->first()->images()->first(), array('width'=>210));
				foreach ( $p->children() as $c ) {
					$media[] = array(
						'url' => $c->images()->first()->url(),
						'width' => $c->images()->first()->width(),
						'height' => $c->images()->first()->height()
					);
				}
			}			
			$transfer[] = array(
				'i' => $i,
				'title' => $p->title()->value,
				'url' => $p->url(),
				'thumb' => $thumb,
				'media' => $media,
				'description' => $p->text()->value,	
				'categories' => $p->categories()->value
			);
			$i++;
		}
	?>
	<script>
	var projects = <?php print json_encode($transfer); ?>
	</script>

	<!-- RequireJS: Loads jQuery and Other Modules -->
	<script data-main="<?php echo $site->url() ?>/assets/js/app" src="<?php echo $site->url() ?>/assets/js/vendor/require.js"></script>

	<!-- Google Analytics -->
	<script>
	    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
	    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
	    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
	    e.src='//www.google-analytics.com/analytics.js';
	    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
	    ga('create','UA-XXXXX-X');ga('send','pageview');
	</script>

</body>

</html>