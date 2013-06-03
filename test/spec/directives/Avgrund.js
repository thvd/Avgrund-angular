'use strict';

describe('Directive: Avgrund', function () {
  beforeEach(module('AvgrundAngularApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<-avgrund></-avgrund>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the Avgrund directive');
  }));
});
