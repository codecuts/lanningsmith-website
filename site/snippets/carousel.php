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
	<div class='jcarousel'>
		<ul>
			<?php foreach ($found->visible() as $item) : ?>
				<li>
					<img src="http://lorempixel.com/350/420/" alt="first image">
					<!-- <div class="jcarousel-caption"><?php //echo $item->title(); ?></div>-->
				</li>
			<?php endforeach; ?>
		</ul>
		<a class="jcarousel-control-prev" href="#">Prev</a>
	    <a class="jcarousel-control-next" href="#">Next</a>
	</div>
<?php endif; ?>