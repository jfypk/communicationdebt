var searchArray = [];
var myId;
var theirId;
var searchId;
var friendId;

window.fbAsyncInit = function() {
    FB.init({
        appId: '1784861021768045',
        xfbml: true,
        status: true,
        version: 'v2.8'
    });

    FB.AppEvents.logPageView();

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log('Logged in.');
        } else {
            FB.login(function() {
                //paste here
                FB.api(
                    "/me/friends/10152238576307623",
                    function(response) {
                        if (response && !response.error) {
                            console.log(response);
                        }
                    }
                );
                //end here
            }, { scope: 'user_friends' });
        }
    });
};

//myId = 10207777966027280



(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//search graph for friend name matches, add to array
//find name who is friends with me, if friend is found, add to friendId
//get picture of friendId

//GRAB MY ID
// 

//GET PICTURE WITH THIS CODE
// FB.api(
//     '/user_id/',
//     'GET', { "fields": "picture.type(large)" },
//     function(response) {
//         // Insert your code here
//         console.log(response.picture.data.url); //photo
//     }
// );

//HOW DO I SEARCH THE GRAPH TO GET USERID
// var urlCall = "/search?q=BryanYeh&type=user";
// FB.api(urlCall, function(response) {
//     //you code to execute  
//     searchArray = response.data;
//     console.log(searchArray);
// });



//CODE TO SEARCH GRAPH
// GET graph.facebook.com
//   /search?
//     q={your-query}&
//     type={object-type}

//GET NAME AND USER ID
// FB.api(
//     '/me/friends',
//     'GET', {},
//     function(response) {
//         // Insert your code here
//         console.log(response);
//     }
// );


// FB.api(
//                     '/me/friends',
//                     'GET', { "fields": "first_name,last_name,website"},
//                     function(response) {
//                         console.log(response.data);
//                     }
//                 );

//-- -- --
// //search graph for friend name matches, add to array
// var urlCall = "/search?q=BryanYeh&type=user"; //edit for name
// FB.api(urlCall, function(response) {
// //you code to execute  
// searchArray = response.data;

// //find name who is friends with me. 

// for (var i = 0; i < searchArray.length; i++) {
//     //check if friends with me.
//     FB.api(
//         "/me/friends/" + theirId,
//         function(response) {
//             if (response && !response.error) {
//                 /* handle the result */
//             }
//         }
//     );
// }
// });

// });
