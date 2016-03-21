    function postData()
    {
        var d=new Date();
        var roomId=d.getDate().toString()+d.getMonth().toString()+d.getYear().toString()+d.getHours().toString()+d.getMinutes().toString()+d.getSeconds().toString();
        var id=localStorage.getItem("FBUserID");
        var links=[];
        uploadUrl="http://reubenz.com/";
        matchUser(id);

        statusId=localStorage.getItem("statusOfId");
        if(statusId=="createNew")
        {
            window.location("#login");
        }
        else if(statusId=="exists")
        {   
            if(roomNum==""||price==""||desc=="")
            {
                $("#error").html("fill all the details please!!");
                $("#message").popup("close");
            }
            else
            {
            $("#message").popup("open");
            $("#msg").html("Uploading Image");
            $("img.imgLinks").each(function()
            {
                var fileURL=$(this).attr('src');
                var serverURL = "http://reubenz.com/fileUpload.php";
                var options = new FileUploadOptions();
                options.fileKey="file";
                options.fileName= id+"-"+roomId+"-"+fileURL.substring(fileURL.lastIndexOf('/')+1);
                options.mimeType="image/jpeg";
                options.chunkedMode = false;
                var ft = new FileTransfer();
                ft.upload(fileURL, serverURL , win, onFail, options);
                function win(r) {
                    console.log("Code = " + r.responseCode);
                    console.log("Response = " + r.response);
                    console.log("Sent = " + r.bytesSent);
                    links.push(uploadUrl+r.response);
                console.log("Upload Successfull");

                }

                function fail(error) {
                    alert("An error has occurred: Code = " + error.code);
                    console.log("upload error source " + error.source);
                    console.log("upload error target " + error.target);
                }
            });
            $("#msg").html("Uploading room data");
            var roomNum=$("#roomNum").val();
            var price=$("#price").val();
            var desc=$("#description").val();
            var latLonArray=document.getElementById("location").name.split(',');
            
            
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
                     data: '{ "query" : "match(n) where n.id={id} \
                                        create(n)-[rented:rented]->(k:room{roomid:{roomId},roomNum:{roomNum},price:{price},\
                                        description:{desc},latitude:{lat},longitude:{lon}}) return n,k;", \
                            "params": {"id":"'+id+'","roomId":"'+roomId+'","roomNum":"'+roomNum+'","price":"'+price+'",\
                                      "desc":"'+desc+'","lat":'+Number(latLonArray[0])+',"lon":'+Number(latLonArray[1])+'}}',
         
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
                $("#message").popup("close");
            }
        }
     }
     
    function loginOrNot()
    {   
        var fbId=localStorage.getItem('FBUserID');
        matchUser(fbId);
        var statusId=localStorage.getItem('statusId');
        if(localStorage.getItem('FBUserID')===null)
        {
            window.location="#login";
        }
        else if(statusId==="createNew")
        {
            window.location="#login";
        }
        else
        {
            window.location="#ad";
        }
    }

   
    //sample for neo4j connection to be deleted afterwards
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
                        "params": {"id":'+id+'}}',
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
   