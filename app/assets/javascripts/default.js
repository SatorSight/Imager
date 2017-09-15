Dropzone.autoDiscover = false;
document.addEventListener("turbolinks:load", function() {

	    let md = new Dropzone("#my-dropzone", {
			paramName: 'image[image_file]'
	    });

	    md.on("complete", function (file) {
	        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) 
				document.location.href="/";
	    });

	// });

	function copyTextToClipboard(text) {
	  let textArea = document.createElement("textarea");

	  textArea.style.top = 0;
	  textArea.style.left = 0;
	  textArea.style.width = '2em';
	  textArea.style.height = '2em';
	  textArea.style.padding = 0;
	  textArea.style.border = 'none';
	  textArea.style.outline = 'none';
	  textArea.style.boxShadow = 'none';
	  textArea.style.background = 'transparent';
	  textArea.value = text;
	  document.body.appendChild(textArea);
	  textArea.select();
	  document.execCommand('copy');
	  document.body.removeChild(textArea);
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
