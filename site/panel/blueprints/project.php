<?php if(!defined('KIRBY')) exit ?>

# default blueprint

title: Project
pages: true
files: false
fields:
  title: 
    label: Project Title <br><font size= "1"> The Name of the Project (REQUIRED)</font>
    type:  text
  text: 
    label: Project Description <br><font size= "1"> Full description of the Project </font>
    type:  textarea
    size:  medium
  tags:
   	label: Project Tags <br><font size= "1"> Enter tags for the Project here. Each tag should be one single word </font>
   	type: tags
  categories: 
    label: Categories <br><font size= "1"> Choose what Categories the Project should belong to </font>
    type: multicheckbox
    options: 
      everybodys: Everybody's
      ours: Ours
      clients: Client's
    size: small