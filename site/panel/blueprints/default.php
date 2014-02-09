<?php if(!defined('KIRBY')) exit ?>

# default blueprint

title: default
pages: true
files: false
fields:
  title: 
    label: Category Title
    type:  text
  text: 
    label: Category Description
    type:  textarea
    size:  medium
  tags:
   	label: Category Tags
   	type: text