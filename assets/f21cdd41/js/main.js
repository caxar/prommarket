;(function () {

	$(document).on('click', '.widget-brands .widget-title', function(){
		$(this).closest('.widget-brands').find('.widget-content').toggle();
		$(this).closest('.widget-brands').find('span').toggleClass('active');
	});

    $('#questionform-i_agree').attr('checked', 'checked');
    $('#contactform-i_agree').attr('checked', 'checked');
    $('#orderform-i_agree').attr('checked', 'checked');
    $('.field-orderform-i_agree').addClass('has-success');
    $('#callform-i_agree').attr('checked', 'checked');

    $('ul.pagination').addClass('flat-pagination style1');
    $('li.prev a').html('<img src="/images/icons/left-1.png" alt=""> Предыдущая');
    $('li.prev span').html('<img src="/images/icons/left-1.png" alt=""> Предыдущая');
    $('li.next a').html('Следующая <img src="/images/icons/right-1.png" alt="">');
    $('li.next span').html('Следующая <img src="/images/icons/right-1.png" alt="">');

    $('.slides-certificates').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 1,
                nav: true,
                loop: false
            }
        }
    });

    $('[data-fancybox="gallery"]').fancybox();

    /*$(window).scroll(function(){
        var sticky = $('#header'),
         scroll = $(window).scrollTop();
         $('.divider30').css('height','220px');

        if (scroll >= 0) {
            sticky.addClass('header-fixed');
            $('.header-bottom.main-page-menu').removeClass('main-page');
        } else {
            sticky.removeClass('header-fixed');
            $('.header-bottom.main-page-menu').addClass('main-page');
        }
    });	*/

    $(document).on('click', '#mega-menu > ul.menu > li > a.m-parent', function (e) {
        e.preventDefault();

        var link = $(this).attr('href');
        $('.menu .drop-menu').each(function () {
            var href = $(this).closest('li').find('a.dropdown').attr('href');
            if (link != href) {
                $(this).removeClass('active');
            }
        });
        $(this).closest('li').find('.drop-menu').toggleClass('active');
    });

    $('select[name="sort"]').change(function () {
        var link = this.value;
        window.location.href = link;
    });

    $('select[name="showed"]').change(function () {
        var showed = this.value;
        $.cookie('showed', showed);
        window.location.href = location.href;
    });
