// $firebaseAuthObject is not working for now.

candyService.factory('authService', function(rootService, $ionicPlatform, $firebaseAuth, httpService){

    var firebaseAuthObject = $firebaseAuth();

    var authService = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      onAuth: onAuth,
      authData:""
    };

    return authService;

    function register(authData) {
        rootService.users.child(authData.uid).update({
            provider: authData.email,
            name: authData.displayName,
            profileimage:authData.photoURL
        });
    }

    function login() {
        $ionicPlatform.ready(function(){
            openFB.login(function(response) {
                if(response.status === 'connected') {
                    console.log('Token stored: ',response);
                    var credencial = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
                    firebaseAuthObject.$signInWithCredential(credencial);
                } else {
                    alert('Facebook login failed: ' + response.error);
                }
            });
        });
    }
    
    function logout() {
        return firebaseAuthObject.$signOut();
    }

    function isLoggedIn() {
        return firebaseAuthObject.$getAuth();
    }

    function onAuth(onAuthCallBack) {
        firebaseAuthObject.$onAuthStateChanged(onAuthCallBack);
    }
});
