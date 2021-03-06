/**
 * Author: wonmoLee 
 * Date: 2022.06.11
 * GitHub: https://github.com/wonmoLee
 * Blog: https://wonmolee.github.io
 * 
 * - Revision history -
 * 
 */
'use strict';

function RoomMenu(document) {
  if(!(this instanceof RoomMenu)){
    throw Error('must be created with new keyword');
  }
  this.view = document.getElementById('roomMenu');
  this.eventListener = undefined;
}

RoomMenu.prototype.setSelectListener = function (listener) {
  if(this.eventListener){
    this.view.removeEventListener('click',this.eventListener);
  }
  this.eventListener = listener;
  this.view.addEventListener('click',this.eventListener);
};

module.exports = RoomMenu;