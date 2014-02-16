<?php if(!defined('KIRBY')) exit ?>

# default blueprint

title: Project
pages: true
files: false
fields:
  title: 
    label: Project Title
    type:  text
  text: 
    label: Project Description
    type:  textarea
    size:  medium
  tags:
   	label: Project Tags
   	type: text
  categories:
    label: Categories
    type: multicheckbox
    options: 
      everybodys: Everybody's
      ours: Ours
      clients: Client's
    size: small