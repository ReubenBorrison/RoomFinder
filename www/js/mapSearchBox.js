var map=new L.map('map');
$(document).on("pagecreate","#dashboard",function(){
    
    var url="http://photon.komoot.de/api/?q=";
    var limit="&limit=5";
    $("#search").keyup(function(){

        var val=$("#search").val();
        if(val.length>=3)
        {
            $("#searchLoading").css("display","inline");
            $("#fill").empty();
            $.getJSON(url+val+limit,function(data,status){

                $.each(data.features,function(i,obj){
                    var latLonStr=obj.geometry.coordinates.toString();
                    var latLonArray=latLonStr.split(",");
                    if(obj.properties.street!=undefined)
                    {
                        $("#fill").prepend("<li><a href='#map' onclick='displayRoomsOnMap("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.street+","+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                            console.log(latLonArray[0]+","+latLonArray[1]);
                            $("#searchLoading").css("display","none");
                    }
                    else if(obj.properties.city!=undefined && obj.properties.state!=undefined)
                    {
                        $("#fill").prepend("<li><a href='#map' onclick='displayRoomsOnMap("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                        console.log(latLonArray[0]+","+latLonArray[1]);
                        $("#searchLoading").css("display","none"); 
                    }
                                         
              
                });
                
            });
         }   
         else if(val.length==0)
         {
            $("#fill").empty();
            $("#searchLoading").css("display","none");
         }
    });
    $("#search").click(function(){
        $("#fill").empty();
        $("#searchLoading").css("display","none");
    });
        // ends
    $("#location").keyup(function(){

        var val=$("#location").val();
        if(val.length>=3)
        {
            $("#adLoading").css("display","block");
            $("#fill2").empty();
            $.getJSON(url+val+limit,function(data,status){

                $.each(data.features,function(i,obj){
                    var latLonStr=obj.geometry.coordinates.toString();
                    var latLonArray=latLonStr.split(",");
                    if(obj.properties.street!=undefined)
                    {  
                        var placeVal=obj.properties.street+obj.properties.city+obj.properties.state+obj.properties.country;
                        $("#fill2").prepend("<li><a href='#' onclick='setName("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.street+","+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                            console.log(latLonArray[0]+","+latLonArray[1]);
                            console.log(placeVal);
                            $("#adLoading").css("display","none");
                    }
                    else if(obj.properties.city!=undefined && obj.properties.state!=undefined)
                    {
                        var placeVal=obj.properties.city+obj.properties.state+obj.properties.country;
                        $("#fill2").prepend("<li><a href='#' onclick='setName("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                        console.log(latLonArray[0]+","+latLonArray[1]); 
                        console.log(placeVal);
                        $("#adLoading").css("display","none");
                    }                          
                });
            });
         }   
         else if(val.length==0)
         {
            $("#fill2").empty();
            $("#adLoading").css("display","none");
         }
        });
    $("#location").click(function(){
        $("#fill2").empty();
        $("#location").val("");
        $("#adLoading").css("display","none");
    });

});
function displayRoomsOnMap(lat,lon)
{   
    map.setView([lat,lon],18);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 22}).addTo(map);
    var qLatLeft=lat+.050;
    var qLatRight=lat-.050;
    var qLonLeft=lon+.050;
    var qLonRight=lon-.050;
    var lati,longi,marker,description,markerContent,roomNum,price;
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Accept","application/json; charset=UTF-8");
            xhr.setRequestHeader("Authorization","Basic bmVvNGo6c3JoMTIzNA==");
            xhr.setRequestHeader("Content-Type", "application/json");
        }
        });
    $.ajax({
                url:"http://ec2-52-58-42-113.eu-central-1.compute.amazonaws.com/db/data/cypher",
                type:"POST",
                dataType:"json",
                data: '{ "query" : "match(n:room) where {LatLeft}>=n.latitude>={LatRight} and {LonLeft}>=n.longitude>={LonRight} return n", \
                        "params": {"LatLeft":'+qLatLeft+',"LatRight":'+qLatRight+',"LonLeft":'+qLonLeft+',"LonRight":'+qLonRight+'}}',
               
                success:function(data,xhr,status){
                console.log(data);
                if(data.data.length==0)
                {
                    alert("no results found");
                }
                else{
                    
                    $.each(data.data,function(d)
                    {
                        console.log(JSON.stringify(d));
                    });
                    for(var i=0;i<data.data.length;i++)
                    {
                        console.log(data.data.length);
                      lati=data.data[i][0].data.latitude;
                      longi=data.data[i][0].data.longitude;
                      marker = L.marker([lati, longi]).addTo(map);
                      description=data.data[i][0].data.description;
                      roomNum=data.data[i][0].data.roomNum;
                      price=data.data[i][0].data.price;
                      console.log(lati);
                      markerContent='<a href="" data-transition="slide" onclick="roomDisplay('+price+','+roomNum+');"><p><img src="" alt="Room image" width="80" height="80"> '+description+'<br>Phone number: 5</p></a>';
                      marker.bindPopup(markerContent);
                      
                    }
                    
                    window.location="#MapDisplay";
                    for(var j=0;j<5;j++)
                    {
                         map.invalidateSize('true');
                    }
                }                
                
                },
                error:function(xhr,err,msg){
                            console.log(xhr);
                            console.log(err);
                            console.log(msg);
                }
            }); 
}
function roomDisplay(price,roomNum,lat,lon)
{
    
    $("#roomPrice").html("Cost:"+price);
    $("#roomNumber").html("no. of rooms"+roomNum.toString());
   // $("#roomDesc").html("Description"+desc.toString());
    window.location="#roomDisplay";
    
}
function setName(lat,lon)
{
    url="http://photon.komoot.de/reverse?lon="+lon+"&lat="+lat;
    console.log(url);
    $.getJSON(url,function(data,status){
        if(data.features[0].properties.street===undefined)
        {
            $("#location").val("street not found! enter street name !");
            $("#adLoading").css("display","none");
        }
        else
        {
            $("#location").val(data.features[0].properties.street);
            $("#adLoading").css("display","none");
        }
        // data.features[0].properties.city.toString()+","+data.features[0].properties.state.toString()+","+data.features[0].properties.country.toString();
    });
    latLonStr=lat+","+lon;
    
    // $("#location").attr("value",placeValue);
    $("#location").attr("name",latLonStr);
    $("#fill2").empty();
}
//user's current location
function currentPosition(elementId)
{   
    
    if(elementId==="searchPage")
    {
        $("#searchLoading").css("display","inline");
    }
    else if(elementId==="roomListPage")
    {
        $("#adLoading").css("display","block");
    }
    navigator.geolocation.getCurrentPosition(geoLocationSuccess,geoLocationError);
    function geoLocationSuccess(position)
    {   
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        if(elementId==="searchPage")
        {

            displayRoomsOnMap(lat,lon);
            $("#searchLoading").css("display","none");
        }
        else if(elementId==="roomListPage")
        {
            setName(lat,lon);
            
        }
    }
    function geoLocationError(error)
    {
        alert(error.message);
    }
}
