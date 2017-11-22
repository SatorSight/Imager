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

		$('.dropdown-toggle-wrapper').on('click', function(){
			let glyph_down = $('#filters-show');
			let glyph_up = $('#filters-hide');

			if(glyph_up.hasClass('menu-on'))
				glyph_up.removeClass('menu-on');
			else
				glyph_up.addClass('menu-on');

			if(glyph_down.hasClass('menu-on'))
				glyph_down.removeClass('menu-on');
			else
				glyph_down.addClass('menu-on');

			if(glyph_down.hasClass('menu-on'))
				$('.filter-wrapper').hide();
			else
				$('.filter-wrapper').show();
		});

		$('.filter-tag').parent().hide();
		let input = $('#filter-text-input');
		input.on('keyup', function(){
			const value = $(this).val();
			if(value.length !== 0){
				$.each($('.filter-tag'), function(i, val){
					if(val.innerHTML.indexOf(value) !== -1)
						$(val).parent().show();
					else
						$(val).parent().hide();
				});
			}else
				$('.filter-tag').parent().hide();
		});


	    let delete_button = $('.delete-image');
	    let copy_button = $('.copy-url');
	    let copy_youtrack = $('.copy-youtrack');
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
		copy_youtrack.on('click', function(){
	    	let tr = $(this).parent().parent().parent();
	    	let id = parseInt(tr.find('.image-id').attr('data'));
	    	
	    	let url = window.location.host+'/'+id;

	    	copyTextToClipboard(url);
		});




		$('input[name="daterange"]').daterangepicker(
		{
		    locale: {
		      format: 'YYYY-MM-DD'
		    },
		}, 
		// function(start, end, label) {
		//     alert("A new date range was chosen: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
		// }
		);




	});




});