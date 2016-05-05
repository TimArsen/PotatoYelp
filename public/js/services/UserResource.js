angular.module('potatoApp').factory('UserResource', function($resource, $http) {
  
  // Angular's 'Resource' service (built on top of the Angular '$http' service)
  // Allows us to interact with our RESTful Express routes
  
  var userResource = $resource('/api/users/:id', { id: '@_id' }, {
    
    update: {
      method: 'PUT' // this method issues a PUT request...
    }
  
  });
  
  return userResource;
  
  /*
    Returns a 'resource' class object that has the following methods:
    get()     --> Returns a single entry
    query()   --> Returns all entries
    save()    --> Updates an entry
    remove()  --> Deletes an entry
    delete()  --> Deletes an entry
  */
  
});