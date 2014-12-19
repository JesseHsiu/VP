/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var width = screen.width;
// var height = screen.height;

// console.log(width);
// console.log(height);

// $("#btn_submit").on("tap",function(){
//   window.location.href='test.html';
// });
// $(".Intro_option").each(function () {
//     var option = this;
//     option.addEventListener("tap", function() {
//         console.log("hello");
//     });
// });​


// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
//     console.log("index.js");
//     StatusBar.hide();
//     screen.lockOrientation('landscape');
//     // Now safe to use device APIs
//     document.getElementById("VP_1_intro_wrong").style.display="none";

    

    
// }

        // $(".Intro_option").each(function () {
        //     var option = this;
        //     option.addEventListener("tap", function() {
        //         console.log("hello");
        //     });
        // });​
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("index.js");
        window.plugins.directoryList.getList("www/img",onDirectoryReadSuccess,onDirectoryReadError);
        StatusBar.hide();
        screen.lockOrientation('landscape');
        FastClick.attach(document.body);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log(id);
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
        
    }
};
app.initialize();

function onDirectoryReadSuccess(directoryList) {
    for (var entry in directoryList) {
        if( directoryList.hasOwnProperty( entry ) ) {
          console.log(directoryList[entry].name);
        } 
    }
}

// onError Callback if directory does not exists or it is empty
//
function onDirectoryReadError(error) {
    alert('Directory Read error \n' +
          'message: ' + error);
}
