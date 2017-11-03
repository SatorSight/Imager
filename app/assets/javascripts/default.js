Dropzone.autoDiscover = false;
document.addEventListener("turbolinks:load", function() {

    let md = new Dropzone("#my-dropzone", {
		paramName: 'image[image_file]',
		timeout: 99999999
    });

    md.on("complete", function (file) {
        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) 
			document.location.href="/";
    });

	function copyTextToClipboard(text) {
		console.log(text);

	  let textarea = document.getElementById( 'bar' )
	  //let textarea = $('#bar');

	  textarea.value = text;
	  // textarea.val(text);

	  var clipboard = new Clipboard('.copy-url');

      //textarea.blur();


	}

	$( document ).ready(function() {
	    let delete_button = $('.delete-image');
	    let copy_button = $('.copy-url');
	    delete_button.on('click', function(){

	    	let tr = $(this).parent().parent().parent();
			let id = parseInt(tr.find('.image-id').attr('data'));

	    	$.ajax({
		        type: "DELETE",
		        url: "/images/" + id,
		        dataType: "json",
		        data: {"_method":"delete"},
		        complete: function(){
		            tr.fadeOut( "fast", function() {
					   tr.remove(); 
					});
		        }
		    });
	    });

	    copy_button.on('click', function(){
	    	let tr = $(this).parent().parent().parent();
	    	let id = parseInt(tr.find('.image-id').attr('data'));
	    	
	    	let url = window.location.host+'/'+id;

	    	copyTextToClipboard(url);
		});
	});
});