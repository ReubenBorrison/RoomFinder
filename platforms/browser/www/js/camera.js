var pictureSource;
var destinationType;
document.addEventListener("deviceready",function(){
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
    console.log(navigator.camera);
    console.log(FileTransfer);
},false);
	
	function onPhotoURISuccess(imageURI) {
       
      $("#picCollection").prepend("<img src="+imageURI+" height='50px' width='50px' style='display:block;float:left;' class='imgLinks'/>");
     // console.log(imageURI);
    }

    function capturePhoto() {
     
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, saveToPhotoAlbum: 1,
        destinationType: destinationType.FILE_URI});
       console.log(destinationType);
    }

    function getPhoto(source) {
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,destinationType: destinationType.FILE_URI,sourceType: source });
    }

    function onFail(message) {
      alert('Failed because: ' + message);
    }
