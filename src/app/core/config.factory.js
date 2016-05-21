(function() {
  'use strict';

  angular
    .module('app.config')
    .service(configFactory);

  function configFactory() {
    var config = {
      title: 'seTracker for series lovers',
      description: 'Track your favourite TV shows and series.',
      author: 'Richard Erdos'
    }
    return config;
  }
})()
