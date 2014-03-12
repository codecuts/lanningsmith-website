
# audio blueprint

title: Audio
pages: false
files: false
fields:
  title: 
    label: Audio Title
    type:  text
  text: 
    label: Audio Caption
    type:  textarea
    size:  small
  audio_url:
    label: SoundCloud URL
    type: text
    required: true
    help: The URL of a SoundCloud track (for example, https://soundcloud.com/bookdpodcast/episode-1-of-writers-envy-with)
  audio_embed:
    label: SoundCloud Embed
    type: textarea
    size: medium
    help: The embed code for the track's SoundCloud player. If you do not add this, the system will attempt to automatically generate the embed code.