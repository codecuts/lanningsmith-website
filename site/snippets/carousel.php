<?php if ($context == 'gridnav') : ?>
	<div class='jcarousel gridnav'>
		
		<ul>
			
			<?php $i=0;?>	
			<?php $gridcount = 12; ?>
		
			<?php foreach ($found->visible() as $item) : ?>
		
				<?php if ($i % $gridcount == 0) : ?>
					<li>
						<div>
				<?php endif; ?>		

						<?php if(($i+1) % 4 == 0):?>
							<div class="grid-item-rightmost">
						<?php else :?>	
							<div class="grid-item">  
						<?php endif ?>
								<a href="<?php echo $item->url()?>">
									<img src="http://lorempixel.com/600/600" alt="dumdidum"/>
								</a>
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
	</div>
<?php endif; ?>