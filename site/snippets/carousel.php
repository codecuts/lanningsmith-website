<?php if ($context == 'gridnav') : ?>
	<div class='jcarousel'>
		
		<ul>
			
			<?php $i=0;?>	
			<?php $gridcount = 12; ?>
		
			<?php foreach ($found->visible() as $item) : ?>
		
				<?php if ($i % $gridcount == 0) : ?>
					<li>
						<div>
				<?php endif; ?>		

							<div class="grid-item">  <!-- test fort everz 4th element and switcnh to class="grid-item-rightmost" -->
								<img src="http://lorempixel.com/400/200" alt="dumdidum"/>
								<div> 
									<?php echo $item->title() ?>	
								</div>	
							</div>

				<?php $i++;	?>
		
				<?php if ($i % $gridcount == 0) :?>
						</div>
					</li>
				<?php endif;?>
		
			<?php endforeach; ?>

		</ul>

		<a class="jcarousel-control-prev" href="#">Prev</a>
	    <a class="jcarousel-control-next" href="#">Next</a>
	</div>
<?php elseif ($context == 'mainframe') : ?>
	<div class="jcarousel projects">
		<ul>
			<?php foreach ($found->visible() as $item) : ?>
				<li>
					<?php snippet('carousel', array('project'=>$item, 'context'=>'project')) ?>
				</li>
			<?php endforeach; ?>
		</ul>
		<a class="jcarousel-control-prev" href="#">Prev</a>
	    <a class="jcarousel-control-next" href="#">Next</a>
	</div>
<?php elseif ($context == 'project') : ?>
	<div class="jcarousel project">
		<ul>
			<?php foreach ($project->children() as $media) : ?>
				<?php foreach ($media->images() as $image) : ?>
					<li><img src="<?php echo $image->url() ?>" alt="<?php echo $image->name() ?>" /></li>
				<?php endforeach; ?>
			<?php endforeach; ?>
		</ul>
		<a class="jcarousel-control-prev" href="#" >Prev</a>
	    <a class="jcarousel-control-next" href="#" >Next</a>
	</div>
<?php endif; ?>