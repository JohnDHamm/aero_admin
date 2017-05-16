'use strict';

angular
	.module('AeroAdminApp', ['ngRoute', 'ngMaterial'])
	.config($routeProvider =>
		$routeProvider
			.when('/', {
				controller: 'MainCtrl',
				templateUrl: 'partials/main.html'
			})
	)
	.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('green')
	    .accentPalette('orange');
  })
	.controller('MainCtrl', function($scope, $http) {
		$scope.showEditCoachModal = false;

		const loadPage = () => {
			$http
			.get('/api/getCoaches')
			.then((data) => {
				$scope.coaches = data.data;
			})
		}

		loadPage();

		$scope.addCoach = () => {
			const newCoachObj = {
				login: $scope.newCoach_login,
				first_name: $scope.newCoach_first_name,
				last_name: $scope.newCoach_last_name,
				email: $scope.newCoach_email,
				password: $scope.newCoach_password,
				admin: $scope.newCoach_admin,
				workout_admin: $scope.newCoach_workout_admin,
				archive: $scope.newCoach_archive
			}
			$http
				.post('/api/addCoach', newCoachObj)
				.then((data) => {
					resetAddCoach();
					loadPage();
				})
				.catch(console.error)
		}

		const resetAddCoach = () => {
			$scope.newCoach_login = '';
			$scope.newCoach_first_name = '';
			$scope.newCoach_first_name = '';
			$scope.newCoach_last_name = '';
			$scope.newCoach_email = '';
			$scope.newCoach_password = '';
			$scope.newCoach_admin = '';
			$scope.newCoach_workout_admin = '';
			$scope.newCoach_archive = '';
		}

		$scope.coachEdit = (id) => {
			for (let i = 0; i < $scope.coaches.length; i++) {
				if (id === $scope.coaches[i].id) {
					$scope.editCoach = $scope.coaches[i];
				}
			}
			$scope.showEditCoachModal = true;
		}

		$scope.saveEditedCoach = () => {
			$http
				.put(`/api/editCoach/${$scope.editCoach.id}`, $scope.editCoach)
				.then((data) => {
					$scope.showEditCoachModal = false;
					loadPage();
				})
				.catch(console.error)
		}

		$scope.cancelEditCoach = () => {
			$scope.showEditCoachModal = false;
			loadPage();
		}

		$scope.onSwitchChange = (id, val, col) => {
			// console.log("id, val, col", id, val, col);
			const editObj = {
				[col]: val
			};
			// console.log("editObj", editObj);
			$http
				.put(`/api/editCoach/${id}`, editObj)
				.then((data) => {
					loadPage();
				})
		}

	})
