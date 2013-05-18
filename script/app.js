$(document).ready(function() {

	// length of the list
	var length = $('#slablist ul').length;

	// function smoothScroll - takes in id, offset, and speed, and can be called inside of click function
	function smoothScroll(id, offset, speed) {
		var scrollId = id;
		// An offset to push the content down from the top.
		var scrollOffset = offset;
    	// Our scroll target : the top position of the
    	// section that has the id referenced by our href.
        var target = $(scrollId).offset().top-scrollOffset;

		// The magic...smooth scrollin' goodness.
    	$('html, body').animate({scrollTop: target}, speed);

    	
	}

	

	hideListButtons();

	// function smoothScroll - takes in id, offset, and speed, and can be called inside of click function
	function smoothScroll(id, offset, speed) {
		var scrollId = id;
		// An offset to push the content down from the top.
		var scrollOffset = offset;
    	// Our scroll target : the top position of the
    	// section that has the id referenced by our href.
        var target = $(scrollId).offset().top-scrollOffset;

		// The magic...smooth scrollin' goodness.
    	$('html, body').animate({scrollTop: target}, speed);

	}

	

	// Hides More Info button and gives it the correct opacity
	$('.more-info-button').hide();
	$('.more-info-button').addClass('opacity8');


	// function hideListButtons - hides print, email, and start-over buttons
	function hideListButtons() {
		$('.printMe').hide();
		$('.email').hide();
		$('.startover').hide();
	}
	
	// function showListButtons - shows print, email, and start-over buttons
	function showListButtons() {
		$('.printMe').show();
		$('.email').show();
		$('.startover').show();
	}


	

	$('.info').hide();



	// Hover over slab: displays the More Info button
	$('.slabs').mouseenter(function() {
		$(this).find('.more-info-button').show();
	});

	// Unhover from slab: More Info button dissapears
	$('.slabs').mouseleave(function() {
		$(this).find('.more-info-button').hide();
	});

	// Hover over info button: increases opacity on button, adds customized tool tip
	$('.more-info-button').mouseenter(function() {
		var $slab = $(this).parents('.slabs').first();
		var name = $slab.attr("id");
		$(this).removeClass('opacity8');
		$(this).addClass('fullopacity');
		$(this).attr('title', 'More Info on '+ name +'')
	});

	// Unhover from info button: opacity back to normal, and tool tip dissapears
	$('.more-info-button').mouseleave(function() {
		$(this).removeClass('fullopacity');
		$(this).addClass('opacity8');
	});

	// Hover over help button: opacity increases from 0.5 to 0.8
	$('.help').mouseenter(function() {
		$(this).removeClass('opacity5');
		$(this).addClass('opacity8');
	});

	// Unhover from help button: opacity goes back to 0.5 from 0.8
	$('.help').mouseleave(function() {
		$(this).removeClass('opacity8');
		$(this).addClass('opacity5');
	});

	// Click on help button: displays modal with help contents
	$('.help').click(function() {
		$.modal('<div><h4 align="center">Help</h4><br><p align="left">Click on the "i" icon for information '
			+ 'on the slab</p><br><p>Click on slab image to add it to your slab request list</p><br>'
			+ '<p>Click on the list item to navigate to the slab image</p><br><p>When you are finished, you'
			+ ' can print or email your list</p></div>');
	});

	// Click on info button: displays modal with slab's info
	$('.more-info-button').click(function(e) {
		e.preventDefault();
		var $slab = $(this).parents('.slabs').first();
		var name = $slab.attr("id");
		var price = $slab.attr("price");
		var thickness = $slab.attr("thickness");
		var avail = $slab.attr("avail");
		var image = $slab.find('img').attr('src');
		
		// Modal contents
		$.modal('<div><h4 align="center">' + name + '</h4><p class="price">Price: ' + price + '</p>'
			+'<img class="modalImage" title="Add or Remove from List" src=' + image + '><p class="thickness">'
			+ 'Thickness: '+thickness+'<p class="avail">Availability: '+avail+'</p> ' 
			+ '<p class="listhelp">Click on image to add or <br>remove from the list.</p></div>');

		// Click on modal image: adds or removes it from list
		$('.modalImage').click(function(e) {
			var that = $slab;
			var removed = false;

			$slab.addClass('reset');
			$slab.removeClass('highlight');
			$slab.find(('.info')).hide();

			// Removing list item from list
			$('ul#list li').each(function() {

				var $this = $(this);
				if ($this.hasClass(that.attr("id"))) {
				
					$this.remove();
					removed = true;

					length--;
				
					if (length==1) {
						hideListButtons();
					}	
				}


			});

			

			if (!removed) {
				length++;

				if (length>1) {
					showListButtons();

				}

				$slab.addClass('highlight');
				$slab.removeClass('reset');
				$slab.find(('.info')).show();
				
				// variable that stores the list item with an id to scroll to
				var listitem = '<li class="'+name+'"><a href="#'+name+'">' + name + '</a></li>';
				
				// Click on list item: smoothscrolls to item image
				$(listitem).appendTo('#slablist ul').click(function() {
        			smoothScroll('#'+name, 20, 700);
        			return false;
    			});
			
			}
		
		});
	});
	
	
	// Click on regular slab image: adds or removes it from list
	$('.slabs img.slab').click(function(e) {
		e.preventDefault();
		var name = this.id;
		var that = $(this).parents('.slabs').first();;
		var removed = false;
		var parent = $(this).closest("div");
		$(parent).addClass('reset');
		$(parent).removeClass('highlight');
		$(parent).find(('.info')).hide();

		// Adding or removing list item from list
		$('ul#list li').each(function() {

			var $this = $(this);
				if ($this.hasClass(that.attr("id"))) {
				
					$this.remove();
					removed = true;


					length--;
				
					if (length==1) {
						hideListButtons();
					}	

				}


		});

		if (!removed) {
			length++;
			
			if (length>1) {

				showListButtons();

			}

			$(parent).addClass('highlight');
			$(parent).removeClass('reset');
			$(parent).find(('.info')).show();
						
			// variable that stores the list item with an id to scroll to						
			var listitem = '<li title="Go To '+name+'" class="'+name+'"><a href="#'+name+'">' + name + '</a></li>';
			
			// Click on list item: smoothscrolls to item image
			$(listitem).appendTo('#slablist ul').click(function() {
        		smoothScroll('#'+name, 20, 700);
        		return false;
    		});
			
		}
	});

	// Click on print button: allows user to print out their list
	$('.printMe').click(function() {

		// Hides all buttons and images for printing
		$('.hide').hide();
		$('a').removeClass('linkwebText');
		$('standard').removeClass('webText');
		$('a').addClass('linkprintText');
		$('.standard').addClass('printText');
		
		// Prints what is visible on the window			
		window.print();

		// Shows everything on page after printing or if printing is cancelled
		$('a').removeClass('linkprintText');
		$('standard').removeClass('printText');
		$('a').addClass('linkwebText');
		$('.standard').addClass('webText');
		$('.hide').show();  

		return false; 
	});

	// Click on email button: opens mailto link in new tab
	$('.email').click(function() {	
		// stores list items into an array split by commas for email
		var listItems = [];
		$("ul li").each(function() { listItems.push($(this).text()) });
		var sampleRequests = listItems.join(', ');

		// mailto address and contents
		$('#mailto').attr('href', 'mailto:babu@stonecityllc.com?subject=Slab Requests&body=' +sampleRequests + '');
		
	});

	// Click on start over button: clears  out list
	$('.startover').click(function() {

		hideListButtons();

		$('#slablist ul').empty();
		$('.slabs').removeClass('highlight');
		$('.slabs').addClass('reset');
		$('.info').hide();

		smoothScroll('#top', 20, 700);
        return false;
		
	});

	

});