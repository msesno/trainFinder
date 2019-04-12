


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


// FirebaseUI config.

        var uiConfig = {
            signInSuccessUrl: 'trainscheduler.html',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        };

         // Initialize the FirebaseUI Widget using Firebase. 
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
