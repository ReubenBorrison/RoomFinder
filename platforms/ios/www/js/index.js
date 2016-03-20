 // Defaults to sessionStorage for storing the Facebook token
     // openFB.init({appId: '1686513458277979'});
    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
    //camera code

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value



    
    
    $(document).on("pagecreate","#dashboard",function(){
        
        document.addEventListener("deviceready",onDeviceReady,false);
        function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        console.log(FileTransfer);
       
    }
    });
    // device APIs are available
    //
    function postData()
    {
        var d=new Date();
        var roomId=d.getDate().toString()+d.getMonth().toString()+d.getYear().toString()+d.getHours().toString()+d.getMinutes().toString()+d.getSeconds().toString();
        
        $("img.imgLinks").each(function(){
            fileURL=$(this).attr('src');
        
            function win(r) {
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
            }

            function fail(error) {
                alert("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            }

            var uri = encodeURI("http://reubenz.com/fileUpload.php");

            var options =new FileUploadOptions();
            options.fileKey="file";
            options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var ft = new FileTransfer();
        
            ft.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                  loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                } else {
                  loadingStatus.increment();
                }
            };
            ft.upload(fileURL, uri, win, fail, options);
        });



    

        
        
        
    //     $.ajax({
    //             url: "http://localhost/fileUpload.php", // Url to which the request is send
    //             type: "POST",             // Type of request to be send, called as method
    //             data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
    //             contentType: false,       // The content type used when sending data to the server.
    //             cache: false,             // To unable request pages to be cached
    //             processData:false,        // To send DOMDocument or non processed data file it is set to false
    //             success: function(data)   // A function to be called if request succeeds
    //             {
                    
    //                 $("#message").html(data);
                    
    //             },
    //             error: function(e)
    //             {
    //                 alert(e);
    //             }
    //             });
     }


    function onPhotoURISuccess(imageURI) {
        
      $("#picCollection").prepend("<img src="+imageURI+" height='50px' width='50px' style='display:block;float:left;' class='imgLinks'/>");
     // console.log(imageURI);
    }

    function capturePhoto() {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, saveToPhotoAlbum: 1,
        destinationType: destinationType.FILE_URI});
    }

    function getPhoto(source) {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }

    //place an ad button check
    function loginOrNot()
    {   
        console.log(localStorage.getItem('FBUserID'));
        if(localStorage.getItem('FBUserID')===null)
        {
            window.location="#login";
        }
        else
        {
            window.location="#ad";
        }
    }
    function dataUpload(){
        $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept","application/json; charset=UTF-8");
            xhr.setRequestHeader("Authorization","Basic bmVvNGo6c3JoMTIzNA==");
            xhr.setRequestHeader("Content-Type", "application/json");
        }
    });
     $.ajax({
                url:"http://ec2-52-58-42-113.eu-central-1.compute.amazonaws.com/db/data/cypher",
                //accepts: "application/json; charset=UTF-8",
                type:"POST",
                dataType:"json",
                data: '{ "query" : "match(n{id:{id}}) return n", \
                        "params": {"id":"1117444858289658"}}',
                success:function(data,xhr,status){
                alert(data.data[0][0].data.id);
                 // for(var i in data.data)
                // {
                //       $("#demo").append(data.data[i][0].data.name);
                // }
                
                },
                error:function(xhr,err,msg){
                            console.log(xhr);
                            console.log(err);
                            console.log(msg);
                }
            }); 
                    

      }
    openFB.init({appId: '1686513458277979', tokenStore: window.localStorage});
    function fblogin() {
        openFB.login(
                function(response) {
                    if(response.status === 'connected') {
                                              
                                        
                         getInfo();
                    } else {
                        alert('Facebook login failed: ' + response.error);
                    }
                }, {scope: 'email'});
    }
    function localStorages(id,name){
        localStorage.setItem('FBUserID',id);
        localStorage.setItem('name',name);
        console.log(localStorage.getItem('name'));
    }
    function createUser(id,name){
     $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept","application/json; charset=UTF-8");
            xhr.setRequestHeader("Authorization","Basic bmVvNGo6c3JoMTIzNA==");
            xhr.setRequestHeader("Content-Type", "application/json");
        }
        });
     $.ajax({
                url:"http://ec2-52-58-42-113.eu-central-1.compute.amazonaws.com/db/data/cypher",
                //accepts: "application/json; charset=UTF-8",
                type:"POST",
                dataType:"json",
                data: '{ "query" : "create({name:{name},id:{id}})", \
                        "params": {"name":"'+name+'","id":"'+id+'"}}',
                success:function(data,xhr,status){
                alert("success nodes created");
                // for(var i in data.data)
                // {
                //       $("#demo").append(data.data[i][0].data.name);
                // }
                
                },
                error:function(xhr,err,msg){
                            console.log(xhr);
                            console.log(err);
                            console.log(msg);
                }
            });
                            
    }
    function matchUser(id){
        var returnid;
        $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept","application/json; charset=UTF-8");
            xhr.setRequestHeader("Authorization","Basic bmVvNGo6c3JoMTIzNA==");
            xhr.setRequestHeader("Content-Type", "application/json");
        }
        });
         $.ajax({
                url:"http://ec2-52-58-42-113.eu-central-1.compute.amazonaws.com:7474/db/data/cypher",
                //accepts: "application/json; charset=UTF-8",
                type:"POST",
                dataType:"json",
                data: '{ "query" : "match(n{id:{id}}) return n", \
                        "params": {"id":"'+id+'"}}',
                success:function(data,xhr,status){
                return data.data[0][0].data.id;
                 // for(var i in data.data)
                // {
                //       $("#demo").append(data.data[i][0].data.name);
                // }
                
                },
                error:function(xhr,err,msg){
                            console.log(xhr);
                            console.log(err);
                            console.log(msg);
                }
            });
                 

    }
    function getInfo() {
        openFB.api({
            path: '/v2.5/me',
            success: function(data) {
                localStorage.setItem('FBUserID',data.id);
                alert(localStorage.getItem('FBUserID'));
                alert(JSON.stringify(data));
                    if(matchUser(data.id)===undefined)
                    {
                        alert("user exists");
                    }
                    else
                    {
                        createUser(data.id,data.name,data.email);
                        alert(matchUser(data.id));
                    }
                document.getElementById("userName").innerHTML = data.name;
                document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: errorHandler});
    }
    function share() {
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: document.getElementById('Message').value || 'Testing Facebook APIs'
            },
            success: function() {
                alert('the item was posted on Facebook');
            },
            error: errorHandler});
    }
    function readPermissions() {
        openFB.api({
            method: 'GET',
            path: '/me/permissions',
            success: function(result) {
                alert(JSON.stringify(result.data));
            },
            error: errorHandler
        });
    }
    function revoke() {
        openFB.revokePermissions(
                function() {
                    alert('Permissions revoked');
                },
                errorHandler);
    }
    function logout() {
        openFB.logout(
                function() {
                    alert('Logout successful');
                },
                errorHandler);
    }
    function errorHandler(error) {
        alert(error.message);
    }