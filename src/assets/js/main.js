let Obj = {};

(function ($) {
  "use strict";

  /************************************************************
   * Predefined letiables
   *************************************************************/
  let $window = $(window),
    $body = $("body"),
    $document = $(document);

  $.fn.exists = function () {
    return this.length > 0;
  };

  $.fn.isMobile = function () {
    if ($window.width() > 600) {
      return false;
    }
    return true;
  };

  let $header = document.querySelector("#header");
  let $btnScrollTop = document.querySelector(".c-footer .scrolltop");

  Obj.handelMenuClick = function () {
    let el = $(".c-header .p-buttonSp"),
      elMenu = ".c-header_sp",
      elButtonClose = ".c-header_sp .p-panelInfo_close";
    if (el.exists()) {
      el.bind("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass("open")) {
          $(this).removeClass("open");
          $(elMenu).removeClass("open");
          $body.removeClass("u-hidden");
        } else {
          $(this).addClass("open");
          $(elMenu).addClass("open");
          $body.addClass("u-hidden");
        }
      })
        .closest("body")
        .bind("click", function () {
          if (el.hasClass("open")) {
            el.removeClass("open");
            $(elMenu).removeClass("open");
            $body.removeClass("u-hidden");
          }
        });
    }
    $(elMenu).on("click", function (e) {
      e.stopPropagation();
    });
    $(elButtonClose).bind("click", function (e) {
      if (el.hasClass("open")) {
        el.removeClass("open");
        $(elMenu).removeClass("open");
        $body.removeClass("u-hidden");
      }
    });
  };

  Obj.handelMenuClickInfo = function () {
    let el = $("#button_info");
    let elPanelInfo = ".p-panelInfo";
    let elButtonClose = ".p-panelInfo .p-panelInfo_close";
    if (el.exists()) {
      el.bind("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass("open")) {
          $(this).removeClass("open");
          $(elPanelInfo).removeClass("open");
          $body.removeClass("u-hidden");
        } else {
          $(this).addClass("open");
          $(elPanelInfo).addClass("open");
        }
      })
        .closest("body")
        .bind("click", function () {
          if (el.hasClass("open")) {
            el.removeClass("open");
            $(elPanelInfo).addClass("open");
            $(elPanelInfo).removeClass("open");
          }
        });
    }
    $(".p-panelInfo_wrap").on("click", function (e) {
      e.stopPropagation();
    });
    $(elButtonClose).bind("click", function (e) {
      if ($(elPanelInfo).hasClass("open")) {
        $(elPanelInfo).removeClass("open");
      }
    });
  };

  Obj.menuCategoryClick = function () {
    let el = $(".c-widget__archive__link");
    if (el.exists()) {
      el.click(function (e) {
        e.stopPropagation();
        let $this = $(this);
        if ($this.parent().hasClass("active")) {
          $this.next().slideUp("fast", function () {
            $this.parent().removeClass("active");
          });
        } else {
          $this.next().slideDown("fast", function () {
            $this.parent().addClass("active");
          });
        }
      });
    }
  };

  Obj.gotop = function () {
    let elGoTop = $(".c-btn__gotop");
    if (elGoTop.exists() && !elGoTop.isMobile()) {
      checkOffsetEL($window);

      $window.scroll(function () {
        checkOffsetEL($(this));
      });
      clickBtn();
    } else {
      clickBtn();
    }

    function checkOffsetEL($obj) {
      if ($obj.scrollTop() > 700) {
        elGoTop.fadeIn(300);
      } else {
        elGoTop.fadeOut(300);
      }
    }

    function clickBtn() {
      elGoTop.click(function () {
        $("body, html").animate({ scrollTop: 0 }, 500);
      });
    }
  };

  Obj.smoothAnchor = function () {
    if (window.location.hash) {
      var hash = window.location.hash.slice(1);
      $("html, body").animate(
        {
          scrollTop: $("#" + hash).offset().top,
        },
        300
      );
    }
    $("a[href*=\\#]:not([href=\\#]):not([href=\\#menu_sp])").click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $("#" + this.hash.slice(1));
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top - 112,
            },
            1000
          );
          return false;
        }
      }
    });
  };

  Obj.customScrollbar = function () {
    let el = $(".scrollbar-chrome");
    if (el.exists()) {
      el.scrollbar();
    }
  };

  Obj.initAnimationScroll = function () {
    let scrollOff = $(".scrollToggle"),
      windowsTop = $window.scrollTop(),
      wh = $window.height();
    if (scrollOff.exists()) {
      scrollOff.each(function () {
        let scrollOffTop = $(this).offset().top;
        $(this).addClass("ani--scrollOff");
        if (
          windowsTop + wh - 20 > scrollOffTop &&
          $(this).hasClass("ani--scrollOff")
        ) {
          $(this).removeClass("ani--scrollOff").addClass("ani--scrollOn");
        } else {
          $(this).removeClass("ani--scrollOn").addClass("ani--scrollOff");
        }
      });
    }
  };


  Obj.menuSpMulti = () => {
    $(".c-header_sp .menu .menu-item-has-children .sub-menu").before(
      '<span class="js_toggle"><i class="fal fa-plus"></i></span>'
    );
    $(".c-header_sp .menu .js_toggle").click(function () {
      $(this).prev().toggleClass("active");
      var $next = $(this).next();
      if (!$next.is(":animated"))
        $next.slideToggle(300).prev().toggleClass("active");
      if ($(this).hasClass("active")) {
        $(this).html('<i class="fal fa-minus"></i>');
      } else {
        $(this).html('<i class="fal fa-plus"></i>');
      }
    });
  };

  // SCROLL ADD STICKY HEADER
  window.addEventListener("scroll", function () {
    if (window.scrollY != 0) {
      $header.classList.add("hasScroll");
    } else {
      $header.classList.remove("hasScroll");
    }
  });

  Obj.searchBoxHeader = () => {
    $('#js-hdSearch').click(() => {
      $header.classList.toggle("hasSearch");
    })
  }

  const funcMenuOpacity = (selector) => {
    var menuItems = document.querySelectorAll(selector + ' ul li a');
    
    menuItems.forEach(function(item) {
      item.addEventListener('mouseover', function() {
        menuItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.style.opacity = '0.3';
          }
        });
      });
  
      item.addEventListener('mouseout', function() {
        menuItems.forEach(function(otherItem) {
          otherItem.style.opacity = '1';
        });
      });
    });
  }

  const funcHandelMenuOpacityAll_open = (selector) => {
    var menuItems = document.querySelectorAll(selector + ' ul li a');
    menuItems.forEach(function(item) {
      menuItems.forEach(function(otherItem) {
        if (otherItem !== item) {
          otherItem.style.opacity = '0.3';
        }
      });
    });
  }
  const funcHandelMenuOpacityAll_close = (selector) => {
    var menuItems = document.querySelectorAll(selector + ' ul li a');
    menuItems.forEach(function(item) {
      menuItems.forEach(function(otherItem) {
        if (otherItem !== item) {
          otherItem.style.opacity = '1';
        }
      });
    });
  }
  
  const hoverMenuMega = () => {
    let liMenuHasMega = document.querySelector(".p-headerMenu ul li.hasMega");
    let menuMega = document.querySelector(".p-headerMenu_mega");

    liMenuHasMega.addEventListener('mouseenter', function() {
      menuMega.style.display = 'block';
      document.body.classList.add('mask');
    });
  
    liMenuHasMega.addEventListener('mouseleave', function() {
      menuMega.style.display = 'none';
      document.body.classList.remove('mask');
    });
  
    menuMega.addEventListener('mouseenter', function() {
      this.style.display = 'block';
      document.body.classList.add('mask');
      liMenuHasMega.classList.add('active');
      funcHandelMenuOpacityAll_open('.p-header');
    });
  
    menuMega.addEventListener('mouseleave', function() {
      this.style.display = 'none';
      document.body.classList.remove('mask');
      liMenuHasMega.classList.remove('active');
      funcHandelMenuOpacityAll_close('.p-header');
    });
  }

  Obj.hoverMenuOpacity = () => {
    funcMenuOpacity('.p-header');
    hoverMenuMega();
  }

  

  /************************************************************
   * Obj Window load, ready, scroll, resize and functions
   *************************************************************/
  //Window load functions
  //
  $window.on("load", function () {});

  //Document ready functions
  $document.ready(function () {
    Obj.gotop();
    Obj.smoothAnchor();
    Obj.customScrollbar();
    Obj.handelMenuClick();
    Obj.menuCategoryClick();
    Obj.handelMenuClickInfo();
    Obj.initAnimationScroll();
    Obj.menuSpMulti();
    Obj.searchBoxHeader();
    Obj.hoverMenuOpacity();
    
    if($body.isMobile()) {
      new Mmenu(document.querySelector("#menu_sp"));
    }else {
      $('body').removeClass('mm-wrapper mm-wrapper--position-left')
      $('.mm-page.mm-slideout').removeClass('mm-page mm-slideout')
    }
  });

  //Window scroll functions
  $window.on("scroll", function () {
    Obj.initAnimationScroll();
  });

  //Window resize functions
  $window.on("resize", function () {
    if($body.isMobile()) {
      new Mmenu(document.querySelector("#menu_sp"));
    }else {
      $('body').removeClass('mm-wrapper mm-wrapper--position-left')
      $('.mm-page.mm-slideout').removeClass('mm-page mm-slideout')
    }
  });
})(jQuery);

