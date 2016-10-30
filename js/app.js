var app = angular.module("movieApp", ["ui.router"])
	.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state("home", {
				url: "/home",
				templateUrl: "templates/main.html",
				controller: "MainCtrl",
				resolve: {
					categoryList: function ($http) {
						return $http.get("data/data.json").then(
							function (response) {
								return response;
							}
						);
					}
				}
			})
			.state("category", {
				url: "/category/:catid",
				templateUrl: "templates/category.html",
				controller: "ListCtrl",
				resolve: {
					titleList: function ($http) {
						return $http.get("data/data.json").then(
							function (response) {
								return response;
							}
						);
					}
				}
			})
			.state('category.product', {
				url: '/details/:bid',
				templateUrl: 'templates/details.html',
				controller: 'DetailsCtrl',
				resolve: {
					detailsList: function ($http) {
						return $http.get("data/data.json").then(
							function (response) {
								return response;
							}
						);
					}
				}
			});


}]);
app.controller("DetailsCtrl", ["$scope", "$stateParams", "detailsList", function ($scope, $stateParams, detailsList) {

	$scope.bid = $stateParams.bid;
	$scope.book;
	$scope.bookdata = detailsList.data.books;
	for (var i = 0; i < $scope.bookdata.length; i++) {


		if ($scope.bookdata[i]._id == $scope.bid) {


			$scope.book = $scope.bookdata[i];
		}

	}

	console.log($scope.book);
}]);
app.controller("ListCtrl", ["$scope", "$stateParams", "titleList", function ($scope, $stateParams, titleList) {

	var cat = $stateParams.catid;
	console.log(cat);

	$scope.books = [];

	$scope.booksdata = titleList.data.books;

	console.log($scope.booksdata);

	var bookscount = $scope.booksdata.length;
	console.log(bookscount);
	for (var i = 0; i < bookscount; i++) {
		if ($scope.booksdata[i].cat_id == cat) {
			$scope.books.push($scope.booksdata[i]);
		}

	}
	//	if (cat == 0) {
	//	
	//	}
	console.log($scope.books)
			}]);
app.controller("MainCtrl", ["$scope", "categoryList", function ($scope, categoryList) {
	//get the category in var
	$scope.categories = categoryList.data;
	console.log($scope.categories);

}]);
