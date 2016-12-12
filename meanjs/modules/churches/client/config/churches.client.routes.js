(function () {
  'use strict';

  angular
    .module('churches')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('churches', {
        abstract: true,
        url: '/churches',
        template: '<ui-view/>'
      })
      .state('churches.list', {
        url: '',
        templateUrl: 'modules/churches/client/views/list-churches.client.view.html',
        controller: 'ChurchesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Churches List'
        }
      })
      .state('churches.create', {
        url: '/create',
        templateUrl: 'modules/churches/client/views/form-church.client.view.html',
        controller: 'ChurchesController',
        controllerAs: 'vm',
        resolve: {
          churchResolve: newChurch
        },
        data: {
          pageTitle: 'Churches Create'
        }
      })
      .state('churches.edit', {
        url: '/:churchId/edit',
        templateUrl: 'modules/churches/client/views/form-church.client.view.html',
        controller: 'ChurchesController',
        controllerAs: 'vm',
        resolve: {
          churchResolve: getChurch
        },
        data: {
          pageTitle: 'Edit Church {{ churchResolve.name }}'
        }
      })
      .state('churches.delete', {
        url: '/:churchId/delete',
        templateUrl: 'modules/churches/client/views/list-churches.client.view.html',
        controller: 'ChurchesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Churches List'
        }
      });
  }

  getChurch.$inject = ['$stateParams', 'ChurchesService'];

  function getChurch($stateParams, ChurchesService) {
    return ChurchesService.get({
      churchId: $stateParams.churchId
    }).$promise;
  }

  newChurch.$inject = ['ChurchesService'];

  function newChurch(ChurchesService) {
    return new ChurchesService();
  }
}());