// JAVASCRIPT MCN HANDLE NAV MODAL

const handleWindow =  function () {
  let html = document.querySelector('html');
  let $header = document.querySelector('#header .c-header__bottom');
  let $footer = document.querySelector('.c-footer');

  let hasHeaderHeightVariable = !!getComputedStyle(document.documentElement).getPropertyValue('--header-height')
  let hasFooterHeightVariable = !!getComputedStyle(document.documentElement).getPropertyValue('--footer-height')

  if ($header && !hasHeaderHeightVariable) {
      html.style.setProperty('--header-height', ($header.clientHeight / 16) + 'rem');
  }
  if ($footer && !hasFooterHeightVariable) {
      html.style.setProperty('--footer-height', ($footer.clientHeight/ 16) + 'rem');
  }
}

let $body = document.querySelector('body');
let $buttonMenuSP = document.querySelector('.mobile-menu button');
let $modalMask = document.querySelector('.c-modal__mask');
let $header = document.querySelector('#header');
let $headerTop = document.querySelector('#header .c-header__top');
let $buttonMenuFooterSP = document.querySelector('.footer-btn-menu-sp');
let $navHeaderModal = document.querySelector('.c-header__menu-sp');

// NavMobile
const handleNavMobile_Open = function () {
  $navHeaderModal.classList.add('open-nav');
  $body.classList.add('no-scroll');
}



// MASK AND BODY MODAL
const handleMaskModal_Open = function () {
  $modalMask.classList.add('open-modal');
  $body.classList.add('no-scroll');
}


window.onload = function () {
  handleWindow();
};
// The resize isn't very necessary:
window.addEventListener('resize', function () {
  handleWindow();
});