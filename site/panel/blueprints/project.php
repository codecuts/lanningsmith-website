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