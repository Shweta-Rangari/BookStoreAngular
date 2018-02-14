
app.factory('dataFactory', function($http) {

    var urlBase = 'http://localhost:8088/BookStoreApplication/book/';
    var dataFactory = {};

    dataFactory.getCustomers = function () {
        return $http.get(urlBase);
    };

    dataFactory.getCustomer = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertCustomer = function (cust) {
        return $http.post(urlBase, cust);
    };

    dataFactory.updateBook = function (book) {
    	var fd = new FormData();
        fd.append('file', book.image);
        fd.append('name', book.name);
        fd.append('author', book.authors);
        fd.append('code', book.code);
        fd.append('price', book.price);
        fd.append('publishOn', book.publishedOn);
        fd.append('bookId', book.id);
        return $http.post(urlBase + '/update',fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
    };

    dataFactory.deleteBook = function (id) {
        return $http.delete(urlBase + '/delete/' + id);
    };

    dataFactory.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };

    return dataFactory;
});