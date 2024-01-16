// let Obj = Object;

(function ($) {
    "use strict";

    /************************************************************
     * Predefined letiables
     *************************************************************/
    let $window = $(window),
        $body = $('body'),
        $document = $(document);

    $.fn.exists = function () {
        return this.length > 0;
    };

    $.fn.isMobile = function () {
        if ($window.width() > 750) {
            return false;
        }
        return true;
    };

    // LOAD POST PHÂN TRANG CATEGORY
    Obj.ajax_load_post_homepage = function () {
        $(".c-page__homepage .section__news").on('click', '.c-pagination a', function (e) {
            e.preventDefault();
            let hrefThis = $(this).attr('href');
            let paged = hrefThis.match(/\d+/)[0];
            paged = paged.match(/\d+/)[0];
            if (!paged) paged = 1;
            $.ajax({
                type: "post",
                dataType: "json",
                url: mcn.ajax_url,
                data: { action: "homepage_ajax_load_post", ajax_paged: paged },
                beforeSend: function () {
                    $('html, body').animate({
                        scrollTop: $('.c-page__homepage .section__news').offset().top - $('.c-header__bottom').innerHeight()
                    }, 300);
                    $(".c-page__homepage .mcn-ajax__load-post-home .c-list__news").empty();
                    $('.c-page__homepage .section__news .c-list__news-holder').addClass('show');
                },
                success: function (response) {
                    if (response.success) {
                        $(".c-page__homepage .mcn-ajax__load-post-home").empty();
                        $(".c-page__homepage .mcn-ajax__load-post-home").append($(response.data));
                        $('.c-page__homepage .section__news .c-list__news-holder').removeClass('show')
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        });
    }

    // LOAD PROJECT PHÂN TRANG TAXONOMY
    Obj.ajax_load_project__homepage = function () {
        $(".section__new-project").on('click', '.category-list a', function (e) {
            e.preventDefault();
            let dataCateID = $(this).data('id');
            let dataCateSlug = $(this).data('slug');
            let $params = {
                'tax_id': dataCateID,
                'tax_lug': dataCateSlug
            };
            $('.section__new-project .category-list a').removeClass('active');
            $(this).addClass('active');
            $.ajax({
                type: "post",
                dataType: "json",
                url: mcn.ajax_url,
                data: { action: "homepage_ajax_load_project", params: $params },
                beforeSend: function () {
                    $(".section__new-project .mcn-ajax__load-project-home").empty();
                    $(".section__new-project .box-loading-animation").show();
                },
                success: function (response) {
                    if (response.success) {
                        $(".section__new-project .box-loading-animation").hide();
                        $(".section__new-project .mcn-ajax__load-project-home").html($(response.data));
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        });
    }

    Obj.menuSPHandleCallAjax = function () {
        let btnMenuSP = $('#header .mobile-menu button')
        let btnMenuSpFooter = $('.footer-btn-menu-sp')
        let loaded = false;
        btnMenuSP.on('click', function () {
            if (loaded) return;
            setTimeout(() => {
                Obj.first_load_post_ajax_headerMenu();
            }, 500);
            loaded = true;
        })
        btnMenuSpFooter.on('click', function () {
            if (loaded) return;
            setTimeout(() => {
                Obj.first_load_post_ajax_headerMenu();
            }, 500);
            loaded = true;
        })
    }

    Obj.first_load_post_ajax_headerMenu = function () {
        $.ajax({
            type: "post",
            dataType: "json",
            url: mcn.ajax_url,
            data: { action: "first_load_post_ajax_headerMenu" },
            beforeSend: function () {
                $(".c-header__menu-sp .box-news ul").empty();
                $(".c-header__menu-sp .box-loading-animation").show();
            },
            success: function (response) {
                if (response.success) {
                    $(".c-header__menu-sp .box-loading-animation").hide();
                    $(".c-header__menu-sp .box-news ul").html($(response.data));
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }

    Obj.ajax_filter_menu = function () {
        let $form = $('#form_filter_menu')
        let $danhmuc = $('input[name="danh-muc"]')
        let $dailymenuNav = $('.c-filter .p-menu_link ul li')
        let paged = 1;

        // DATA
        let dataDanhMucSlug = ''
        let arrNew;
        let dataDanhMucId = null

        let url = window.location.pathname;
        let urlNew = url.includes("/danh-muc/");
        if(urlNew) {
            let arr = url.split('/danh-muc/')[1];
            arrNew = arr.split('/')[0]
            dataDanhMucSlug = arrNew
        }


        const checkboxOnlyOne_checked = function (thisBox, groupBox, dataSlug) {
            let $this = thisBox;
            if ($this.is(":checked")) {
                $(groupBox).prop("checked", false);
                $this.prop("checked", true);
                dataSlug = $this.val();
            }else {
                dataSlug = ''
            }
            return dataSlug;
        }

        $danhmuc.on("change", function () {
            let thisBox = $(this)
            dataDanhMucSlug = checkboxOnlyOne_checked(thisBox, $danhmuc, dataDanhMucSlug);
            dataDanhMucId = thisBox.data('id')
            $('.title_menu_ajax').html($(this).data('title'))
        })


        $dailymenuNav.on('click', function (e) {
          e.preventDefault();
          $(this).addClass('active')
          $danhmuc.prop("checked", false)
          $('.title_menu_ajax').html($(this).data('title'))
          $.ajax({
            type: "post",
            dataType: "json",
            url: mcn.ajax_url,
            data: { action: "ajax_daily_menu"},
            beforeSend: function () {
                $('#load_ajax_menu-filter').empty();
                $("#load_ajax_menu-filter .c-list_menu").empty();
                $(".box-loading-animation").show();

                // ADD URL PARAMS
                window.history.pushState({}, '', '/menu');
                // END ADD URL PARAMS
            },
            success: function (response) {
                if (response.success) {
                    $(".box-loading-animation").hide();
                    $('#load_ajax_menu-filter').html(response.data);

                    if ($(window).width() > 750) {
                      $('html, body').animate({
                        scrollTop: $('.p-menu').offset().top
                    }, 300);
                    } else {
                      $('html, body').animate({
                        scrollTop: $('.p-menu_colR').offset().top
                      }, 300);
                    }
                }
                else {
                    $(".box-loading-animation").hide();
                    $('#load_ajax_menu-filter').empty();
                    $('#load_ajax_menu-filter').append('<div class="error-nopost">Không có dữ liệu nào được tìm thấy</div>')
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
        })

        $form.on("change", function () {
            $dailymenuNav.removeClass('active');
            let $params = {
                'danh-muc': dataDanhMucSlug,
                'id' : dataDanhMucId,
            };
            $.ajax({
                type: "post",
                dataType: "json",
                url: mcn.ajax_url,
                data: { action: "ajax_filter_menu", params: $params },
                beforeSend: function () {
                    // ADD URL PARAMS
                    let url = Object.keys($params)
                        .map(key => {
                            return ($params[key] !== '') ? `${key}=${$params[key]}` : `${key}`
                        })
                        .join('&');
                    window.history.replaceState({} ,null, '/menu');
                    // END ADD URL PARAMS
                    $('#load_ajax_menu-filter').empty();
                    $("#load_ajax_menu-filter .c-list_menu").empty();
                    $(".box-loading-animation").show();
                },
                success: function (response) {
                    if (response.success) {
                        $(".box-loading-animation").hide();
                        $('#load_ajax_menu-filter').html(response.data);

                        if ($(window).width() > 750) {
                          $('html, body').animate({
                            scrollTop: $('.p-menu').offset().top
                        }, 300);
                        } else {
                          $('html, body').animate({
                            scrollTop: $('.p-menu_colR').offset().top
                          }, 300);
                        }
                    }
                    else {
                        $(".box-loading-animation").hide();
                        $('#load_ajax_menu-filter').empty();
                        $('#load_ajax_menu-filter').append('<div class="error-nopost">Không có dữ liệu nào được tìm thấy</div>')
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                }
            });
        })
    }

    Obj.tabMenuDaili = function () {
      $('.c-page_menu .tab_menu_daily li').click(function(){
        var t = $(this).attr('id');

        if(!$(this).hasClass('active')){ //this is the start of our condition
          $('.c-page_menu .tab_menu_daily li').removeClass('active');
          $(this).addClass('active');

          $('.tab_menu_daily_content .content').hide();
          $('#'+ t + '_ct').fadeIn('slow');
       }
      });
    }

    /************************************************************
         * Obj Window load, ready, scroll, resize and functions
         *************************************************************/
    //Window load functions
    //
    $window.on('load', function () {

    });

    //Document ready functions
    $document.ready(function () {
        Obj.ajax_load_post_homepage();
        Obj.ajax_load_project__homepage();
        Obj.menuSPHandleCallAjax();
        Obj.ajax_filter_menu();
        Obj.tabMenuDaili();
    });

    //Window scroll functions
    $window.on('scroll', function () {

    });

    //Window resize functions
    $window.on('resize', function () {

    });

})(jQuery);
