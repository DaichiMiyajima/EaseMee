candyService.factory('userService', function($q, rootService, elementService, canvasService, $firebaseArray, $firebaseObject){

    // all server changes are applied in realtime
    var users = $firebaseArray(rootService.users);

    //user info
    var userObject = function(userkey){
        return $firebaseObject(rootService.uid(userkey));
    }

    //user info
    var userHeading = function(userkey){
        return $firebaseObject(rootService.magneticHeading(userkey));
    }

    var deleteUser = function(user){
        users.remove(user).then(function(ref){
            console.log(ref);
        });
    };

    var userService = {
        users: users,
        userHeading: userHeading,
        usermagneticHeading: new Array(),
        deleteUser: deleteUser,
        userObject:userObject
    }

    return userService;

});
