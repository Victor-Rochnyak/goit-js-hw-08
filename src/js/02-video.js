import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const savedTime = localStorage.getItem(PLAYER_TIME_KEY);
const throttle = require('lodash.throttle');
console.log(savedTime);

(() => {
    if (!player){
        console.log('Не вдається ініціалізувати відео прргравач');
        return;
    }

    savedTime ? player.setCurrentTime(savedTime) : null;
    player.on('timeupdate', throttle(onPlayer, 1000));
})();

function onPlayer({seconds}){
    localStorage.setItem(PLAYER_TIME_KEY, seconds);
}

