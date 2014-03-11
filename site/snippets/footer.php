	<?php
		// dump all projets into array to be transferred to javascript via json
		$allprojects = $pages->find('projects')->children()->visible();
		$transfer = array();
		$i=0;
		foreach ($allprojects as $p) {
			$media = array();
			$thumb = null;
			if ( $p->countChildren() > 0 ) {

				if ($p->children->first()->template() === 'image' ) {
					$thumb = thumb($p->children()->first()->images()->first(), array('width'=>210));
				}
				else if ( $p->children()->first()->template() === 'video' ) {
					$thumb = '<img src="'.videos::thumb($p->children()->first()->video_url()->value).'" alt="video thumbnail"/>';
				}
				
				foreach ( $p->children() as $c ) {

					$mtype = $c->template();

					switch ($mtype) {
						case 'image':
							if($c->images()->first()){
								$media[] = array(
									'type' => $mtype,
									'url' => $c->images()->first()->url(),
									'width' => $c->images()->first()->width(),
									'height' => $c->images()->first()->height(),
									'title' => $c->title()->value,
									'description' =>$c->text()->value
								);
							}
							break;
						case 'video':
							$embed = '';
							$url = $c->video_url()->value;
							$test = videos::thumb($url);
							if ( !isset($c->video_embed()->value) || $c->video_embed()->value == '' ) {
								$embed = videos::embed($url);
							} else {
								$embed = $c->video_embed()->value; 
							}	
							$media[] = array(
								'type' => $mtype,
								'id' => videos::id($url),
								'url' => $c->video_url()->value,
								'title' => $c->title()->value,
								'description' => $c->text()->value,
								'embed' => $embed,
								'thumb' => videos::thumb($url)
							);
							break;
					}
				}
				$transfer[] = array(
					'i' => $i,
					'title' => $p->title()->value,
					'url' => str_replace('/projects','',$p->url()),
					'thumb' => $thumb,
					'media' => $media,
					'description' => $p->text()->value,	
					'categories' => $p->categories()->value
				);			
			$i++;
			}
		}
	?>
	<script>
	var siteTitle = <?php echo "'".$site->title()."';" ?>
	var projects = <?php print json_encode($transfer).';'; ?>
	var iil = <?php echo "'".$site->images_in_loop()."';" ?>
	var gV = <?php echo "'".$site->grid_visible()."';" ?>
	var imagesInLoop = iil == "TRUE" || iil == "True"|| iil == "true"|| iil == "YES" || iil == "Yes" || iil == "yes" ? 1 : 0;
	var gridVisible = gV == "TRUE" || gV == "True"|| gV == "true"|| gV == "YES" || gV == "Yes" || gV == "yes" ? 1 : 0;
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