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

// document.addEventListener("deviceready", onDeviceReady_File, false); 

var app = {

    fs: null,
    current_userinfo: null,
    // fileName : "",
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
        StatusBar.hide();
        screen.lockOrientation('landscape');
        FastClick.attach(document.body);
        
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, app.onFSSuccess, app.onFSError);
        console.log(cordova.file.dataDirectory);
        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);

        $.mobile.pageContainer.pagecontainer('change', "register.html");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log(id);
    },

    onFSSuccess: function (fileSystem) {
        console.log("fileSystem existed now");
        app.fs = fileSystem;
        //fileSystem.root.getDirectory("haha", {create: true, exclusive: false}, app.createUserSuccess, app.createUserFail);
    },

    onFSError: function (evt) {
        console.log(evt.error.code);
    },
    createUser: function (UserInfo) {
        current_userinfo = UserInfo;
        app.fs.root.getDirectory(UserInfo.id, {create: true, exclusive: false}, app.createUserSuccess, app.createUserFail);
        //fileSystem.root.getFile
    },
    createUserSuccess: function (parent) {
        // body...
        console.log("folder create success");
    },

    createUserFail: function (error) {
        // body...
        console.log("folder create Fail");
    }



};
app.initialize();

// function onDeviceReady_File () {
//     window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onFSError);
// };

// function onFSSuccess (fileSystem) {
//     console.log("fileSystem existed now");
//     fileSystem.root.getDirectory(cordova.file.applicationStorageDirectory+"haha/", {create: true, exclusive: false}, createUserSuccess, createUserFail);
// };

// function onFSError (evt) {
//     // body...
//     console.log("on error");
// };

// function createUserSuccess (parent) {
//     console.log("folder create success");
// };
// function createUserFail (error) {
//     console.log("folder create Fail");
// }