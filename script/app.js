$(document).ready(function() {
	
	var inlist = inlist;
	var inlist2 = inlist2;
	var numclicks = 0;
	
	var length = $('#slablist ul').length;
	console.log(length);
	$('.printMe').hide();
	$('.email').hide();
	$('.info').hide();	

	// $('a').click(function(event) {

 //        // The id of the section we want to go to.
 //        var id = $(this).attr("href");

 //        // An offset to push the content down from the top.
 //        var offset = 150;

 //        // Our scroll target : the top position of the
 //        // section that has the id referenced by our href.
 //        var target = $(id).offset().top - offset;

 //        // The magic...smooth scrollin' goodness.
 //        $('html, body').animate({scrollTop:target}, 500);

 //        //prevent the page from jumping down to our section.
 //        event.preventDefault();
 //    });

	$('.slabs').click(function(e) {
		e.preventDefault();
		inlist = !inlist;
		var name = this.id;
		var that = this;
		var removed = false;
		$(this).addClass('reset');
		$(this).removeClass('red');
		// $(this).removeClass('.info');
		$(this).find(('.info')).hide();
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
			console.log(length);
			if (length>1) {
				$('.printMe').show();
				$('.email').show();
			}
			$(this).addClass('red');
			$(this).removeClass('reset');
			$(this).find(('.info')).show();
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
		
	})


	

         



});