//--------------------------------get param get from url----------------
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
//------------------------------------------------


    $(document).on('click', '.widget-brands input[type="checkbox"]', function () {
        var params = {};
        var category_id = $('input[id="category_id"]').val();
        var price_min = $('#i-price-min-max').attr('data-min');
        var price_max = $('#i-price-min-max').attr('data-max');
        $('.widget-brands input[type="checkbox"]:checked').each(function () {
            var filterId = ($(this).data('filter') * 1);
            params[filterId] = [];
        });

        $('.widget-brands input[type="checkbox"]:checked').each(function () {
            var filterId = ($(this).data('filter') * 1);
            params[filterId].push($(this).val());
        });


        if (params.length > 0) {
            $('.blog-pagination').hide();
            $('.flat-row-title span').hide();
        } else {
            $('.blog-pagination').show();
            $('.flat-row-title span').show();
        }
		
		var manufact="";
		manufact = getUrlParameter('manufact');

        $.ajax({
            method: 'GET',
            url: '/filters',
            data: {params: params, category_id: category_id, price_min: price_min, price_max: price_max, manufact: manufact},
            success: function (resp) {
                $('.tab-product').html(resp);
            }
        });
    });

    $('.btn-up').on('click', function (e) {
        e.preventDefault();
        var value = $('.footer-detail input[name="number"]').val();
        if (value == '') {
            value = 1;
        } else {
            value = parseInt(value) + 1;
        }
        $('.footer-detail input[name="number"]').val(value);
    });

    $('.btn-down').on('click', function (e) {
        e.preventDefault();
        var value = $('.footer-detail input[name="number"]').val();
        if (value <= 0) {
            value = 0;
        } else {
            value = parseInt(value) - 1;
        }
        $('.footer-detail input[name="number"]').val(value);
    });

    $(document).on('click', '.btn-add-cart a', function (e) {
        //yaCounter50298996.reachGoal('addtocart');
        //ga('send', 'event', 'bron6', 'addtocart');
        e.preventDefault();
        var id = $(this).closest('.footer-detail').find('input[name="id"]').val();
        var quantity = $(this).closest('.footer-detail').find('input[name="number"]').val();

        if (typeof id == 'undefined') {
            id = $(this).data('id');
        }
        if (typeof quantity == 'undefined') {
            quantity = 1;
        }

        $.ajax({
            type: "GET",
            url: "/cart/add",
            data: {id: id, quantity: quantity},
            success: function (res) {
                showCart(res);
            }
        });
        return false;
    });

    $(document).on('click', '#b-close', function (e) {
        e.preventDefault();
        $('.cart-message').hide();
    });

    $(".box-cart-mini").load("/cart/mini-cart");

    function showCart(cart) {
        $('.cart-message').html(cart);
        $('.cart-message').show();
        $(".box-cart-mini").load("/cart/mini-cart");
    }

    function updateCart(id, qty) {
        $.ajax({
            url: '/cart/update',
            data: {id: id, quantity: qty},
            type: 'GET',
            success: function (res) {
                showCart(res);
                window.location.href = window.location.href;
            }
        });
    }

    function delCart(id) {
        $.ajax({
            url: '/cart/remove',
            data: {id: id},
            type: 'GET',
            success: function (res) {
                showCart(res);
            }
        });
    }

    $('.quanlity .btn-up').on('click', function (e) {
        e.preventDefault();
        var value = $(this).closest('tr').find('input[name="number"]').val();
        var id = $(this).data('projectid');
        if (value == '') {
            value = 1;
        } else {
            value = parseInt(value) + 1;
        }
        $(this).closest('tr').find('input[name="number"]').val(value);
        updateCart(id, value);
		//location.reload();
    });

    $('.quanlity .btn-down').on('click', function (e) {
		
        e.preventDefault();
		
        var value = $(this).closest('tr').find('input[name="number"]').val();
        var id = $(this).data('projectid');
        if (value <= 0) {
            value = 0;
        } else {
            value = parseInt(value) - 1;
        }
        $(this).closest('tr').find('input[name="number"]').val(value);
        updateCart(id, value);
		//location.reload();
    });
	/*------------------------test---------------*/
	
	$('.button_plus').on('click', function (e) {
        e.preventDefault();
		
        var value = $(this).closest('div').find('input[name="number"]').val();
        var id = $(this).data('projectid');
        if (value == '') {
            value = 1;
        } else {
            value = parseInt(value) + 1;
        }
		 //$('input[name=number]').val(value);
         $(this).closest('div').find('input[name="number"]').val(value);
        updateCart(id, value);
		//location.reload();
    });

    $('.button_minus').on('click', function (e) {
		
		
        e.preventDefault();
		
      
        var value = $(this).closest('div').find('input[name="number"]').val();
        var id = $(this).data('projectid');
        if (value <= 0) {
            value = 0;
        } else {
            value = parseInt(value) - 1;
        }
       //$('input[name=number]').val(value);
	    $(this).find('input[name=number]').val(value);
        updateCart(id, value);
		//location.reload();
    });
	/*------------------------test---------------*/
    $(document).on('click', '.cart-delete', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        delCart(id);
        setTimeout(function () {
            window.location.href = window.location.href;
        }, 500)
        //window.location.href = window.location.href;
    });
	////////////////////scroll mouse
  

  window.onload = function () {
        var scr = $(".compare-content");
        scr.mousedown(function () {
            var startX = this.scrollLeft + event.pageX;
            var startY = this.scrollTop + event.pageY;
            scr.mousemove(function () {
                this.scrollLeft = startX - event.pageX;
                this.scrollTop = startY - event.pageY;
                return false;
            });
        });
        $(window).mouseup(function () {
            scr.off("mousemove"); 
        });
    }
////////////////////scroll mouse
////////////////////add to compare 
    function addToCompare(productid) {
        productid !== 'undefined' ? productid : 0;
        var compares = $.cookie('compare_products');
	
		$.ajax({
            url: '/cart/check',
            data: {id: productid},
            type: 'GET',
           
		   success: function (res) {
           	if($.cookie('compare_cat')=='')
						 {
							$.cookie('compare_cat', res); 
						 if (compares) {
									compares += ',' + productid;
									$.cookie('compare_products', compares, {path: '/'});
									compareMassege();
									} else {
										$.cookie('compare_products', productid, {path: '/'});
										compareMassege();
									}
						 }
						 else{
							if($.cookie('compare_cat')==res){
											 if (compares) {
										compares += ',' + productid;
										$.cookie('compare_products', compares, {path: '/'});
										compareMassege();
									} else {
										$.cookie('compare_products', productid, {path: '/'});
										compareMassege();
									}
											
							}
							else{
							message = '<p>Категория выбранного товара не соответсвует категории товаров списка сравнения</p>';
							message += '<p><a href="#" id="clear_list" class="link-button btn-remove-compare-message">Очистить список сравнения</a></p>';
							message += '<p><a href="/compare" class="link-button">Перейти к списку сравнения</a></p>';
							message += '<p><a href="#" class="link-button btn-remove-compare-message">Вернуться к товарам</a></p>';
								 
								 $('body').append('<div id="b-message-compare">' + message + '</div>');
									}
						 }
				
			 
            }
        });
		//*-------------------------
				
	$(document).on('click', '#clear_list', function (e) {
        e.preventDefault();
			  $.cookie('compare_cat', ''); 
			  $.cookie('compare_products', ''); 
    });	
			
			
			
    }
