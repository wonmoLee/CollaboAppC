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

function DialogFactory(document) {
  if(!(this instanceof DialogFactory)){
    throw new Error('must be created with new keyword');
  }
  const CreateRoomDialog = require('./createRoomDialog');
  const LeaveRoomDialog = require('./leaveRoomDialog');
  const InviteRoomDialog = require('./inviteRoomDialog');
  const FriendMenuDialog = require('./friendMenuDialog');
  const AddFriendDialog = require('./addFriendDialog');
  const ListFriendDialog = require('./listFriendDialog');
  const ListFriendRequestDialog = require('./listFriendRequestDialog');
  const RefreshTokenDialog = require('./refreshTokenDialog');
  const createRoomDialog = new CreateRoomDialog(document);
  const leaveRoomDialog = new LeaveRoomDialog(document);
  const inviteRoomDialog = new InviteRoomDialog(document);
  const friendMenuDialog = new FriendMenuDialog(document);
  const addFriendDialog = new AddFriendDialog(document);
  const listFriendDialog = new ListFriendDialog(document);
  const listFriendRequestDialog = new ListFriendRequestDialog(document);
  const refreshTokenDialog = new RefreshTokenDialog(document);
  const getDialog = this.getDialog;

  return {
    getDialog:getDialog,
    createRoomDialog:createRoomDialog,
    leaveRoomDialog:leaveRoomDialog,
    inviteRoomDialog:inviteRoomDialog,
    friendMenuDialog:friendMenuDialog,
    addFriendDialog:addFriendDialog,
    listFriendDialog:listFriendDialog,
    listFriendRequestDialog:listFriendRequestDialog,
    refreshTokenDialog:refreshTokenDialog
  }
}
DialogFactory.prototype.getDialog = function (id) {
  switch (id){
    case 'createRoomDialog':
      return this.createRoomDialog;
    case 'leaveRoomDialog':
      return this.leaveRoomDialog;
    case 'inviteRoomDialog':
      return this.inviteRoomDialog;
    case 'friendMenuDialog':
      return this.friendMenuDialog;
    case 'addFriendDialog':
      return this.addFriendDialog;
    case 'listFriendDialog':
      return this.listFriendDialog;
    case 'listFriendRequestDialog':
      return this.listFriendRequestDialog;
    case 'refreshTokenDialog':
      return this.refreshTokenDialog;
  }
};


module.exports = DialogFactory;