angular.module('potatoApp').factory('PotatoResource', function($resource) {
  
  // Angular's 'Resource' service (built on top of the Angular '$http' service)
  // Allows us to interact with our RESTful Express routes
  
  return $resource('/api/potatoes/:id', { id: '@_id' }, {
    
    update: {
      method: 'PUT' // this method issues a PUT request...
    }
    
  });
  
  /*
    Returns a 'resource' class object that has the following methods:
    get()     --> Returns a single entry
    query()   --> Returns all entries
    save()    --> Updates an entry
    remove()  --> Deletes an entry
    delete()  --> Deletes an entry
  */
  
});