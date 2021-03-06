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


function RoomArea(document) {
  if(!(this instanceof RoomArea)){
    throw new Error('must be created with new keyword');
  }
  const Button = require('./button');
  const RoomList = require('./roomList');
  const Profile = require('./profile');
  this.RoomList = new RoomList(document);
  this.Profile = new Profile(document);
  this.FriendMenuButton = new Button(document.getElementById('openFriendMenuButton'));
  this.CreateRoomButton = new Button(document.getElementById('createRoomButton'));

}

module.exports = RoomArea;