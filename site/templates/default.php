<?php snippet('header') ?>
<?php //snippet('menu') ?>
<?php //snippet('submenu') ?>

<section class="content">
	<div class="view-frame">
		<div>


		<?php

			$category = $site->uri()->path()->last();
			if($category == 'projects'){
				$category = '';
			}
			echo $category;echo '<br>';
			$projects = $pages->find('projects')->children();

			$found = $projects->filterBy('categories', $category);
			foreach($found as $p){
				echo '<br>';
				echo $p->title(); 
			}
?>

</div>
	</div>
</section>


<?php snippet('footer') ?>
