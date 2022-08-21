import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const currentTime = localStorage.getItem('videoplayer-current-time');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

if (currentTime) {
  player.setCurrentTime(currentTime);
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate(e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
}
