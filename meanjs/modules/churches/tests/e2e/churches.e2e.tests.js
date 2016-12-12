'use strict';

describe('Churches E2E Tests:', function () {
  describe('Test Churches page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/churches');
      expect(element.all(by.repeater('church in churches')).count()).toEqual(0);
    });
  });
});
