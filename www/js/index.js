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
    current_dirEntry: null,
    current_fileEntry: null,
    current_VMIdirEntry : null,
    thingstowrite: null,
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
    },

    onFSError: function (evt) {
        console.log(evt.error.code);
    },
    createUser: function (UserInfo) {
        app.current_userinfo = UserInfo;
        app.fs.root.getDirectory(UserInfo.id, {create: true, exclusive: false}, app.createUserSuccess, app.createUserFail);
        //fileSystem.root.getFile
    },
    createUserSuccess: function (dirEntry) {
        // body...
        app.current_dirEntry =dirEntry;
        console.log("folder create success");
        dirEntry.getFile("UserInfo.txt", {create: true, exclusive: true}, app.UserInfoFile);
    },

    createUserFail: function (error) {
        // body...
        console.log("folder create Fail");
    },
    UserInfoFile: function  (fileEntry) {
        app.current_fileEntry = fileEntry;
        fileEntry.createWriter(app.gotUserInfoFileWriter, app.onFSError);
    },
    gotUserInfoFileWriter: function (writer) {
        writer.onwriteend = function(evt) {
            console.log('finished writing');
        };
        writer.write("id :" +app.current_userinfo.id+"\nsex :" +app.current_userinfo.sex+"\nbirth :" +app.current_userinfo.birth+"\ngrade :" +app.current_userinfo.grade+"\nplace :" +app.current_userinfo.place);

    },
    CreateFile: function (name) {
       app.current_dirEntry.getFile(name+".csv", {create: true, exclusive: true}, app.FileToWrite);
    },
    CreateFolder: function (name) {
       app.current_dirEntry.getDirectory(name, {create: true, exclusive: false}, app.createVMISuccess, app.createUserFail);
    },
    FileToWrite: function  (fileEntry) {
        app.current_fileEntry = fileEntry;
        // fileEntry.createWriter(app.gotUserInfoFileWriter, app.onFSError);
    },
    WriteFile: function () {
        app.current_fileEntry.createWriter(app.WritingFileNow, app.onFSError);
    },
    WritingFileNow:function (writer) {
        writer.onwriteend = function(evt) {
            console.log('finished writing');
        };
        writer.seek(writer.length);
        writer.write(app.thingstowrite);
    },
    createVMISuccess: function  (dirEntry) {
        app.current_VMIdirEntry = dirEntry;
    },
    saveVMIImg: function (number) {
        var fileTransfer = new FileTransfer();
        fileTransfer.download(
            app.thingstowrite,
            app.fs.root.toURI()+'/'+app.current_userinfo.id+"/VMI/"+number+".tiff",
            function(theFile) {
                console.log("download complete: " + theFile.toURI());
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code: " + error.code);
            }
        );
    }
};
app.initialize();