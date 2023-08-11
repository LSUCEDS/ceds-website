/*==========================================
=            Viewport Buggyfill            =
==========================================*/

window.viewportUnitsBuggyfill.init({
  refreshDebounceWait: 50,
  hacks: window.viewportUnitsBuggyfillHacks
});


jQuery(document).ready(function($) {


/*===================================
=            QuickSearch            =
===================================*/

$('#search-people').quicksearch('.list-options-people li');
$('#search-tags').quicksearch('.list-options-tags li');

/*===========================================
=            Ajax Filter Projecs            =
===========================================*/
$(".btn-clear").click(function(e) {
  $(this).closest('form').find("input[type=checkbox]").attr('checked',false);
  e.preventDefault();
});

function urlCheck() {
  if (window.location.href.indexOf('program') > -1) {
    $program_property = program;
  } else {
    $program_property = '';
  }
}

var listProjectCards = $('#list-project-cards');

$(function() {
  $('#categories-filter-form').submit(function(e) {
    $('#tags-filter-form').find("input[type=checkbox]").attr('checked',false);
    $('.btn-status').removeClass('selected');
    $('#btn-update-categories').addClass('animate');
    listProjectCards.addClass('js-loading');
    urlCheck();
    var terms = new Array();
    var fields = $(this).serializeArray();
    $.each( fields, function( i, field ) {
      terms.push(field.value);
    });
    if ($("input[type=checkbox]:checked").length === 0) {
      location.reload();
      return false;
    } else {
      $.ajax({
        type: 'GET',
        url: siteUrl+'/ajax-filter-projects/',
        data: { terms: terms, program: $program_property },
        success: function(data) {
          if ( '' != $.trim(data) ) {
            listProjectCards.html(data);
            listProjectCards.removeClass('js-loading');
          } else {
            listProjectCards.html('No more projects available');
            console.log('error');
          }
        }
      }); //ajax
      $('#btn-update-categories').removeClass('animate');
    }
    e.preventDefault();
  });
});

$(function() {
  $('#tags-filter-form').submit(function(e) {
    $('#categories-filter-form').find("input[type=checkbox]").attr('checked',false);
    $('.btn-status').removeClass('selected');
    listProjectCards.addClass('js-loading');
    urlCheck();
    var tags = new Array();
    var fields = $(this).serializeArray();
    $.each( fields, function( i, field ) {
      tags.push(field.value);
    });
    if ($("input[type=checkbox]:checked").length === 0) {
      location.reload();
      return false;
    } else {
      $.ajax({
        type: 'GET',
        url: siteUrl+'/ajax-filter-projects/',
        data: { tags: tags, program: $program_property },
        success: function(data) {
          if ( '' != $.trim(data) ) {
            listProjectCards.html(data);
            listProjectCards.removeClass('js-loading');
          } else {
            listProjectCards.html('No more projects available');
            console.log('error');
          }
        }
      }); //ajax
    }
    e.preventDefault();
  });
});

$(function() {
  $('.btn-status').click(function(e) {
    $('.btn-status').removeClass('selected');
    $(this).addClass('selected');
    $('#categories-filter-form, #tags-filter-form').find("input[type=checkbox]").attr('checked',false);
    listProjectCards.addClass('js-loading');
    urlCheck();
    var status = $(this).attr('data-value');
    $.ajax({
      type: 'GET',
      url: siteUrl+'/ajax-filter-projects/',
      data: { status: status, program: $program_property },
      success: function(data) {
        if ( '' != $.trim(data) ) {
          listProjectCards.html(data);
          listProjectCards.removeClass('js-loading');
        } else {
          listProjectCards.html('No more projects available');
          console.log('error');
        }
      }
    }); //ajax
    e.preventDefault();
  });
});

/*===================================
=            Header Menu            =
===================================*/
$('.header-menu-toggle').click(function (e) {
  $(this).toggleClass('is-active');
  $('#header-menu').toggleClass('is-active');
  $('#site-content, #footer, .header-logo').addClass('js-blur');
  $('#site-wrapper').addClass('js-overlay');
  e.preventDefault();
});

$('.header-menu-close').click(function (e) {
  $('.header-menu-toggle').toggleClass('is-active');
  $('#header-menu').toggleClass('is-active');
  $('#site-content, #footer, .header-logo').removeClass('js-blur');
  $('#site-wrapper').removeClass('js-overlay');
  e.preventDefault();
});


/*====================================
=            Hero Section            =
====================================*/

var heroHeight = debounce(function() {
  if (window.innerWidth > 767) {
    var headerHeight = $('#header').outerHeight();
    var windowHeight = $( window ).height();
    calcHeight = windowHeight - headerHeight;
    $('.page-hero-section > .container-fluid').css({
      'height': calcHeight
    });
  } else {
    $('.page-hero-section > .container-fluid').css({
      'height': 'auto'
    });
  }
}, 200);
window.addEventListener('resize', heroHeight);
heroHeight();


/*==========================================
=            Home Events Slider            =
==========================================*/
var mySwiper = new Swiper ('#home-events-slider', {
  keyboardControl: true,
  nextButton: '.home-events-next',
  prevButton: '.home-events-prev',
});

/* Set Negative margin for events slider to write off the translateY for box */
var boxMargin = debounce(function() {
  if (window.innerWidth > 767) {
    $boxHeight = $('.swiper-slide .box').outerHeight();
    $('.home-events-slider').css({
      'margin-bottom': -$boxHeight / 2
    });
  } else {
    $('.home-events-slider').css({
      'margin-bottom': -70, //same as default css
    });
  }
}, 200);
window.addEventListener('resize', boxMargin);
boxMargin();

/*=============================================
=            Single Project Slider            =
=============================================*/
var mySwiper = new Swiper ('#single-project-slider', {
  keyboardControl: true,
  nextButton: '.project-slider-next',
  prevButton: '.project-slider-prev',
});


/*==========================================
=            Home Video Section            =
==========================================*/
$('.popup-video').magnificPopup({
  type: 'iframe',
  removalDelay: 300,
  mainClass: 'mfp-fade',
  fixedContentPos: false //disable scrollbar
});


$('.home-video-section .container-fluid').click(function(e) {
  $(this).addClass('js-active');
  e.preventDefault();
});

$('.home-video-close').click(function(e) {
  $('.home-video-section .container-fluid').removeClass('js-active');
});


/*=============================================
=            Project Output Filter            =
=============================================*/
$publicationsContainer = $('#list-publications');
$publicationsContainer.imagesLoaded(function(){
  $publicationsContainer.isotope();
});

$('#list-publications-tags a').click(function(){
  var selector = $(this).attr('data-filter');
  $publicationsContainer.isotope({
    filter: selector
  });
  return false;
});

// Filter categories
var $optionSets = $('#list-publications-tags'),
$optionLinks = $optionSets.find('a');
$optionLinks.click(function(){
  var $this = $(this);
  // don't proceed if already selected
  if ( $this.hasClass('js-active') ) {
    return false;
  }
  var $optionSet = $this.parents('#list-publications-tags');
  $optionSet.find('.js-active').removeClass('js-active');
  $this.addClass('js-active');
});


$presentationsContainer = $('#list-presentations');
$presentationsContainer.imagesLoaded(function(){
  $presentationsContainer.isotope();
});

$('#list-presentations-tags a').click(function(){
  var selector = $(this).attr('data-filter');
  $presentationsContainer.isotope({
    filter: selector
  });
  return false;
});

// Filter categories
var $optionSets = $('#list-presentations-tags'),
$optionLinks = $optionSets.find('a');
$optionLinks.click(function(){
  var $this = $(this);
  // don't proceed if already selected
  if ( $this.hasClass('js-active') ) {
    return false;
  }
  var $optionSet = $this.parents('#list-presentations-tags');
  $optionSet.find('.js-active').removeClass('js-active');
  $this.addClass('js-active');
});


/*======================================
=            Sticky Sidebar            =
======================================*/
var stickySidebar = debounce(function() {
  if (window.innerWidth > 767) {
    var footerHeight = $('#footer').outerHeight();
    $( "#sticky-sidebar-block" ).sticky({
      bottomSpacing: footerHeight
    });
  }
}, 200);
window.addEventListener('resize', stickySidebar);
stickySidebar();


/*=========================================
=            ScrollSpy Sidebar            =
=========================================*/
var lastId,topMenu=$(".list-scrollspy"),menuItems=topMenu.find("a[href^='#']"),scrollItems=menuItems.map(function(){var a=$($(this).attr("href"));if(a.length){return a}});menuItems.click(function(c){var a=$(this).attr("href"),b=a==="#"?0:$(a).offset().top+1;$("html, body").stop().animate({scrollTop:b},300);c.preventDefault()});$(window).scroll(function(){var a=$(this).scrollTop();var b=scrollItems.map(function(){if($(this).offset().top<a){return this}});b=b[b.length-1];var c=b&&b.length?b[0].id:"";if(lastId!==c){lastId=c;menuItems.parent().removeClass("js-active").end().filter("[href='#"+c+"']").parent().addClass("js-active")}});


/*=====================================
=            Smooth Scroll            =
=====================================*/
smoothScroll.init({
  speed: 300, // Integer. How fast to complete the scroll in milliseconds
  // easing: 'easeOut', // Easing pattern to use
});


/*========================================
=            Awards Accordion            =
========================================*/
$('.list-awards .content-block').css({'display': 'none'});

$('.list-awards .heading').click(function(){$('.list-awards .heading').removeClass('js-active');$('.list-awards .content-block').slideUp('fast');if($(this).next().is(':hidden')==true){$(this).addClass('js-active');$(this).next().slideDown('fast')}});



/*===============================
=            Sharrre            =
===============================*/
$('.sharrre-block .twitter').sharrre({
  share: { twitter: true },
  enableHover: false,
  enableTracking: true,
  //buttons: { twitter: {via: '_JulienH'}},
  click: function(api, options){
    api.simulateClick();
    api.openPopup('twitter');
  }
});

$('.sharrre-block .facebook').sharrre({
  share: { facebook: true },
  enableHover: false,
  enableTracking: true,
  click: function(api, options){
    api.simulateClick();
    api.openPopup('facebook');
  }
});

$('.sharrre-block .gplus').sharrre({
  share: { googlePlus: true },
  enableHover: false,
  enableTracking: true,
  urlCurl: '',
  click: function(api, options){
    api.simulateClick();
    api.openPopup('googlePlus');
  }
});

$('.sharrre-block .pinterest').sharrre({
  share: { pinterest: true },
  enableHover: false,
  enableTracking: true,
  click: function(api, options){
    api.simulateClick();
    api.openPopup('pinterest');
  }
});


/*=====================================
=            Scroll to top            =
=====================================*/
$('#scroll-top').click(function(e){e.preventDefault();$('html, body').animate({scrollTop:0},300);});

var scrollToTop = debounce(function() {
  if ( $(this).width() > 767 ) {
    if($(this).scrollTop() > 200) {
      $('#scroll-top').fadeIn(200);
    } else {
      $('#scroll-top').fadeOut(200);
    }
  }
}, 200);
window.addEventListener('scroll', scrollToTop);


/*=====================================
=            WOW Init                 =
=====================================*/
/**
 *
 * Check CSS animation support
 *
 */
if ( Modernizr.cssanimations ) {
  Visibility.onVisible(function () {
    var wow = new WOW().init();
  });
} else {
  $('.wow').css('visibility', 'visible');
}


/*===================================
=            Sitemap Tabs            =
===================================*/

$('#sitemap-tabs').responsiveTabs({
    startCollapsed: 'accordion'
});


/*=======================================
=            Spam Protection            =
=======================================*/
$("body").emailSpamProtection("email");

}); // Document Ready
