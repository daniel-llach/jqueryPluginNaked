// custom
(function( $ ){
  "use strict"
  var scripts = document.getElementsByTagName("script");
  var urlBase = scripts[scripts.length-1].src;
  urlBase = urlBase.replace('custom_es5.js', '');
  urlBase = urlBase.replace('custom.js', '');

  // Public methods
  let api = {
    init : function(options) {
      const $el = $(this);
      $el.addClass('custom');
      methods.initCustom($el, options);
    },
    destroy: function(){
      // destroy plugin
    }
  }

  // Private methods
  let methods = {
    initCustom: function($el, options){
      console.log("options: ", options);

      // get plugin template
      let custom = methods.getTemplate('custom.html');
      custom.then((res) => {
        $el.append( res({
          type: options.type
        }) );
      }).then(() => {
        // going on with rest of stuff
      })

    },
    getTemplate: function(name){
      return new Promise(function(resolve, reject){
          $.get(urlBase + "templates/" + name, function( result ) {
            resolve(_.template(result));
          }).fail(function() {
            reject('no template')
          });
        }
      );
    }
  }

  // Events
  var events = {

  };

  // jquery component stuff
  $.fn.custom = function(methodOrOptions) {
      if ( api[methodOrOptions] ) {
          return api[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ))
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
          // Default to "init"
          return api.init.apply( this, arguments )
      } else {
          $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.custom' )
      }
  };


})( jQuery )
