'use strict';

angular.module('ui.avgrund', []);
angular.module('ui.avgrund').directive('avgrund', function ($document, $timeout) {
    return {
        template: '<div class="avgrund-popup" ng-class="{ \'avgrund-popup-animate\': ngShow }" ng-transclude></div>',
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
            var container = angular.element(document.documentElement);
            container.addClass('avgrund-ready');


            function onDocumentKeyUp(event) {
                var ESCAPE_KEY_CODE = 27;
                if (event.keyCode === ESCAPE_KEY_CODE) {
                    scope.$apply(function() {
                        deactivate();
                        scope.ngShow = false;
                    });
                }
            }

            // Deactivate on click outside
            function onDocumentClick(event) {
                if (event.target === _cover) {
                    scope.$apply(function() {
                        deactivate();
                        scope.ngShow = false;
                    });
                }
            }

            function activate() {
                $document.bind('keyup', onDocumentKeyUp, false);
                $document.bind('click', onDocumentClick, false);
                $document.bind('touchstart', onDocumentClick, false);

                element.addClass('no-transition');

                $timeout(function () {
                    element.removeClass('no-transition');
                    container.addClass('avgrund-active');
                }, 0);
            }

            function deactivate() {
                $document.unbind('keyup', onDocumentKeyUp, false);
                $document.unbind('click', onDocumentClick, false);
                $document.unbind('touchstart', onDocumentClick, false);

                container.removeClass('avgrund-active');
            }

            scope.$watch('ngShow', function update(newValue, oldValue) {
                console.log('scope.$watch(ngShow)', newValue, oldValue);
                if (newValue) {
                    // show;
                    activate();
                    console.log('activate();');
                } else if (!oldValue && !newValue) {
                    // do nothing, no change;
                    console.info('do nothing, no change;');
                } else {
                    // hide = deactivate();
                    deactivate();
                    console.info('deactivate();');
                }
            });


        }
    };
});
