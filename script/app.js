$(document).ready(function() {

	
	$('.more-info-button').hide();
	$('.more-info-button').addClass('opacity8');
	var inlist = inlist;
	var inlist2 = inlist2;
	var numclicks = 0;
	var moreinfo = false;
	
	var length = $('#slablist ul').length;
	console.log(length);
	$('.printMe').hide();
	$('.email').hide();
	$('.info').hide();	

	
	$('.slabs').mouseenter(function() {
		$(this).find('.more-info-button').show();
	});

	$('.slabs').mouseleave(function() {
		$(this).find('.more-info-button').hide();
	});

	$('.more-info-button').mouseenter(function() {
		$(this).removeClass('opacity8');
		$(this).addClass('fullopacity');
	});

	$('.more-info-button').mouseleave(function() {
		$(this).removeClass('fullopacity');
		$(this).addClass('opacity8');
	});


	$('.help').mouseenter(function() {
		$(this).removeClass('opacity5');
		$(this).addClass('opacity8');
	});

	$('.help').mouseleave(function() {
		$(this).removeClass('opacity8');
		$(this).addClass('opacity5');
	});

	$('.help').click(function() {
		$.modal('<div><h4 align="center">Help</h4><br><p align="left">Click on the "i" icon for information '
			+ 'on the slab</p><br><p>Click on slab image to add it to your slab request list</p><br>'
			+ '<p>Click on the list item to navigate to the slab image</p><br><p>When you are finished, you'
			+ ' can print or email your list</p></div>');
	});

	$('.more-info-button').click(function(e) {
		e.preventDefault();
		var $slab = $(this).parents('.slabs').first();
		var name = $slab.attr("id");
		var price = $slab.attr("price");
		var image = $slab.find('img').attr('src');
		
		
		$.modal('<div><h4 align="center">' + name + '</h4><br><p align="left">Price: ' + price + '</p><br><br>'
			+'<img class="modalImage" title="Add or Remove from List" src=' + image + '><br><br></div>');
			
		$('.modalImage').click(function() {
			
			console.log("slab:" + $slab.attr("id"));
			var that = $slab;
			var removed = false;
			$($slab).addClass('reset');
		$($slab).removeClass('red');
		// $($slab).removeClass('.info');
		$($slab).find(('.info')).hide();
		$('ul#list li').each(function() {
			// console.log($($slab));
			// console.log("$slab.id is " + $slab.class + " : That.id is " + that.id);
			console.log(this);
			if ($(this).hasClass(that.attr("id"))) {
				
				$(this).remove();
				removed = true;
				

				length--;
				// console.log(length);
				if (length==1) {
					$('.printMe').hide();
					$('.email').hide();
				}
			}

		});
		if (!removed) {
			length++;
			// console.log(length);
			if (length>1) {
				$('.printMe').show();
				$('.email').show();
			}
			$($slab).addClass('red');
			$($slab).removeClass('reset');
			$($slab).find(('.info')).show();
			
			
			var listitem = '<li class="'+name+'"><a href="#'+name+'">' + name + '</a></li>';
			// console.log(listitem);

			// $(listitem).addClass("smoothScroll");
			$(listitem).appendTo('#slablist ul').click(function() {
				
				var id = '#'+name+'';
			// console.log(id);
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


	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$('.slabs img.slab').click(function(e) {
		e.preventDefault();
		inlist = !inlist;
		var name = this.id;
		var that = this;
		var removed = false;
		var parent = $(this).closest("div");
		console.log("ID of div:" + parent);
		$(parent).addClass('reset');
		$(parent).removeClass('red');
		// $(this).removeClass('.info');
		$(parent).find(('.info')).hide();
		$('ul#list li').each(function() {
			// console.log($(this));
			// console.log("This.id is " + this.class + " : That.id is " + that.id);

			if ($(this).hasClass(that.id)) {
				// console.log(this);
				$(this).remove();
				removed = true;
				

				length--;
				console.log(length);
				if (length==1) {
					$('.printMe').hide();
					$('.email').hide();
				}
			}

		});
		if (!removed) {
			length++;
			// console.log(length);
			if (length>1) {
				$('.printMe').show();
				$('.email').show();
			}
			$(parent).addClass('red');
			$(parent).removeClass('reset');
			$(parent).find(('.info')).show();
			
			
			var listitem = '<li class="'+name+'"><a href="#'+name+'">' + name + '</a></li>';
			// console.log(listitem);

			// $(listitem).addClass("smoothScroll");
			$(listitem).appendTo('#slablist ul').click(function() {
				
				var id = '#'+name+'';
			// console.log(id);
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
	
	

	

	

	$(document).click(function(e) {
		if(e.button == 0) {
			$('#rightClickMenu').fadeOut(80);
		}
		
	});
	

	$('.printMe').click(function() {
		numclicks++;
			
				$('.hide').hide();
				$('a').removeClass('linkwebText');
				$('standard').removeClass('webText');
				$('a').addClass('linkprintText');
				$('.standard').addClass('printText');
				// $('.standard').addClass('printText');
				
				window.print();
				$('a').removeClass('linkprintText');
				$('standard').removeClass('printText');
				$('a').addClass('linkwebText');
				$('.standard').addClass('webText');
				$('.hide').show();  
				return false; 
			

		});

	$('.email').click(function() {
		// $('.hide').hide();
		var listItems = [];
		$("ul li").each(function() { listItems.push($(this).text()) });
		var sampleRequests = listItems.join(', ');
		$('#mailto').attr('href', 'mailto:babu@stonecityllc.com?subject=Slab Requests&body=' +sampleRequests + '');
		
		// console.log("click function is working");
	})


	
	
         

	

});