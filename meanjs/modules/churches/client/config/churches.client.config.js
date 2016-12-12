'use strict';

angular.module('churches').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Churches',
      state: 'churches.list',
      roles: ['*']
    });
  }
]);
