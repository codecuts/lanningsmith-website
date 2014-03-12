<?php

global $site;

$id    = uniqid() . '-' . $name;
$page  = $site->pages()->active();

$categories = explode(',',$site->categories());
sort($categories);

$n = array();
$s = array('\'',' ');
$r = array('-','-');
foreach ($categories as $c) {
	$n[str_replace($s,$r,trim($c))] = $c;
}
$categories = $n;

?>
<div id="<?php echo $id ?>" class="field multicheckbox">
	<ul>
		<?php foreach ($categories as $i => $c) : ?>
		<li>
			<label class="inline input">
				<input type="checkbox" value="<?php echo $i ?>" name="<?php echo $name ?>">
				<?php echo $c ?>
			</label>
		</li>
		<?php endforeach; ?>
	</ul>
</div>
