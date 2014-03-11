
# video blueprint

title: Video
pages: false
files: false
fields:
  title: 
    label: Video Title
    type:  text
  text: 
    label: Video Caption
    type:  textarea
    size:  small
  video_url:
   	label: Video Url
   	type: text
    required: true
    help: The URL of a Vimeo video (for example, http://vimeo.com/87733158)
  video_embed:
    label: Video Embed
    type: textarea
    size: medium
    help: The embed code for the video. If you do not add this, the system will attempt to automatically generate the embed code.