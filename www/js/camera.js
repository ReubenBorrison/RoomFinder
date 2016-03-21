document.addEventListener("deviceready",function(){
	var pictureSource=navigator.camera.PictureSourceType;
    var destinationType=navigator.camera.DestinationType;
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
},false);