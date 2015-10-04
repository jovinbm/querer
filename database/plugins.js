var fileName = 'plugins.js';

var Promise = require('bluebird');
var rq = require('../rq.js');

var receivedLogger = function (module) {
    rq.receivedLogger(module, fileName);
};

var successLogger = function (module, text) {
    return rq.successLogger(module, fileName, text);
};

var errorLogger = function (module, text, err) {
    return rq.errorLogger(module, fileName, text, err);
};

function calculateTrendingMeter(thePost) {
    //get the number of visits array

    var visits = [];
    thePost.numberOfVisitsArray.forEach(function (obj) {
        visits.push(obj.visits);
    });

    //find the median
    var median = visits[Math.floor(visits.length / 2)];

    var deviations = visits.map(function (num) {
        return num - median;
    });

    var meter = 0;
    deviations.forEach(function (deviation) {
        meter = meter + deviation;
    });

    return meter;
}

function getUpdatedNumberOfVisitsArray(thePost) {
    //all times in milliseconds

    var timeInterval = 21600 * 1000; //1/4 of a day seconds in milliseconds
    //var timeInterval = 3 * 1000; //1/4 of a day seconds in milliseconds
    var arrayLengthLimit = 50;
    //var arrayLengthLimit = 6;

    var currentTime = new Date().getTime();

    var currentArray = thePost.numberOfVisitsArray;

    if (currentArray.length > 0) {

        if (currentTime - currentArray[currentArray.length - 1].startTime > timeInterval) {
            currentArray.push({
                visits: 1,
                startTime: new Date().getTime()
            });
        } else {
            currentArray[currentArray.length - 1].visits++; //last element in the array
        }
    } else {
        currentArray.push({
            visits: 1,
            startTime: new Date().getTime()
        });
    }

    //then limit the array size
    if (currentArray.length > arrayLengthLimit) {
        var numOfElementsToRemove = currentArray.length - arrayLengthLimit;
        currentArray.splice(0, numOfElementsToRemove);
    }

    return currentArray;
}

module.exports = {

    updatePostDynamicMeta: function (thePost, postIndex, postUniqueCuid, updateOperation) {

        var Post = rq.Post();

        var toBeUpdatedDates = {
            "lastRetrievedAt": true
        };

        if (updateOperation) {
            toBeUpdatedDates.updatedAt = true;
        }

        //*******put trending meter update policy here also, not to update after a week or so has passed

        return Promise.resolve()
            .then(function () {
                return rq.catchEmptyArgs([thePost, (postIndex || postUniqueCuid)])
            })
            .then(function () {
                if (!thePost || !(postIndex || postUniqueCuid)) {
                    throw {
                        err: new Error(errorLogger(module, 'Some required args are undefined')),
                        code: 500
                    };
                }
            })
            .then(function () {
                return Post.update({
                        $or: [{
                            postIndex: postIndex
                        }, {
                            postUniqueCuid: postUniqueCuid
                        }]
                    },
                    {
                        $inc: {
                            numberOfVisits: 1,
                            trendingMeter: calculateTrendingMeter(thePost)
                        },

                        $currentDate: toBeUpdatedDates,

                        numberOfVisitsArray: getUpdatedNumberOfVisitsArray(thePost)
                    })
                    .execAsync()
                    .catch(function (err) {
                        throw {
                            err: new Error(errorLogger(module, err)),
                            code: 500
                        };
                    });
            })
            .then(function () {
                return true;
            });
    }
};