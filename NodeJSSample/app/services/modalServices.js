'use strict';

define(['app'], function (app) {
    
    var injectParams = ['$q', '$rootScope'];
    
    var modalService = function ($q, $rootScope) {
        var modal = {
            deferred: null,
            params: null
        };
        
        function open(type, params, pipeResponse) {
            var previousDeferred = modal.deferred;
            // Setup the new modal instance properties.
            modal.deferred = $q.defer();
            modal.params = params;
            // We're going to pipe the new window response into the previous
            // window's deferred value.
            if (previousDeferred && pipeResponse) {
                modal.deferred.promise
                            .then(previousDeferred.resolve, previousDeferred.reject)
                ;
                    // We're not going to pipe, so immediately reject the current window.
            } else if (previousDeferred) {
                previousDeferred.reject();
            }
            // Since the service object doesn't (and shouldn't) have any direct
            // reference to the DOM, we are going to use events to communicate
            // with a directive that will help manage the DOM elements that
            // render the modal windows.
            // --
            // NOTE: We could have accomplished this with a $watch() binding in
            // the directive; but, that would have been a poor choice since it
            // would require a chronic watching of acute application events.
            $rootScope.$emit("modals.open", type);
            return (modal.deferred.promise);
        }
        
        function params() {
            return (modal.params || {});
        }
        
        function proceedTo(type, params) {
            return (open(type, params, true));
        }
        
        function reject(reason) {
            if (!modal.deferred) {
                return;
            }
            modal.deferred.reject(reason);
            modal.deferred = modal.params = null;
            // Tell the modal directive to close the active modal window.
            $rootScope.$emit("modals.close");
        }
        
        function resolve(response) {
            if (!modal.deferred) {
                return;
            }
            modal.deferred.resolve(response);
            modal.deferred = modal.params = null;
            // Tell the modal directive to close the active modal window.
            $rootScope.$emit("modals.close");
        }

        // Return the public API.
        return ({
            open: open,
            params: params,
            proceedTo: proceedTo,
            reject: reject,
            resolve: resolve
        });
    }
    
    modalService.$inject = injectParams;
    
    app.service('modalService', modalService);
});