import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// const player = new Player('vimeo-player');

// const storageKey = 'videoplayer-current-time';

// const onTimeUpdate = function (data) {
//   localStorage.setItem(storageKey, JSON.stringify(data.seconds));
// };

// player.on('timeupdate', throttle(onTimeUpdate, 1000));

// const stopTime = localStorage.getItem(storageKey);

// stopTime && player.setCurrentTime(stopTime);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let currentTime = 0;

player.on(
  'timeupdate',
  throttle(() => {
    player.getCurrentTime().then(function (seconds) {
      currentTime = Math.floor(seconds);
      localStorage.setItem('videoplayer-current-time', currentTime);
    });
  }, 1000)
);

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {});
