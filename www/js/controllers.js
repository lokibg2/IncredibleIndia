angular.module('app.controllers', [])

  .controller('plannerCtrl', ['$scope', '$stateParams', // The following is the
    // constructor function
    // for this page's
    // controller. See
    // https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

    }])

  .controller(
    'placeOfInterestCtrl',
    [
      '$scope',
      '$rootScope',
      '$stateParams',
      '$state', 'sessionService', // The following is the constructor function for
      // this page's controller. See
      // https://docs.angularjs.org/guide/controller
      // You can include any angular dependencies as parameters for
      // this function
      // TIP: Access Route Parameters for your page via
      // $stateParams.parameterName
      function ($scope, $stateParams, $rootScope, $state, sessionService) {
        $scope.categories = [{
          name: "Adventure",
          types: ["amusement_park", "bowling_alley"],
          color: "adventure"
        }, {
          name: "Ancient",
          types: ["museum", "art-gallery"],
          color: "ancientwonder"
        }, {
          name: "Divine",
          types: ["hindu_temple", "church", "mosque"],
          color: "divine"
        }, {
          name: "Entertainment",
          types: ["movie_rental", "movie_theater", "bar", "casino"],
          color: "entertainment"
        }, {
          name: "Shopping",
          types: ["home_goods_store", "clothing_store", "department_store", "electronics_store", "liquor_store", "shopping_mall", "shoe_store", "jewelry_store", "book_store"],
          color: "shopping"
        },
          {
            name: "Wildlife",
            types: ["zoo", "aquarium"],
            color: "wildlife"
          }];
        $scope.pickCategory = function (categoryName, types) {
          sessionService.set('mainCategory', categoryName);
          sessionService.set('fetchTypes', types);
          $state.go('tabsController.pOIDetail');
        }
      }])

  .controller('searchCtrl', ['$scope', '$stateParams', '$state', 'sessionService', // The following is the
    // constructor function
    // for this page's
    // controller. See
    // https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, sessionService) {
      $scope.searchCategories = [
        {
          name: "Restaurants",
          image: "../img/restaurants.jpg",
          types: 'restaurant|meal_delivery|meal_takeaway|cafe'
        },
        {
          name: "Stay",
          image: "../img/stay.jpg",
          types: 'lodging'

        }, {
          name: "Tour Operators",
          // image: "../img/tourOp.jpg"
        },
        {
          name: "Tour Planners",
          // image: "../img/tourPlan.jpg"
        }
      ];
      $scope.navigate = function (name, types) {
        sessionService.set('mainCategory', name);
        sessionService.set('types', types);
        if (name == 'Restaurants') {
          $state.go('tabsController.pOIDetail2');
        } else if (name == 'Stay') {
          $state.go('tabsController.pOIDetail2');
        } else if (name == 'Tour Operators') {
          $state.go('tabsController.tourOperators');
        } else {

        }
      };

    }])

  .controller('utilitiesCtrl', ['$scope', '$stateParams', // The following is
    // the constructor
    // function for this
    // page's
    // controller. See
    // https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {
      $scope.utilities = [{
        name: "Currency Converter",
        icon: "ion-cash",
        color: "Adventure",
        sref: "tabsController.currencyConverter"
      },
        {
          name: "Embassy",
          icon: "ion-flag",
          color: "Divine",
          sref: "tabsController.embassy"
        }, {
          name: "Translator",
          icon: "ion-arrow-swap",
          color: "Entertainment",
          sref: "tabsController.translator"
        }, {
          name: "Weather Updates",
          icon: "ion-ios-partlysunny-outline",
          color: "Ancient",
          sref: "tabsController.weatherUpdates"
        }, {
          name: "Emergency Numbers",
          icon: "ion-alert",
          color: "Wildlife",
          sref: "tabsController.emergencyNumbers"
        }, {
          name: "Incredible Apps",
          icon: "ion-ios-color-wand",
          color: "tab1",
          sref: "tabsController.incredibleApps"
        }];
    }])

  .controller('profileCtrl', ['$scope', '$stateParams', 'sessionService', '$state', '$rootScope',
    function ($scope, $stateParams, sessionService, $state, $rootScope) {
      $scope.showUpdateProfile = sessionService.get('user');
      var provider = new firebase.auth.GoogleAuthProvider();
      $scope.gLogin = function () {
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          sessionService.set('user', result.user);
          $scope.user = result.user;
          console.log(result.user);
          $scope.showUpdateProfile = true;
          $state.go('tabController.profile');
        }).catch(function (error) {
          console.log(error);
        });
      };

      $scope.fbLogin = function () {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          $scope.user = result.user;
          sessionService.set('user', result.user);
          console.log(result.user);
          $scope.showUpdateProfile = true;
          $state.go('tabController.profile');
        }).catch(function (error) {
          console.log(error);
        });
      };

    }])
  .controller('pOIDetailCtrl2',
    ['$scope', '$rootScope', '$stateParams', '$state', '$http', 'sessionService',
      function ($scope, $stateParams, $rootScope, $state, $http, sessionService) {
        url = "192.168.1.3:3000/fetchPlaces";
        $scope.mainCat = sessionService.get('mainCategory');
        console.log($scope.mainCat);
        var data = {
            location: [40.7127, -74.0059],
            radius: 300000,
            keyword: sessionService.get('types')
          }
          ;

        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };

        $scope.places = [{
          geometry: {
            location: {
              lat: 13.1928081,
              lng: 80.27530809999999
            },
            viewport: {
              northeast: {
                lat: 13.1941570802915,
                lng: 80.2766570802915
              },
              southwest: {
                lat: 13.1914591197085,
                lng: 80.27395911970848
              }
            }
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
          id: "278f7a6f7f0a10bc30ad9a5a381e7d6acad4b5e5",
          name: "Kananga Durga Amman Kovil",
          place_id: "ChIJjcmx8qB6UjoRxJSI31eTAUw",
          reference: "CmRRAAAAnYweerWnjaMiZT0blZBcQTg7RH-5xu1SLVckiSZMfRdSkUiUbIBmTySg4j9s18gz9teK_IN-umARb0ZDX6vlS19gMVt3EEvJpEgMvFUxmbMbr7Kz9hfbS90szmcfEqOaEhDmJ9YIshIq5aPBW_b4k-xLGhQ619erX3SJCN-QmE3ZWrDGSbIEyA",
          scope: "GOOGLE",
          types: [
            "hindu_temple",
            "place_of_worship",
            "point_of_interest",
            "establishment"
          ],
          vicinity: "Dwaraka Nagar, Manali New Town, Manali, Chennai"
        },
          {
            geometry: {
              location: {
                lat: 13.1833673,
                lng: 80.28480189999999
              },
              viewport: {
                northeast: {
                  lat: 13.1847162802915,
                  lng: 80.28615088029149
                },
                southwest: {
                  lat: 13.1820183197085,
                  lng: 80.28345291970848
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "2f2e976c19ab632d43aff968d8ef95597f6fa0d1",
            name: "Angal Aman Mandir",
            place_id: "ChIJN1ziDgVwUjoR5zs_Og45aao",
            rating: 5,
            reference: "CmRSAAAAoYcJh03HF5vUm5cHJ6_m2ac5eKJIXaAv09fAC8v8_YzVao9X0DM424_WvmvH0bJlKHpXUeSJh3xhynwIONmc2g4nGh0kbLkFzJFCUEwM62cN8Vmm_yrqFaATXIDxNPJvEhBKKrEW_JpebM7gHUedmHMZGhQsyhrCI3SDDPHpeA_G6Bgze9mxBw",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Burma Nagar, Manali New Town, Manali, Chennai"
          },
          {
            geometry: {
              location: {
                lat: 13.193566,
                lng: 80.2615616
              },
              viewport: {
                northeast: {
                  lat: 13.1949149802915,
                  lng: 80.2629105802915
                },
                southwest: {
                  lat: 13.1922170197085,
                  lng: 80.2602126197085
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "527bf3e90d7ee68b1d91af7ceff969e1dc2cfe96",
            name: "Perumal Kovil",
            place_id: "ChIJKcCht716UjoR2VN6zzWmkVk",
            reference: "CmRRAAAAddVUyD0nTRqE_junXpNm7n-ffFtMaxko6ahpEoYC5xOljjywSO73JUlO0woMhBBvFNYhDc8ju_6Ccpz7kbBEGRak_6UuOtYDSLYLkEX8w4XgrFgiqTVg7qc6ZKcOAnxwEhAbgSmJw7DqOdtIIPKk2N9OGhR8fBzPW0Fk3FkilmWnejxDf8Uq_Q",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Andar Kuppam Village"
          },
          {
            geometry: {
              location: {
                lat: 13.1938989,
                lng: 80.2616675
              },
              viewport: {
                northeast: {
                  lat: 13.1952478802915,
                  lng: 80.2630164802915
                },
                southwest: {
                  lat: 13.1925499197085,
                  lng: 80.26031851970849
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "5ac6923c7f067792515ddc55ed2024c47c4c9dd5",
            name: "Lakshmi Amman Kovil",
            place_id: "ChIJcddsub16UjoRNp_sB2Wh8OA",
            rating: 5,
            reference: "CmRSAAAAd9MDhFa2XoXzwwvD-XaMde1gpcGQswm6F2HkKMCHg6g54W2GvHQCjSTu1rDgi89PL_0ywEwAn5QSWxjQLuUz2mBtC-LAbEJ4diyxP8o1Nn6_Vul9xbm2MXW5m0nQ79gWEhCuQ9xBW6T5zJC60CXqKhntGhTG7N2T6zXVN6ovMX1VL0WHxobAcA",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Andar Kuppam Village"
          },
          {
            geometry: {
              location: {
                lat: 13.1935321,
                lng: 80.2575248
              },
              viewport: {
                northeast: {
                  lat: 13.1948810802915,
                  lng: 80.2588737802915
                },
                southwest: {
                  lat: 13.1921831197085,
                  lng: 80.25617581970849
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "030a76d4c76112ee3313fdd94183fdacc3a9c6e5",
            name: "Vinayakar Mandir",
            place_id: "ChIJz6TwTb56UjoRuzT1-Tkcau8",
            reference: "CmRSAAAA5RsqtNkZ7DF9C1KtvJdQ09WvU06Mhh8wnAEDtGaaEM2VjO5Gx-2zVMVO0suJOwQ40CkUGFIhK82E5AKIz6IDQrkkd7asw4Y9YIyTnnDHDODgCIaHD0LMfSj4-mSY7GsmEhDjcSWOLWFhsFOeRu560poxGhT15iMiz8SbOCAkTREEjckGwFUQEw",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Kamarajapuram, Vichoor"
          },
          {
            geometry: {
              location: {
                lat: 13.1755665,
                lng: 80.28655979999999
              },
              viewport: {
                northeast: {
                  lat: 13.1769154802915,
                  lng: 80.2879087802915
                },
                southwest: {
                  lat: 13.1742175197085,
                  lng: 80.2852108197085
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "74a6e3346169aaac34bba82048691feb32039881",
            name: "Sada Muneesswaran temple",
            photos: [
              {
                height: 3264,
                html_attributions: [
                  "<a href=\"https://maps.google.com/maps/contrib/113976364960967250975/photos\">Sur Ya</a>"
                ],
                photo_reference: "CoQBdwAAAHGk5H3IIr9PFZwNcKHFldvFsaDk1B1deQf83AbRHGl27OxBLKeGZOv8zq4uXMKbcIWIMf7_mIIbnfOkL7-PVtJRp_JGHLp3VeQtTyTS5LziPBJTE1Ltsm-1lu8uwYINynLqM4MEuOebzNLVNxU1dW9npAYEewMjhzGys9TQ0OO2EhCgalyOoVNNmLI6ViiHmKVfGhQZ4C_HhwlmCo2i6PSOkWgHMtnpDw",
                width: 1836
              }
            ],
            place_id: "ChIJZ9fLwQJwUjoRMFfKLv9bK3c",
            rating: 5,
            reference: "CmRRAAAAJbG10tGRGApDOaA137mxVdH5monxlkoOCE431iEZBhDEOzmRVnR8-MMnHdJcheoPjFC-zkUml-bmUmn652MXwfwZi6xhF8J7e9CEgVUuASfwlzycs2LWBSzYuRJZAxp9EhDrrax97k6tVtWO-233P6grGhQnZZA22vT4QNtRtD8bzyXMWaz_XA",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "express Manali Chennai, Tamil Nadu 600068"
          },
          {
            geometry: {
              location: {
                lat: 13.1943925,
                lng: 80.2573317
              },
              viewport: {
                northeast: {
                  lat: 13.1957414802915,
                  lng: 80.2586806802915
                },
                southwest: {
                  lat: 13.1930435197085,
                  lng: 80.2559827197085
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "2ab64dbd20567f3b6bf6636d8a62eb45c42793d7",
            name: "Srikrishna Mandir",
            place_id: "ChIJtQLiNL56UjoRo8aGUIo_buo",
            reference: "CmRSAAAAokwSOe6nstu9rf4GNwombjpRcw8PCey0j8dOmcH0CDrV9StDemKJZsbqHOQ5NAnYSr7yHZngTG-uX4PrytWWn0QsTexv5e7H40iQw61u35uaR4QW8c1ZddcFiBlhVA6HEhAdbhyGrlnQLvLikDfnnT5VGhRoZ3MZfQ3f-qRxU60jA_IxUPsY5Q",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Kamarajapuram, Vichoor"
          }];

        //
        // $http.post(url, data, config)
        //   .then(function (data) {
        //     console.log(data);
        //   }, function (error) {
        //     console.log(error);
        //   });
      }])
  .controller('profileCtrl', ['$scope', '$stateParams', 'sessionService', '$state', '$rootScope',
    function ($scope, $stateParams, sessionService, $state, $rootScope) {
      $scope.showUpdateProfile = sessionService.get('user');
      var provider = new firebase.auth.GoogleAuthProvider();
      $scope.gLogin = function () {
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          sessionService.set('user', result.user);
          $scope.user = result.user;
          console.log(result.user);
          $scope.showUpdateProfile = true;
          $state.go('tabController.profile');
        }).catch(function (error) {
          console.log(error);
        });
      };

      $scope.fbLogin = function () {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          $scope.user = result.user;
          sessionService.set('user', result.user);
          console.log(result.user);
          $scope.showUpdateProfile = true;
          $state.go('tabController.profile');
        }).catch(function (error) {
          console.log(error);
        });
      };

    }])
  .controller('pOIDetailCtrl',
    ['$scope', '$rootScope', '$stateParams', '$state', '$http', 'sessionService',
      function ($scope, $stateParams, $rootScope, $state, $http, sessionService) {
        url = "192.168.1.3:3000";
        $scope.mainCat = sessionService.get('mainCategory');
        var data = {
          location: [40.7127, -74.0059],
          radius: 300000,
          keyword: $rootScope.fetchTypes
        };


        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };

        $scope.visualize = function (placeId, pName) {
          console.log("VIss");
          var data = {
            placeId: placeId,
            name: pName
          };
          //POST REQUEST GOES HERE
          $http({
            url: 'http://192.168.1.4:3000/grabPhotos',
            method: "POST",
            data: data
          })
            .then(function (response) {
                console.log(response.data);
                $http({
                  url: '192.168.1.4:3000/imageDownloader',
                  method: "POST",
                  data: {imageUrls: response.data, userId: data.placeId}
                }).then(function (response1) {
                    // success
                    $http({
                      url: '192.168.1.4:3000/stichVideo',
                      method: "POST",
                      data: {images: response.data, userId: data.placeId}
                    }).then(function (response2) {

                        $ionicModal.fromTemplateUrl('my-modal2.html', {
                          scope: $scope,
                          animation: 'slide-in-up'
                        }).then(function (modal) {
                          $scope.modal = modal;

                        });
                        $scope.openModal = function () {
                          $scope.modal.show();
                          $scope.video = {};
                          $scope.video.url = 'http://192.168.1.4:3000/streamVideo';
                        };
                        $scope.closeModal = function () {
                          $scope.modal.hide();
                        };
                        // Cleanup the modal when we're done with it!
                        $scope.$on('$destroy', function () {
                          $scope.modal.remove();
                        });
                        // Execute action on hide modal
                        $scope.$on('modal.hidden', function () {
                          // Execute action
                        });
                        // Execute action on remove modal
                        $scope.$on('modal.removed', function () {
                          // Execute action
                        });
                        // success
                        // 'http://192.168.1.3:3000/streamVideo'
                        $scope.openModal();
                      },
                      function (response) { // optional
                        // failed
                      });
                  },
                  function (response) { // optional
                    // failed
                  });
              },
              function (response) { // optional
                // failed
              });
        };


        $scope.places = [{
          geometry: {
            location: {
              lat: 13.1928081,
              lng: 80.27530809999999
            },
            viewport: {
              northeast: {
                lat: 13.1941570802915,
                lng: 80.2766570802915
              },
              southwest: {
                lat: 13.1914591197085,
                lng: 80.27395911970848
              }
            }
          },
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
          id: "278f7a6f7f0a10bc30ad9a5a381e7d6acad4b5e5",
          name: "Kananga Durga Amman Kovil",
          place_id: "ChIJjcmx8qB6UjoRxJSI31eTAUw",
          reference: "CmRRAAAAnYweerWnjaMiZT0blZBcQTg7RH-5xu1SLVckiSZMfRdSkUiUbIBmTySg4j9s18gz9teK_IN-umARb0ZDX6vlS19gMVt3EEvJpEgMvFUxmbMbr7Kz9hfbS90szmcfEqOaEhDmJ9YIshIq5aPBW_b4k-xLGhQ619erX3SJCN-QmE3ZWrDGSbIEyA",
          scope: "GOOGLE",
          types: [
            "hindu_temple",
            "place_of_worship",
            "point_of_interest",
            "establishment"
          ],
          vicinity: "Dwaraka Nagar, Manali New Town, Manali, Chennai"
        },
          {
            geometry: {
              location: {
                lat: 13.1833673,
                lng: 80.28480189999999
              },
              viewport: {
                northeast: {
                  lat: 13.1847162802915,
                  lng: 80.28615088029149
                },
                southwest: {
                  lat: 13.1820183197085,
                  lng: 80.28345291970848
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "2f2e976c19ab632d43aff968d8ef95597f6fa0d1",
            name: "Angal Aman Mandir",
            place_id: "ChIJN1ziDgVwUjoR5zs_Og45aao",
            rating: 5,
            reference: "CmRSAAAAoYcJh03HF5vUm5cHJ6_m2ac5eKJIXaAv09fAC8v8_YzVao9X0DM424_WvmvH0bJlKHpXUeSJh3xhynwIONmc2g4nGh0kbLkFzJFCUEwM62cN8Vmm_yrqFaATXIDxNPJvEhBKKrEW_JpebM7gHUedmHMZGhQsyhrCI3SDDPHpeA_G6Bgze9mxBw",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Burma Nagar, Manali New Town, Manali, Chennai"
          },
          {
            geometry: {
              location: {
                lat: 13.193566,
                lng: 80.2615616
              },
              viewport: {
                northeast: {
                  lat: 13.1949149802915,
                  lng: 80.2629105802915
                },
                southwest: {
                  lat: 13.1922170197085,
                  lng: 80.2602126197085
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "527bf3e90d7ee68b1d91af7ceff969e1dc2cfe96",
            name: "Perumal Kovil",
            place_id: "ChIJKcCht716UjoR2VN6zzWmkVk",
            reference: "CmRRAAAAddVUyD0nTRqE_junXpNm7n-ffFtMaxko6ahpEoYC5xOljjywSO73JUlO0woMhBBvFNYhDc8ju_6Ccpz7kbBEGRak_6UuOtYDSLYLkEX8w4XgrFgiqTVg7qc6ZKcOAnxwEhAbgSmJw7DqOdtIIPKk2N9OGhR8fBzPW0Fk3FkilmWnejxDf8Uq_Q",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Andar Kuppam Village"
          },
          {
            geometry: {
              location: {
                lat: 13.1938989,
                lng: 80.2616675
              },
              viewport: {
                northeast: {
                  lat: 13.1952478802915,
                  lng: 80.2630164802915
                },
                southwest: {
                  lat: 13.1925499197085,
                  lng: 80.26031851970849
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "5ac6923c7f067792515ddc55ed2024c47c4c9dd5",
            name: "Lakshmi Amman Kovil",
            place_id: "ChIJcddsub16UjoRNp_sB2Wh8OA",
            rating: 5,
            reference: "CmRSAAAAd9MDhFa2XoXzwwvD-XaMde1gpcGQswm6F2HkKMCHg6g54W2GvHQCjSTu1rDgi89PL_0ywEwAn5QSWxjQLuUz2mBtC-LAbEJ4diyxP8o1Nn6_Vul9xbm2MXW5m0nQ79gWEhCuQ9xBW6T5zJC60CXqKhntGhTG7N2T6zXVN6ovMX1VL0WHxobAcA",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Andar Kuppam Village"
          },
          {
            geometry: {
              location: {
                lat: 13.1935321,
                lng: 80.2575248
              },
              viewport: {
                northeast: {
                  lat: 13.1948810802915,
                  lng: 80.2588737802915
                },
                southwest: {
                  lat: 13.1921831197085,
                  lng: 80.25617581970849
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "030a76d4c76112ee3313fdd94183fdacc3a9c6e5",
            name: "Vinayakar Mandir",
            place_id: "ChIJz6TwTb56UjoRuzT1-Tkcau8",
            reference: "CmRSAAAA5RsqtNkZ7DF9C1KtvJdQ09WvU06Mhh8wnAEDtGaaEM2VjO5Gx-2zVMVO0suJOwQ40CkUGFIhK82E5AKIz6IDQrkkd7asw4Y9YIyTnnDHDODgCIaHD0LMfSj4-mSY7GsmEhDjcSWOLWFhsFOeRu560poxGhT15iMiz8SbOCAkTREEjckGwFUQEw",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Kamarajapuram, Vichoor"
          },
          {
            geometry: {
              location: {
                lat: 13.1755665,
                lng: 80.28655979999999
              },
              viewport: {
                northeast: {
                  lat: 13.1769154802915,
                  lng: 80.2879087802915
                },
                southwest: {
                  lat: 13.1742175197085,
                  lng: 80.2852108197085
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "74a6e3346169aaac34bba82048691feb32039881",
            name: "Sada Muneesswaran temple",
            photos: [
              {
                height: 3264,
                html_attributions: [
                  "<a href=\"https://maps.google.com/maps/contrib/113976364960967250975/photos\">Sur Ya</a>"
                ],
                photo_reference: "CoQBdwAAAHGk5H3IIr9PFZwNcKHFldvFsaDk1B1deQf83AbRHGl27OxBLKeGZOv8zq4uXMKbcIWIMf7_mIIbnfOkL7-PVtJRp_JGHLp3VeQtTyTS5LziPBJTE1Ltsm-1lu8uwYINynLqM4MEuOebzNLVNxU1dW9npAYEewMjhzGys9TQ0OO2EhCgalyOoVNNmLI6ViiHmKVfGhQZ4C_HhwlmCo2i6PSOkWgHMtnpDw",
                width: 1836
              }
            ],
            place_id: "ChIJZ9fLwQJwUjoRMFfKLv9bK3c",
            rating: 5,
            reference: "CmRRAAAAJbG10tGRGApDOaA137mxVdH5monxlkoOCE431iEZBhDEOzmRVnR8-MMnHdJcheoPjFC-zkUml-bmUmn652MXwfwZi6xhF8J7e9CEgVUuASfwlzycs2LWBSzYuRJZAxp9EhDrrax97k6tVtWO-233P6grGhQnZZA22vT4QNtRtD8bzyXMWaz_XA",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "express Manali Chennai, Tamil Nadu 600068"
          },
          {
            geometry: {
              location: {
                lat: 13.1943925,
                lng: 80.2573317
              },
              viewport: {
                northeast: {
                  lat: 13.1957414802915,
                  lng: 80.2586806802915
                },
                southwest: {
                  lat: 13.1930435197085,
                  lng: 80.2559827197085
                }
              }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/worship_hindu-71.png",
            id: "2ab64dbd20567f3b6bf6636d8a62eb45c42793d7",
            name: "Srikrishna Mandir",
            place_id: "ChIJtQLiNL56UjoRo8aGUIo_buo",
            reference: "CmRSAAAAokwSOe6nstu9rf4GNwombjpRcw8PCey0j8dOmcH0CDrV9StDemKJZsbqHOQ5NAnYSr7yHZngTG-uX4PrytWWn0QsTexv5e7H40iQw61u35uaR4QW8c1ZddcFiBlhVA6HEhAdbhyGrlnQLvLikDfnnT5VGhRoZ3MZfQ3f-qRxU60jA_IxUPsY5Q",
            scope: "GOOGLE",
            types: [
              "hindu_temple",
              "place_of_worship",
              "point_of_interest",
              "establishment"
            ],
            vicinity: "Kamarajapuram, Vichoor"
          }];


        $scope.pickPlace = function (place) {
          console.log(place);
          sessionService.set('place', place);
          $state.go('tabsController.placeInfo');
        };
        //
        // $http.post(url, data, config)
        //   .then(function (data) {
        //     console.log(data);
        //   }, function (error) {
        //     console.log(error);
        //   });
      }])

  .controller('placeInfoCtrl', ['$scope', '$stateParams', 'sessionService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, sessionService) {
      $scope.place = sessionService.get('place');

    }])
  .controller('placeInfoCtrl2', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('tourOperatorsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('agentInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('guidesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('guideInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('emergencyNumbersCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('currencyConverterCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http) {
      $scope.currencyList = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR", "EUR"]
      $scope.currency = {
        "AUD": 0.020148,
        "BGN": 0.028183,
        "BRL": 0.048706,
        "CAD": 0.020556,
        "CHF": 0.015413,
        "CNY": 0.10612,
        "CZK": 0.3895,
        "DKK": 0.10718,
        "GBP": 0.012328,
        "HKD": 0.11971,
        "HRK": 0.1073,
        "HUF": 4.4328,
        "IDR": 205.17,
        "ILS": 0.055987,
        "JPY": 1.7227,
        "KRW": 17.213,
        "MXN": 0.28846,
        "MYR": 0.068178,
        "NOK": 0.13212,
        "NZD": 0.02206,
        "PHP": 0.77321,
        "PLN": 0.060904,
        "RON": 0.065602,
        "RUB": 0.86911,
        "SEK": 0.13736,
        "SGD": 0.021529,
        "THB": 0.52919,
        "TRY": 0.056046,
        "USD": 0.015406,
        "ZAR": 0.2052,
        "EUR": 0.01441
      };
      $scope.curr = {
        source: 0,
        inr: 0,
        sourceCurrency: ''
      }
      $scope.convert = function (flag) {
        console.log($scope.curr.sourceCurrency);
        console.log($scope.currency[$scope.curr.sourceCurrency]);
        console.log($scope.curr.source);
        if (flag) {
          $scope.curr.source = parseFloat($scope.curr.inr) * parseFloat($scope.currency[$scope.curr.sourceCurrency]);
        } else {
          $scope.curr.inr = parseFloat($scope.curr.source) / parseFloat($scope.currency[$scope.curr.sourceCurrency]);
        }


        console.log($scope.curr);
      }

    }])

  .controller('weatherUpdatesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {


    }])

  .controller('embassyCtrl', ['$scope', '$stateParams', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope) {
      $rootScope.colors = ['Adventure', 'Divine', 'Ancient', 'Entertainment', 'Shopping', 'Wildlife', 'lab1'];
      $scope.embassyList = [
        {
          "country": "Afganistan",
          "phoneNo": " +91-11-2688 3602",
          "alternatePhoneNo": "2410 0412",
          "fax": "+91-11-2687 5439",
          "Address": "5/50-F Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Algeria",
          "phoneNo": "+91-11-2614 6706",
          "alternatePhoneNo": "2614 7036",
          "fax": "+91-11-2614 7033",
          "Address": "E-120, First floor, Malcha Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Angola",
          "phoneNo": "91-11-26146197",
          "alternatePhoneNo": "2614  6195",
          "fax": "91-11-26146190",
          "Address": "5 Poorvi Marg, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "Armenia",
          "phoneNo": "91-11-2410 2851",
          "alternatePhoneNo": "2410 2852",
          "fax": "91-11-24102853",
          "Address": "D-133, Anand Niketan, New Delhi-110057"
        },
        {
          "country": "Australia",
          "phoneNo": "91-11-4139 9900",
          "alternatePhoneNo": "4122 1000",
          "fax": "91-11-41494379",
          "Address": "1/50-G, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Argentina",
          "phoneNo": "91-11- 4166 1988",
          "alternatePhoneNo": " 4166 1988",
          "fax": "91-11- 4166 1988",
          "Address": "A-2/6, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "Austria",
          "phoneNo": "91-11-26889050",
          "alternatePhoneNo": "2688 9049",
          "fax": " 91-11-2688 6929",
          "Address": "EP 13, Chandergupta Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Azerbaijan",
          "phoneNo": "91-11-2341 1001",
          "alternatePhoneNo": "2370 9000",
          "fax": "91-11-2341 2233",
          "Address": "E-70, Vasant Marg, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "Bangladesh",
          "phoneNo": "91-11-2412 1389",
          "alternatePhoneNo": "2412 1394",
          "fax": "91-11- 2687 8953",
          "Address": "EP-39, Dr.Radhakrishana Marg, Chanakyapuri, New Delhi-110024"
        },
        {
          "country": "Belgium",
          "phoneNo": "91-11-42428000",
          "alternatePhoneNo": "4242 8000",
          "fax": "91-11-42428002",
          "Address": "50 N, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Bhutan",
          "phoneNo": "91-11-2688 9807",
          "alternatePhoneNo": "2688 9809",
          "fax": "91-11-2687 6710",
          "Address": "Chandra Gupta Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Brazil",
          "phoneNo": "91-11-2301 7301",
          "alternatePhoneNo": "2301 7301",
          "fax": "91-11-2379 3684",
          "Address": "8, Aurangzeb Road, New Delhi"
        },
        {
          "country": "Bulgaria",
          "phoneNo": "91-11-2611 5549",
          "alternatePhoneNo": "2611 5551",
          "fax": "91-11-2687 6190",
          "Address": "EP 16/17, Chandragupta Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Cambodia",
          "phoneNo": "91-11-2649 5092",
          "alternatePhoneNo": "2649 5092",
          "fax": "91-11-2649 5093",
          "Address": "N 14, Panchsheel Park, New Delhi-110017"
        },
        {
          "country": "Canada",
          "phoneNo": "91-11-5178 2000",
          "alternatePhoneNo": "5178 2000",
          "fax": "91-11-5178 2020",
          "Address": "7/8, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Chile",
          "phoneNo": "91-11-2461 7123",
          "alternatePhoneNo": " 2461 7165",
          "fax": "91-11-2461 7102",
          "Address": "146, Jor Bagh, New Delhi-110003"
        },
        {
          "country": "China",
          "phoneNo": "91-11-2611-2345",
          "alternatePhoneNo": "2611 2345",
          "fax": "91-11-2688 5486",
          "Address": "50 D, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Colombia",
          "phoneNo": "91-11-51662103",
          "alternatePhoneNo": "5166 2105",
          "fax": "91-11-51662108",
          "Address": "3 Palam Marg, First Floor, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "Congo",
          "phoneNo": "91-11-5166 0976",
          "alternatePhoneNo": "5166 0976",
          "fax": "91-11- 51663152",
          "Address": "B-2/6, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "Croatia",
          "phoneNo": "91-11- 5166 3101",
          "alternatePhoneNo": " 5166 3102",
          "fax": "91-11-2687-6873",
          "Address": "A-15, West End, New Delhi-110021"
        },
        {
          "country": "Cuba",
          "phoneNo": "91-11-2622 2467",
          "alternatePhoneNo": "2622 2468",
          "fax": "91-11-2622 2469",
          "Address": "W-124 A, Greater Kailash Part I, New Delhi-110048"
        },
        {
          "country": "Czech Republic",
          "phoneNo": "91-11-2611 0205",
          "alternatePhoneNo": "2611 0318",
          "fax": "91-11-2688 6221",
          "Address": "50 M, Niti Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Denmark",
          "phoneNo": "91-11-42090700",
          "alternatePhoneNo": "4209 0700",
          "fax": "91-11-2379 2019",
          "Address": "11, Aurangzeb Road, New Delhi-110011"
        },
        {
          "country": "Domnican Republic",
          "phoneNo": "91-11-43425000",
          "alternatePhoneNo": "4342 5000 ",
          "fax": "91-11-43425050",
          "Address": "C-25, Ground Floor, Anand Niketan, New Delhi-110021"
        },
        {
          "country": "Egypt",
          "phoneNo": "91-11- 2614 6336",
          "alternatePhoneNo": "2614 6336",
          "fax": "91-11- 2614 6337",
          "Address": "C-7/9, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "Ethopia",
          "phoneNo": "91-11-2611 9513",
          "alternatePhoneNo": "2611 9514",
          "fax": "91-11-2687 5731",
          "Address": "7/50-G, Satya Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Finland",
          "phoneNo": "91-11-2419 6100",
          "alternatePhoneNo": "2419 6100",
          "fax": "91-11-2419 6119",
          "Address": "2/50 E, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Georgia",
          "phoneNo": "91-11-4707 8602",
          "alternatePhoneNo": "4707 8602",
          "fax": "91-11-4707 8603",
          "Address": "115 Jorbagh, New Delhi"
        },
        {
          "country": "Germany",
          "phoneNo": "91-11-2687 1831",
          "alternatePhoneNo": "2687 1831",
          "fax": "91-11-2687 3117",
          "Address": "No 6/50G, Shanti Path, Chanakya Puri, New Delhi -110021"
        },
        {
          "country": "Greece",
          "phoneNo": "91-11-2688 0700",
          "alternatePhoneNo": "2688 0700",
          "fax": "91-11-2688 8010",
          "Address": "EP 32, Dr. S Radhakrishnan Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Hungary",
          "phoneNo": "91-11-2611 4737",
          "alternatePhoneNo": "2611 4738",
          "fax": "91-11-2688 6742",
          "Address": "2/50 M, Niti Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Indonesia",
          "phoneNo": "91-11-2611 8642",
          "alternatePhoneNo": "2611 8643",
          "fax": "91-11-2687 4402",
          "Address": "50 A, Chanakyapuri, Kautilaya Marg, New Delhi-110021"
        },
        {
          "country": "Iran",
          "phoneNo": "91-11-2332 9600",
          "alternatePhoneNo": "2332 9601",
          "fax": "91-11-2332 5493",
          "Address": "5, Barakhamba Road, New Delhi-110001"
        },
        {
          "country": "Iraq",
          "phoneNo": "91-11-2614 9085",
          "alternatePhoneNo": "2614 9034",
          "fax": "91-11-2614 9076",
          "Address": "B-5/8 Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "Ireland",
          "phoneNo": "91-11-2462 6733",
          "alternatePhoneNo": "2462 6741",
          "fax": "91-11-2469 7053",
          "Address": "230, Jor Bagh, New Delhi-110003"
        },
        {
          "country": "Israel",
          "phoneNo": "91-11-2301 3238",
          "alternatePhoneNo": "2301 3238",
          "fax": "91-11-3041 4555",
          "Address": "3, Aurangzeb Road, New Delhi-110011"
        },
        {
          "country": "Italy",
          "phoneNo": "91-11-2611 4355",
          "alternatePhoneNo": "2611 4359",
          "fax": "91-11-2687 3889",
          "Address": "50 E, Chandragupta Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Japan",
          "phoneNo": "91-11-2687 6564",
          "alternatePhoneNo": "2687 6581",
          "fax": "91-11-2688 5587",
          "Address": "50 G, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Korea",
          "phoneNo": "91-11-2688 5412",
          "alternatePhoneNo": "2688 5419",
          "fax": "91-11-2688 4840",
          "Address": "9, Chandragupta Marg, Chanakyapuri Extension, New Delhi-110021"
        },
        {
          "country": "Kuwait",
          "phoneNo": "91-11-2410 0791",
          "alternatePhoneNo": "2410 0791",
          "fax": "91-11-2687 3516",
          "Address": "5 A, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Malaysia",
          "phoneNo": "91-11-2611 1291",
          "alternatePhoneNo": "2611 1292",
          "fax": "91-11-2688 1538",
          "Address": "50 M, Satya Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Maldives",
          "phoneNo": "91-11-5143 5701",
          "alternatePhoneNo": "5143 5708",
          "fax": "91-11-5143 5709",
          "Address": "2E-45, Greater Kailash II, New Delhi-110048"
        },
        {
          "country": "Mauritius",
          "phoneNo": "91-11-2410 2161",
          "alternatePhoneNo": "2410 2161",
          "fax": "91-11-2410 2194",
          "Address": "EP 41, Jesus &amp; Mary Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Mexico",
          "phoneNo": "91-11-2410 7182",
          "alternatePhoneNo": "2410 7183",
          "fax": "91-11-2463 3240",
          "Address": "26 D, Sardar Patel Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Morroco",
          "phoneNo": "91-11-2435 5579",
          "alternatePhoneNo": "4031 1100",
          "fax": "91-11-2435 5579",
          "Address": "46, Sunder Nagar, New Delhi-110003"
        },
        {
          "country": "Mynmar",
          "phoneNo": "91-11-2467 8822",
          "alternatePhoneNo": "2467 8822",
          "fax": "91-11-2467 8824",
          "Address": "3/50F, Nyaya Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Nepal",
          "phoneNo": "91-11-2332 9969",
          "alternatePhoneNo": "2332 9218",
          "fax": "91-11-2332 6857",
          "Address": "Barakhamba Road, New Delhi-110001"
        },
        {
          "country": "Netherlands",
          "phoneNo": "91-11-24197600",
          "alternatePhoneNo": "2419 7600",
          "fax": "91-11-24197710",
          "Address": "6/50 F, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "New zeland",
          "phoneNo": "91-11-2688 3170",
          "alternatePhoneNo": "2688 3170",
          "fax": "91-11-2688 3165",
          "Address": "Sir Edmund Hillary Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Nigeria",
          "phoneNo": "91-11-24122138",
          "alternatePhoneNo": "2412 2138",
          "fax": "91-11-2410 7185",
          "Address": "EP-4, Chandragupta Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Norway",
          "phoneNo": "91-11- 5177 9200",
          "alternatePhoneNo": "5177 9200",
          "fax": "91-11-5168 0145",
          "Address": "Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Pakistan",
          "phoneNo": "91-11-2611 0601",
          "alternatePhoneNo": "2611 0603",
          "fax": "91-11-2687 2339",
          "Address": "2/50 G, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Poland",
          "phoneNo": "91-11-5149 6900",
          "alternatePhoneNo": " 2467 9161",
          "fax": "91-11-2687 1914",
          "Address": "250 M, Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Portugal",
          "phoneNo": "91-11-2614 2215",
          "alternatePhoneNo": "2614 2212",
          "fax": "91-11-2615 2837",
          "Address": "8, Olof Palme Marg, New Delhi-110057"
        },
        {
          "country": "Qatar",
          "phoneNo": "91-11-2611 7988",
          "alternatePhoneNo": "2611 8787",
          "fax": "91-11-2688 6080",
          "Address": "2EP 31 A, Chandragupta Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Russia",
          "phoneNo": "91-11-2687 3799",
          "alternatePhoneNo": "2687 3800",
          "fax": "91-11-2687 6823",
          "Address": "Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Saudi Arabia",
          "phoneNo": "91-11-2614 4102",
          "alternatePhoneNo": "2614 4073",
          "fax": "91-11- 2614 4244",
          "Address": "2, Paschimi Marg, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "South Africa",
          "phoneNo": "91-11-2614 9411",
          "alternatePhoneNo": "2614 9419",
          "fax": "91-11-2614 3605",
          "Address": "B 18, Vasant Marg, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "Sri Lanka",
          "phoneNo": "91-11-2301 0201",
          "alternatePhoneNo": "2301 0202",
          "fax": "91-11-2379 3604",
          "Address": "27, Kautilya Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Sweden",
          "phoneNo": "91-11-2419 7100",
          "alternatePhoneNo": "2419 7100",
          "fax": "91-11-2688 5401",
          "Address": "Nyaya Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Switzerland",
          "phoneNo": "91-11-2687 8534",
          "alternatePhoneNo": "2687 8372",
          "fax": "91-11-2687 3093",
          "Address": "Nyaya Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Turkey",
          "phoneNo": "91-11-2410 1921",
          "alternatePhoneNo": "2688 9053",
          "fax": "91-11-2688 1409",
          "Address": "N 50, Nyaya Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Uganda",
          "phoneNo": "91-11-2614 5817",
          "alternatePhoneNo": "2614 4413",
          "fax": "91-11-2614 4405",
          "Address": "B 3/26, Vasant Vihar, New Delhi-110057"
        },
        {
          "country": "UAE",
          "phoneNo": "91-11-2467 0830",
          "alternatePhoneNo": "2467 0945",
          "fax": "91-11-2687 3272",
          "Address": "5EP 12, Chandragupta Marg, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "United Kingdon",
          "phoneNo": "91-11-2687 2161",
          "alternatePhoneNo": "2687 2161",
          "fax": "91-11-2687 0068",
          "Address": "Shantipath, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "USA",
          "phoneNo": "91-11-2419 8000",
          "alternatePhoneNo": "2419 8000",
          "fax": "91-11- 24190017",
          "Address": "American Embassy, Chanakyapuri, New Delhi-110021"
        },
        {
          "country": "Vietnam",
          "phoneNo": "91-11-2301 2133",
          "alternatePhoneNo": "2301 9818",
          "fax": "91-11-2301 7714",
          "Address": "17, Kautilya Marg, Chankyapuri, New Delhi-110021\n"
        },
        {
          "country": "Yemen",
          "phoneNo": "91 11 4270-5723",
          "alternatePhoneNo": "4270 5723",
          "fax": "91-11-42705725",
          "Address": "D-2/5 Vasant Vihar, New Delhi-110057\n"
        }
      ];
    }])

  .controller('AppCtrl', function ($scope, $ionicModal, sessionService, $rootScope) {
    $scope.submit = false;
    $rootScope.colors = ['Adventure', 'Divine', 'Ancient', 'Entertainment', 'Shopping', 'Wildlife', 'lab1'];
    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;

    });
    $scope.openModal = function () {
      $scope.modal.show();
      var input = document.getElementById('autoCompleteTextBox');
      console.log(input);
      var autocomplete = new google.maps.places.Autocomplete(input);
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        //document.getElementById('autoComplete').value = place.name;
        //console.writeln()
        sessionService.lat = place.geometry.location.lat();
        sessionService.lng = place.geometry.location.lng();
        $scope.submit = true;
        $scope.$apply();
      });

    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
      // Execute action
    });

  })
;
