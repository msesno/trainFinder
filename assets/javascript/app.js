// TRAIN SCHEDULE APP

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDzc2AxPrNyYgF3pTmGBBCgpzvPblbFhIk",
    authDomain: "trainscheduler-a4abc.firebaseapp.com",
    databaseURL: "https://trainscheduler-a4abc.firebaseio.com",
    projectId: "trainscheduler-a4abc",
    storageBucket: "trainscheduler-a4abc.appspot.com",
    messagingSenderId: "52962556781"
  };
  firebase.initializeApp(config);




// Assign the reference to the database to a variable named 'database'
var database = firebase.database();




// Global Variables
var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
var nextArrival = "";
var minutesAway = "";






// jQuery global variables
var elTrain = $("#train-name");
var elTrainDestination = $("#train-destination");






// form validation for Time using jQuery Mask plugin
var elTrainTime = $("#train-time").mask("00:00");
var elTimeFreq = $("#time-freq").mask("00");







database.ref("/trains").on("child_added", function(snapshot) {

    //  create local variables to store the data from firebase
    var trainDiff = 0;
    var trainRemainder = 0;
    var minutesTillArrival = "";
    var nextTrainTime = "";
    var frequency = snapshot.val().frequency;

    

    // compute the difference in time from 'now' and the first train using UNIX timestamp, store in var and convert to minutes
    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

    // get the remainder of time by using 'moderator' with the frequency & time difference, store in var
    trainRemainder = trainDiff % frequency;

    // subtract the remainder from the frequency, store in var
    minutesTillArrival = frequency - trainRemainder;

    // add minutesTillArrival to now, to find next train & convert to standard time format
    nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");

    // append to our table of trains, inside tbody, with a new row of the train data
    $("#table-data").prepend(
        "<tr><td><p>" + snapshot.val().name + "</p></td>" +
        "<td><p>" + snapshot.val().destination + "</p></td>" +
        "<td><p>" + frequency + "</p></td>" +
        "<td><p>" + minutesTillArrival + "</p></td>" +
        "<td><p>" + nextTrainTime + "</p></td></tr>"
    );

});

// function to call the button event, and store the values in the input form
var storeInputs = function(event) {
    // prevent from from reseting
    event.preventDefault();

    // get & store input values
    trainName = elTrain.val().trim();
    trainDestination = elTrainDestination.val().trim();
    trainTime = moment(elTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");
    trainFrequency = elTimeFreq.val().trim();

    // add to firebase databse
    database.ref("/trains").push({
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        date_added: firebase.database.ServerValue.TIMESTAMP
    });

    //  log that train was added
    console.log("a train was added");

    //  empty form once submitted
    elTrain.val("");
    elTrainDestination.val("");
    elTrainTime.val("");
    elTimeFreq.val("");
};

// Calls storeInputs function if submit button clicked
$("#btn-add").on("click", function(event) {
    // form validation - if empty - alert
    if (elTrain.val().length === 0 || elTrainDestination.val().length === 0 || elTrainTime.val().length === 0 || elTimeFreq === 0) {
        alert("Please Fill All Required Fields");
    } else {
        // if form is filled out, run function
        storeInputs(event);
    }
});