/////////////////////////add to compare
    function delToCompare(productid) {
        productid !== 'undefined' ? productid : 0;
        var compares = $.cookie('compare_products');
        if (compares) {
            compares = compares.split(',');

            compares = $.grep(compares, function (value) {
                return value != productid;
            });

            $.cookie('compare_products', compares, {path: '/'});
			////
				if($.cookie('compare_products')==''){
				$.cookie('compare_cat', ''); 
				}
            window.location.href = window.location.href;
        }
    }

    $(document).on('click', '.compare', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        addToCompare(id);
       // compareMassege();
    });

    $(document).on('click', '.compare-delete', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        delToCompare(id);
    });

////////////////////////////////////////////compare////////////////////////////////////////////

    function compareMassege() {
        var compares = $.cookie('compare_products');
        compares = compares.split(',');
        var message = '';
        if (compares.length >= 2) {
            message += '<p>Вы можете ознакомиться с различиями данных товаров.</p>';
            message += '<p><a href="/compare" class="link-button">Сравнить</a><a href="#" class="link-button btn-remove-compare-message">Вернуться к товарам</a></p>';
        } else {
            message += '<p>Минимальное количество товаров для сравнения - 2</p>';
            message += '<p><a href="#" class="link-button btn-remove-compare-message">Вернуться к товарам</a></p>';
        }

        $('body').append('<div id="b-message-compare">' + message + '</div>');

    }

    $(document).on('click', '.btn-remove-compare-message', function (e) {
        e.preventDefault();
        $('#b-message-compare').remove();
    });

///////////////////////////////////////// Поиск //////////////////////////////////////////////

    $(document).on('click', '.cat-list-search li', function () {
        $('.cat-list-search li').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
    });

    $(document).keyup(function (e) {
        e.preventDefault();
        var search = $('.box-search input[name="search"]').val();
        var category = $('.cat-list-search li.active').data('category');
        $.ajax({
            url: '/searchajax',
            data: {search: search, category: category},
            type: 'GET',
            success: function (res) {
                $('.search-suggestions').html(res);
            }
        });
    });
/////////////////////////////////////////////////////////////////////////////////////////
    $('#callback').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url: '/call',
            type: 'POST',
            data: data,
            success: function (res) {
                $('#b-msg').text(res);
                $("#callback input[type=text], #callback textarea").val("");
            }
        });
        return false;
    });

    $('#request').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url: '/call',
            type: 'POST',
            data: data,
            success: function (res) {
                $('#b-msg-req').text(res);
                $("#request input[type=text], #request textarea").val("");
            }
        });
        return false;
    });

    $('.drop-menu').mouseleave(function () {
        $(this).removeClass('active');
    });

    // $(document).ready(function () {
    //     var headerTop = $('.header-top');
    //     var sticky = headerTop.height();
    //     console.log(sticky)
    //     $(window).scroll(function(){
    //         if($(window).scrollTop() >= sticky)
    //         {
    //             headerTop.addClass('fixed-header-top');
    //             $('.header').addClass('fixed-header');
    //         }
    //         else
    //         {
    //             headerTop.removeClass('fixed-header-top');
    //             $('.header').removeClass('fixed-header');
    //         }
    //     });

    // for sticky menu header-view hidden block 

           $(document).ready(function () {
            let header = $('.header-view_scroll');
            $(window).scroll(function(){
                
                if($(this).scrollTop() >= 390)
                {
                    header.addClass('view-scroll_sticky');
                }
                else
                {
                    header.removeClass('view-scroll_sticky');
                }
            });





    })

    $(document).ready(function(){
        $('.one-click-buy-button').click(function(e){
            e.preventDefault();
            var oneClickForm = $('.container-buy-one-click');
            oneClickForm.find('#buyoneclickform-link').val($(this).data('item-link'));
            $('.one-click-buy-button').show();
            $(this).hide();
            $(this).parent().append(oneClickForm);
            oneClickForm.find('#buy-one-click').css('display', 'flex');
        })
    })



    // style for btn scroll up 
        $(document).ready(function(){
            $(window).scroll(function(){
                if($(window).scrollTop()>220){
                    $('.btn-scroll').fadeIn(900);
                } else {
                    $('.btn-scroll').fadeOut(700);
                }
            })
        });



})();