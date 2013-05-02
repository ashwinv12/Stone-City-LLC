$(document).ready(function() {

	// $.modal('<div><h4 align="center">How to Use Site</h4><br><p align="left">Right click on slab image for info</p><br><p>Left click on slab image to add it to your slab request list</p><br><p>Click on the list item to navigate to the slab image</p><br><br><br><br><p>Click on the "x" in the upper right corner to begin</p></div>');
	$('.more-info-button').hide();
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

	
	

	$('.more-info-button').click(function(e) {
			e.preventDefault();
			var nextInfo = $(this).prev('.slabs');
			var id = nextInfo.attr("id");
			console.log(id);
			moreinfo = true;
			var $slab = $(this).parents('.slabs').first();
			// console.log($slab);
			var name = $slab.attr("id");
			var price = $slab.attr("price");
			var image = $slab.find('img').attr('src');
			$.modal('<div><h4 align="center">' + name + '</h4><br><p align="left">Price: ' + price + '</p><br><br><img src=' + image + '></div>');
			
			
			
			
		
	});
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	$('.slabs img').click(function(e) {
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
				
				$(this).remove();
				removed = true;

				length--;
				console.log(length);
				if (length==1) {
					$('.printMe').hide();
					$('.email').hide();
				}
			}

		})
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
				$('a').css('textDecoration','none')
				$('.standard').css('font-weight','normal');
				$('.standard').css('color','black');
				
				window.print();
				$('a').css('textDecoration','underline');
				$('.standard').css('font-weight','bold');
				$('.standard').css('color','orange');
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