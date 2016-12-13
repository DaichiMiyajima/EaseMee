candyService.factory('rootService', function(){

    var root = firebase.database().ref();
    var geoFire = new GeoFire(root.child('geoFire'));
    var uid = function(uid){
        return service.users.child(uid);
    }
    var magneticHeading = function(uid){
        return service.uid(uid).child("magneticHeading");
    }

    var service = {
        root: root,
        users: root.child('users'),
        uid: uid,
        magneticHeading: magneticHeading,
        config: root.child('config'),
        message: root.child('message'),
        geoFire: geoFire,
        // initiate geoQuery.
        geoQuery: geoFire.query(
            {
                center: [0, 0],
                radius: 10000
            }
        )
    };

    return service;

});
