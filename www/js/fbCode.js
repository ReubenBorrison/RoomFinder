document.addEventListener("deviceready",function(){
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
},false);