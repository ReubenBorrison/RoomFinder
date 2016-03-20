
 $(document).on("pagecreate","#dashboard",function(){
                    var url="http://photon.komoot.de/api/?q=";
                    var limit="&limit=5";

                    $("#search").keyup(function(){
                        
                        var val=$("#search").val();
                        if(val.length>=3)
                        {
                            $("#fill").empty();
                            $.getJSON(url+val+limit,function(data,status){

                                $.each(data.features,function(i,obj){
                                    var latLonStr=obj.geometry.coordinates.toString();
                                    var latLonArray=latLonStr.split(",");
                                    if(obj.properties.street!=undefined)
                                    {
                                        $("#fill").prepend("<li><a href='#map' onclick='setLocation("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.street+","+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                                            console.log(latLonArray[0]+","+latLonArray[1]);
                                    }
                                    else
                                    {
                                        $("#fill").prepend("<li><a href='#map' onclick='setLocation("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                                        console.log(latLonArray[0]+","+latLonArray[1]); 
                                    }
                                                              
                                });
                            });
                         }   
                         else if(val.length==0)
                         {
                            $("#fill").empty();
                         }
                        });
                        $("#search").click(function(){
                            $("#fill").empty();
                        });
                        // ends
                        $("#location").keyup(function(){
                        
                        var val=$("#location").val();
                        if(val.length>=3)
                        {
                            $("#fill2").empty();
                            $.getJSON(url+val+limit,function(data,status){

                                $.each(data.features,function(i,obj){
                                    var latLonStr=obj.geometry.coordinates.toString();
                                    var latLonArray=latLonStr.split(",");
                                    if(obj.properties.street!==undefined)
                                    {  
                                        var placeVal=obj.properties.street+obj.properties.city+obj.properties.state+obj.properties.country;
                                        $("#fill2").prepend("<li><a href='#' onclick='setName("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.street+","+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                                            console.log(latLonArray[0]+","+latLonArray[1]);
                                            console.log(placeVal);
                                    }
                                    else 
                                    {
                                        var placeVal=obj.properties.city+obj.properties.state+obj.properties.country;
                                        $("#fill2").prepend("<li><a href='#' onclick='setName("+latLonArray[1]+","+latLonArray[0]+");' class='ui-btn'>"+obj.properties.city+","+obj.properties.state+","+obj.properties.country +"</a></li>");
                                        console.log(latLonArray[0]+","+latLonArray[1]); 
                                        console.log(placeVal);
                                    }
                                                              
                                });
                            });
                         }   
                         else if(val.length==0)
                         {
                            $("#fill2").empty();
                         }
                        });
                        $("#location").click(function(){
                            $("#fill2").empty();
                            $("#location").val("");
                        
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
        }
        else
        {
            $("#location").val(data.features[0].properties.street);
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
    navigator.geolocation.getCurrentPosition(geoLocationSuccess,geoLocationError);
    function geoLocationSuccess(position)
    {   
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        if(elementId==="searchPage")
        {
            setLocation(lat,lon);
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