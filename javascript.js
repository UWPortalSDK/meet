/*
function test() {
    var x = document.getElementById("search").value;
    //alert(x);
    document.getElementById("search").value = "";
    document.getElementById("info").innerHTML = x;
}
*/

function convertToNum(time) {
    var colonIndex = time.indexOf(":");
    return parseInt(time.substring(0, colonIndex)) * 60 + parseInt(time.substring(colonIndex + 1));
}

function convertToTime(num) {
    min = num % 60;
    hr = Math.floor(num / 60);
    
    if (min < 10) {
        return hr.toString() + ":0" + min.toString();
    } else {
        return hr.toString() + ":" + min.toString();
    }
}

function createBusyList(schedule) {
    dayMinute = 1440;
    busyList = Array.apply(null, Array(dayMinute)).map(Number.prototype.valueOf, 0);

    for (var i = 0; i < schedule.length; i++) {
        for (var j = convertToNum(schedule[i][0]); j <= convertToNum(schedule[i][1]); j++) {
            busyList[j] = 1;
        }
    }

    return busyList;
}

function compareBusyList(listOfBusyLists) {
    busyList = Array.apply(null, Array(dayMinute)).map(Number.prototype.valueOf, 0);
    dayMinute = 1440;
    i = 0;

    while (i < dayMinute) {
        done = false;
         j = 0;
        while (!done && j < listOfBusyLists.length) {
            if (listOfBusyLists[j][i] == 1) {
                done = true;
                busyList[i] = 1;
            } else {
                j++;
            }
        }
        
        i++;
    }

    return busyList;
}

function busyTimes(busyList) {
    busyListBoundaries = [];
    index = -1;
    done = false;
    stopper = 0;

    while (!done) {
        index = busyList.indexOf(0, index + 1);
        console.log(index);
        if (index == -1) {
            done = true;
        } else {
            startBound = index;
            index = busyList.indexOf(1, index + 1) - 1;
            if (index == -1) {
            	index = busyList.length - 1; // last of list
                done = true;
            }
            console.log(index);
            busyListBoundaries.push([convertToTime(startBound), convertToTime(index)]);
        }
        
        //temp infinite loop stopper
        if (stopper > 1000) {
            break;
        } else {
            stopper++;
        }  
    }
            
    return busyListBoundaries;
}

    angular.module('portalApp')
        .controller('meetCtrl', ['$scope', function($scope) {
            $scope.inputuser = {
                value: ''
            };
            // mock data
            $scope.model = [];
            $scope.times = [];

            $scope.ready = true;

            // Show main view in the first column as soon as controller loads
            $scope.portalHelpers.showView('meetMain.html', 1);

            // This function gets called when user clicks an item in the list
            $scope.showDetails = function(item) {
                // Make the item that user clicked available to the template
                $scope.detailsItem = item;
                $scope.portalHelpers.showView('meetMain.html', 2);
            }
            
            $scope.showTimeList = function (item) {
       		 	// Show time list view
        		$scope.portalHelpers.showView('listTimes.html', 1)
    		};

            $scope.addToList = function() {
                $scope.model.push({
                    title: $scope.inputuser.value,
                    details: "useradded"
                });
                $scope.inputuser.value = '';
            }

            $scope.remove = function(item) {
                var index = $scope.model.indexOf(item);
                $scope.model.splice(index, 1);
            }
        }]);