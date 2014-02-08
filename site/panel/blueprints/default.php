<?php if(!defined('KIRBY')) exit ?>

# default blueprint

title: Page
pages: true
files: true
fields:
  title: 
    label: Title
    type:  text
  text: 
    label: Project Description
    type:  textarea
    size:  medium
  tags:
   	label: Project Tags
   	type: text