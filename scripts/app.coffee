angular
  .module 'choch', ['ionic']
  .run $ionicPlatform ->
    $ionicPlatform.ready ->
      if window.cordova && window.cordova.plugins.Keyboard
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar true

      if window.StatusBar
        StatusBar.styleDefault()
