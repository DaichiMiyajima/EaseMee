candyService.factory('userService', function($q, rootService, elementService, canvasService, $firebaseArray, $firebaseObject, $filter){

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
    
    var updateUser_online = function(userkey,onlinekind){
        //update the update time to user table
        var appDate = $filter('date')(new Date(), "yyyyMMddHHmmss");
        rootService.users.child(userkey).update({
            onlinetime : appDate,
            onlinekind : onlinekind
        });
    };

    var updateUser_online_test = function(userkey,onlinekind){
        //update the update time to user table
        var appDate = $filter('date')(new Date(), "yyyyMMddHHmmss");
        rootService.users.child(userkey).update({
            orientationtime : appDate,
            orientation : onlinekind
        });
    };

    var userService = {
        users: users,
        userHeading: userHeading,
        usermagneticHeading: new Array(),
        deleteUser: deleteUser,
        userObject:userObject,
        updateUser_online:updateUser_online,
        updateUser_online_test:updateUser_online_test
    }

    return userService;

});
