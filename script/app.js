$(document).ready(function() {

	

	$('.more-info-button').hide();
	$('.more-info-button').addClass('opacity8');

	var inlist = inlist;
	var inlist2 = inlist2;
	var numclicks = 0;
	var moreinfo = false;
	var length = $('#slablist ul').length;

	$('.printMe').hide();
	$('.email').hide();
	$('.info').hide();	
	$('.refresh').hide();

	// Hover over slab
	$('.slabs').mouseenter(function() {
		$(this).find('.more-info-button').show();
	});

	// Unhover from slab
	$('.slabs').mouseleave(function() {
		$(this).find('.more-info-button').hide();
	});

	// Hover over info button
	$('.more-info-button').mouseenter(function() {
		$(this).removeClass('opacity8');
		$(this).addClass('fullopacity');
	});

	// Unhover from info button
	$('.more-info-button').mouseleave(function() {
		$(this).removeClass('fullopacity');
		$(this).addClass('opacity8');
	});

	// Hover over help button
	$('.help').mouseenter(function() {
		$(this).removeClass('opacity5');
		$(this).addClass('opacity8');
	});

	// Unhover from help button
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
			+ '<p class="listhelp">Click on image to add or <br>remove from the list.</p>	</div>');

		// Click on modal image: adds or removes it from list
		$('.modalImage').click(function(e) {
			var that = $slab;
			var removed = false;

			$slab.addClass('reset');
			$slab.removeClass('red');
			$slab.find(('.info')).hide();

			// Adding or removing list item from list
			$('ul#list li').each(function() {
				if ($(this).hasClass(that.attr("id"))) {
				
					$(this).remove();
					removed = true;
					

					length--;
				
					if (length==1) {
						$('.printMe').hide();
						$('.email').hide();
						$('.refresh').hide();
					}	
				}

			});

			if (!removed) {
				length++;

				if (length>1) {
					$('.printMe').show();
					$('.email').show();
					$('.refresh').show();
				}

				$slab.addClass('red');
				$slab.removeClass('reset');
				$slab.find(('.info')).show();
				
				
				var listitem = '<li class="'+name+'"><a href="#'+name+'">' + name + '</a></li>';
				
				// Click on list item: smoothscrolls to item image
				$(listitem).appendTo('#slablist ul').click(function() {
					var id = '#'+name+'';
					// An offset to push the content down from the top.
					var offset = 20;

	        		// Our scroll target : the top position of the
    	    		// section that has the id referenced by our href.
        			var target = $(id).offset().top-offset;

        			// The magic...smooth scrollin' goodness.
        			$('html, body').animate({scrollTop: target}, 1500);

    			});
			
			}
		
		});
	});


	// Click on regular slab image: adds or removes it from list
	$('.slabs img.slab').click(function(e) {
		e.preventDefault();
		inlist = !inlist;
		var name = this.id;
		var that = this;
		var removed = false;
		var parent = $(this).closest("div");
		$(parent).addClass('reset');
		$(parent).removeClass('red');
		$(parent).find(('.info')).hide();

		// Adding or removing list item from list
		$('ul#list li').each(function() {

			if ($(this).hasClass(that.id)) {
				$(this).remove();
				removed = true;
				length--;

				if (length==1) {
					$('.printMe').hide();
					$('.email').hide();
					$('.refresh').hide();
				}
			}

		});

		if (!removed) {
			length++;
			
			if (length>1) {
				$('.printMe').show();
				$('.email').show();
				$('.refresh').show();
			}

			$(parent).addClass('red');
			$(parent).removeClass('reset');
			$(parent).find(('.info')).show();
						
			var listitem = '<li title="Go To '+name+'" class="'+name+'"><a href="#'+name+'">' + name + '</a></li>';
			
			// Click on list item: smoothscrolls to item image
			$(listitem).appendTo('#slablist ul').click(function() {
				
				var id = '#'+name+'';
				// An offset to push the content down from the top.
				var offset = 20;

        		// Our scroll target : the top position of the
        		// section that has the id referenced by our href.
        		var target = $(id).offset().top-offset;

        		// The magic...smooth scrollin' goodness.
        		$('html, body').animate({scrollTop: target}, 1500);
    		});
			
		}
	});

	// Click on print button: only shows list for printing
	$('.printMe').click(function() {
		numclicks++;

		$('.hide').hide();
		$('a').removeClass('linkwebText');
		$('standard').removeClass('webText');
		$('a').addClass('linkprintText');
		$('.standard').addClass('printText');
							
		window.print();

		$('a').removeClass('linkprintText');
		$('standard').removeClass('printText');
		$('a').addClass('linkwebText');
		$('.standard').addClass('webText');
		$('.hide').show();  

		return false; 
	});

	// Click on email button: opens mailto link in new tab
	$('.email').click(function() {	
		var listItems = [];
		$("ul li").each(function() { listItems.push($(this).text()) });
		var sampleRequests = listItems.join(', ');
		$('#mailto').attr('href', 'mailto:babu@stonecityllc.com?subject=Slab Requests&body=' +sampleRequests + '');
		
	});

	// Click on start over button: refreshes page
	$('.refresh').click(function() {
		location.reload();
	});





});