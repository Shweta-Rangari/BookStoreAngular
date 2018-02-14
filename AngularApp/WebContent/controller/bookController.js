

app.controller('bookController', 
        function ($scope, dataFactory) {

    $scope.status;
    $scope.customers;
    $scope.orders;
    $scope.book;
  
    getCustomers();

    function getCustomers() {
        dataFactory.getCustomers()
            .then(function (response) {
                $scope.books = response.data;
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    
    
    
    $scope.setBook = function (book) {
    	$scope.myDate = new Date(book.publishedOn);
    	$scope.isOpen = false;
    	$scope.book=book;
    	$scope.book.publishedOn=$scope.myDate;
    };

    $scope.updateBook = function (book) 
    {
        var book=book;
        book.publishedOn=GetFormattedDate(book.publishedOn);
         dataFactory.updateBook(book)
          .then(function (response) {
              $scope.status = 'Updated Customer! Refreshing customer list.';
          }, function (error) {
              $scope.status = 'Unable to update customer: ' + error.message;
          });
    };

    $scope.insertCustomer = function () {
        //Fake customer data
        var cust = {
            ID: 10,
            FirstName: 'JoJo',
            LastName: 'Pikidily'
        };
        dataFactory.insertCustomer(cust)
            .then(function (response) {
                $scope.status = 'Inserted Customer! Refreshing customer list.';
                $scope.customers.push(cust);
            }, function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
    };

    $scope.deleteBook = function (id) {
        dataFactory.deleteBook(id)
        .then(function (response) {
            $scope.status = 'Deleted Customer! Refreshing customer list.';
            for (var i = 0; i < $scope.books.length; i++) {
                var book = $scope.books[i];
                if (book.id === id) {
                    $scope.books.splice(i, 1);
                    break;
                }
            }
            $scope.orders = null;
        }, function (error) {
            $scope.status = 'Unable to delete customer: ' + error.message;
        });
    };

    $scope.getCustomerOrders = function (id) {
        dataFactory.getOrders(id)
        .then(function (response) {
            $scope.status = 'Retrieved orders!';
            $scope.orders = response.data;
        }, function (error) {
            $scope.status = 'Error retrieving customers! ' + error.message;
        });
    };
    
    
});

function GetFormattedDate(date) {
    var month = date.getMonth() + 1;
    var day = date .getDate();
    var year = date .getFullYear();
    return month + "/" + day + "/" + year;
}

