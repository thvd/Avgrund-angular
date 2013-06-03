'use strict';

angular.module('ui.avgrund', []);
angular.module('ui.avgrund').directive('avgrund', function ($document) {
        return {
            template: '<div class="avgrund-popup" ng-transclude></div>',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                ngShow: '='
            },
            /**
             * @param {angular.Scope} scope
             * @param {angular.element} element
             * @param {Attributes} attrs
             */
            link: function postLink(scope, element, attrs) {
                console.log(scope, element, attrs);
                debugger;

                var currentState = null;

                /**
                 * @type {Node}
                 */
                var _cover = document.querySelector('.avgrund-cover');

                /**
                 * @type {angular.element}
                 */
                var cover = null;

                if (_cover === null) {
                    var _div = document.createElement('div');
                    _div.className = 'avgrund-cover';
                    document.body.appendChild(_div);
                    _cover = document.querySelector('.avgrund-cover');
                }

                cover = angular.element(_cover);



                /**
                 * @type {angular.element}
                 */
                var container = angular.element($document.documentElement);
                container.addClass('avgrund-ready');


                function onDocumentKeyUp(event) {
                    var ESCAPE_KEY_CODE = 27
                    if (event.keyCode === ESCAPE_KEY_CODE) {
                        deactivate();
                    }
                }

                // Deactivate on click outside
                function onDocumentClick(event) {
                    if (event.target === cover) {
                        deactivate();
                    }
                }

                function activate(state) {
                    $document.bind('keyup', onDocumentKeyUp, false);
                    $document.bind('click', onDocumentClick, false);
                    $document.bind('touchstart', onDocumentClick, false);

                    element.removeClass(currentState);
                    element.addClass('no-transition');
                    element.addClass(state);

                    setTimeout(function () {
                        element.removeClass('no-transition');
                        container.addClass('avgrund-active');
                    }, 0);

                    currentState = state;
                }

                function deactivate() {
                    $document.bind('keyup', onDocumentKeyUp, false);
                    $document.bind('click', onDocumentClick, false);
                    $document.bind('touchstart', onDocumentClick, false);

                    container.removeClass('avgrund-active');
                    element.removeClass('avgrund-popup-animate');
                }

                scope.$watch(attrs.ngShow, function update(newValue, oldValue) {
                    console.log('scope.$watch(ngShow)', newValue, oldValue);
                    if (newValue) {
                        // show;
                        element.addClass('avgrund-popup-animate');
                        activate();
                    } else {
                        // hide;
                        deactivate();
                    }
                });


            }
        };
    });
