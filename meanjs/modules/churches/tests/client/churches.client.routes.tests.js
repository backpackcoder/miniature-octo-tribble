(function () {
  'use strict';

  describe('Churches Route Tests', function () {
    // Initialize global variables
    var $scope,
      ChurchesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ChurchesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ChurchesService = _ChurchesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('churches');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/churches');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ChurchesController,
          mockChurch;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('churches.view');
          $templateCache.put('modules/churches/client/views/view-church.client.view.html', '');

          // create mock Church
          mockChurch = new ChurchesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Church Name'
          });

          // Initialize Controller
          ChurchesController = $controller('ChurchesController as vm', {
            $scope: $scope,
            churchResolve: mockChurch
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:churchId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.churchResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            churchId: 1
          })).toEqual('/churches/1');
        }));

        it('should attach an Church to the controller scope', function () {
          expect($scope.vm.church._id).toBe(mockChurch._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/churches/client/views/view-church.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ChurchesController,
          mockChurch;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('churches.create');
          $templateCache.put('modules/churches/client/views/form-church.client.view.html', '');

          // create mock Church
          mockChurch = new ChurchesService();

          // Initialize Controller
          ChurchesController = $controller('ChurchesController as vm', {
            $scope: $scope,
            churchResolve: mockChurch
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.churchResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/churches/create');
        }));

        it('should attach an Church to the controller scope', function () {
          expect($scope.vm.church._id).toBe(mockChurch._id);
          expect($scope.vm.church._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/churches/client/views/form-church.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ChurchesController,
          mockChurch;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('churches.edit');
          $templateCache.put('modules/churches/client/views/form-church.client.view.html', '');

          // create mock Church
          mockChurch = new ChurchesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Church Name'
          });

          // Initialize Controller
          ChurchesController = $controller('ChurchesController as vm', {
            $scope: $scope,
            churchResolve: mockChurch
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:churchId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.churchResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            churchId: 1
          })).toEqual('/churches/1/edit');
        }));

        it('should attach an Church to the controller scope', function () {
          expect($scope.vm.church._id).toBe(mockChurch._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/churches/client/views/form-church.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
