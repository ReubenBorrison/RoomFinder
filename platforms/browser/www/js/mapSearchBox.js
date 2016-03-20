
 $(document).on("pagecreate","#dashboard",function(){
        var map=new L.map('map');
         
        
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
                                        $("#fill").prepend("<li><a href='#map' onclick='setLocation("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.street+","+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                                            console.log(latLonArray[0]+","+latLonArray[1]);
                                            $("#searchLoading").css("display","none");
                                    }
                                    else if(obj.properties.city!=undefined && obj.properties.state!=undefined)
                                    {
                                        $("#fill").prepend("<li><a href='#map' onclick='setLocation("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
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
function setLocation(lat,lon)
{
    map.setView([lat,lon],11);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18}).addTo(map);
    var marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup("latitude: "+lat+" longitude: "+lon).openPopup();
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

            setLocation(lat,lon);
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