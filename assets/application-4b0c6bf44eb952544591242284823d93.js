// var Connaught = {};
// Connaught.fullBleed = function() {
//   var images = $('.full-bleed').each(function() {
//     $(this).data('fullBleed', new FullBleed(this));
//   });
//   $(window).on('resize load', function() {
//     images.each(function() {
//       $(this).data('fullBleed').calculate();
//     });
//   }).trigger('resize');
// }
// Connaught.fadeIn = function() {
//   $('.cover').delay(1250).fadeOut();
// };
// Connaught.scrolling = {
//   initialize: function() {
//     this.setupScrollTrigger();
//     this.createButtonActions();
//   },
//   setupScrollTrigger: function() {
//     $('.introduction').addClass('js-sticking')
//     var sections = {
//       introduction: $('.introduction'),
//       locationImage: $('.location-image'),
//       design: $('.design'),
//       designImage: $('.design-image')
//     };
//     var wh = $(window).height();
//     var points = [
//       // 1. Fade out first introduction
//       {
//         introductionFirst: $('.introduction-first'),
//         from: function() { return 0; },
//         to: function() { return wh / 4; },
//         trigger: function(e) {
//           this.introductionFirst.css({
//             opacity: (100 - e.percent) / 100
//           });
//         }
//       },
//       // 2. Hide first introduction, show second
//       {
//         introductionFirst: $('.introduction-first'),
//         introductionSecond: $('.introduction-second'),
//         at: function() { return wh / 4; },
//         trigger: function(e) {
//           if (e.direction === 1) {
//             this.introductionFirst.hide();
//             this.introductionSecond.css('display', 'inline-block');
//           }
//           if (e.direction === -1) {
//             this.introductionFirst.css('display', 'inline-block');
//             this.introductionSecond.hide();
//           }
//         }
//       },
//       // 3. Fade in second introduction
//       {
//         introductionSecond: $('.introduction-second'),
//         from: function() { return wh / 4; },
//         to: function() { return wh / 2; },
//         trigger: function(e) {
//           this.introductionSecond.css({
//             opacity: e.percent / 100
//           });
//         }
//       },
//       // 4. Fade out second introduction
//       {
//         introductionSecond: $('.introduction-second'),
//         from: function() { return wh; },
//         to: function() {
//           return wh * 1.5;
//         },
//         trigger: function(e) {
//           this.introductionSecond.css({
//             opacity: (100 - e.percent) / 100
//           });
//         }
//       },
//       // 5. Unsticky introduction section, sticky location image
//       {
//         at: function() { return sections.locationImage.data('start') * wh; },
//         trigger: function(e) {
//           if (e.direction === 1) {
//             sections.introduction.removeClass('js-sticking');
//             sections.locationImage.addClass('js-sticking');
//           } else {
//             sections.introduction.addClass('js-sticking');
//             sections.locationImage.removeClass('js-sticking');
//           }
//         }
//       },
//       {
//         information: sections.locationImage.find('.information'),
//         from: function() { return sections.locationImage.data('start') * wh; },
//         to: function() { return (sections.locationImage.data('start') * wh) + (wh/4); },
//         trigger: function(e) {
//           this.information.css({
//             opacity: e.percent / 100
//           });
//         }
//       },
//         // 5.2 Scald3D location image
//         {
//           image: sections.locationImage.find('.full-bleed'),
//           from: function() { return (sections.locationImage.data('start') -1) * wh; },
//           to: function() { return (sections.locationImage.data('end') + 1) * wh; },
//           trigger: function(e) {
//             var scale = ((100 - (e.percent/5)) + 20) / 100;
//             var fb = this.image.data('fullBleed');
//             fb.scale = scale;
//             fb.calculate();
//           }
//         },
//         // 5.3 Location image unstick
//         {
//           at: function() { return sections.locationImage.data('end') * wh; },
//           trigger: function(e) {
//             if (e.direction === 1) {
//               sections.locationImage.removeClass('js-sticking');
//               sections.locationImage.addClass('js-ended');
//             } else {
//               sections.locationImage.addClass('js-sticking');
//               sections.locationImage.removeClass('js-ended');
//             }
//           }
//         },
//       // 6. At top of first design, make sticky
//       {
//         at: function() { return sections.design.data('start') * wh; },
//         trigger: function(e) {
//           if (e.direction === 1) {
//             sections.design.addClass('js-sticking');
//           } else {
//             sections.design.removeClass('js-sticking');
//           }
//         }
//       },
//       // 7. Fade out first design
//       {
//         designFirst: $('.design-first'),
//         from: function() { return sections.design.data('start') * wh; },
//         to: function() { return this.from() + (wh/4); },
//         trigger: function(e) {
//           this.designFirst.css({
//             opacity: (100 - e.percent) / 100
//           });
//         }
//       },
//       // 8. Hide first design, show second
//       {
//         designFirst: $('.design-first'),
//         designSecond: $('.design-second'),
//         at: function() { return sections.design.data('start') * wh + (wh / 4); },
//         trigger: function(e) {
//           if (e.direction === 1) {
//             this.designFirst.hide();
//             this.designSecond.css('display', 'inline-block');
//           }
//           if (e.direction === -1) {
//             this.designFirst.css('display', '');
//             this.designSecond.hide();
//           }
//         }
//       },
//       // Design second fade in
//       {
//         designSecond: $('.design-second'),
//         from: function() { return sections.design.data('start') * wh + (wh / 4); },
//         to: function() { return this.from() + (wh/4); },
//         trigger: function(e) {
//           this.designSecond.css({
//             opacity: e.percent / 100
//           });
//         }
//       },
//       // Design second + signature fade out
//       {
//         designSecond: $('.design-second, .design-signature'),
//         from: function() { return (sections.design.data('end') * wh) - wh; },
//         to: function() { return this.from() + (wh/4); },
//         trigger: function(e) {
//           this.designSecond.css({
//             opacity: (100 - e.percent) / 100
//           });
//         }
//       },
//       {
//         at: function() { return sections.designImage.data('start') * wh; },
//         trigger: function(e) {
//           if (e.direction === 1) {
//             sections.design.removeClass('js-sticking');
//             sections.designImage.addClass('js-sticking');
//           } else {
//             sections.design.addClass('js-sticking');
//             sections.designImage.removeClass('js-sticking');
//           }
//         }
//       },
//       {
//         image: sections.designImage.find('.full-bleed'),
//         from: function() { return (sections.designImage.data('start') * wh) - wh; },
//         to: function() { return sections.designImage.data('end') * wh; },
//         trigger: function(e) {
//           var scale = ((100 - (e.percent/10)) + 10) / 100;
//           var fb = this.image.data('fullBleed');
//           fb.scale = scale;
//           fb.calculate();
//           sections.designImage.find('.information').css({
//             opacity: Math.min(e.percent / 50, 1)
//           });
//         }
//       }
//     ];
//     // /////////////////////////
//     // Next button triggers
//     // /////////////////////////
//     var trigger = new ScrollTrigger({ points: points });
//     $(window).on('scroll', function() {
//       trigger.checkPoints();
//     });
//     $(window).on('resize', function() {
//       wh = $(window).height();
//       trigger.refresh();
//     })
//   },
//   createButtonActions: function() {
//     var actions = {
//       introductionFirstNext: function() {
//         $('body').animate({
//           scrollTop: $(window).height() / 2
//         }, 1000);
//       },
//       introductionSecondNext: function() {
//         $('body').animate({
//           scrollTop: $(window).height() * 3
//         }, 1000);
//       },
//       locationImageNext: function() {
//         $('body').animate({
//           scrollTop: $(window).height() * 5
//         }, 1000);
//       },
//       designFirstNext: function() {
//         $('body').animate({
//           scrollTop: $(window).height() * 6
//         }, 1000);
//       },
//       designSecondNext: function() {
//         $('body').animate({
//           scrollTop: $(window).height() * 8
//         }, 1000);
//       },
//       designImageNext: function() {
//         $('body').animate({
//           scrollTop: $(window).height() * 9
//         }, 1000);
//       },
//       backToTop: function() {
//         $('.cover').fadeIn(function(){
//           $('body').animate({ scrollTop: $(window).height() * 0 }, 800, function(){
//             $('.cover').fadeOut();
//           });
//         });
//       }
//     }
//     $('.introduction-first .next').click(actions.introductionFirstNext);
//     $('.introduction-second .next').click(actions.introductionSecondNext);
//     $('.location-image .next').click(actions.locationImageNext);
//     $('.design-first .next').click(actions.designFirstNext);
//     $('.design-second .next').click(actions.designSecondNext);
//     $('.design-image .next').click(actions.designImageNext);
//     $('.details .next').click(actions.backToTop);
//   }
// };
// $(function() {
//   Connaught.fadeIn();
//   Connaught.fullBleed();
//   Connaught.scrolling.initialize();
// });
// //
// // TS
// //
// // Click first arrow to fade out and fade in intro-2
// // $('.introduction .next').click(function(){
// //   $('.introduction-first').fadeOut(function(){
// //     $('.introduction-second').fadeIn().css("display","inline-block", function(){
// //     });
// //   });
// // });
// // Click second arrow to fade out h1 and scroll to location image and fade in info
// // $('.introduction-second .next').click(function(){
// //   $('.introduction-second h1').fadeOut(function(){
// //     $("html, body").delay(400).animate({scrollTop: $('.location-image').offset().top }, 1000, function(){
// //       $('.location-image .information').fadeIn();
// //     });
// //   });
// // });
// // // Click third arrow to fade out and fade in pull quote with signature
// // $('.location-image .next').click(function(){
// //   $("html, body").delay(300).animate({scrollTop: $('.design').offset().top }, 1000, function(){
// //   });
// // });
// // // Click 
// // $('.design-first .next').click(function(){
// //   $('.design-first').fadeOut(function(){
// //     $('.design-second').fadeIn(function(){
// //     });
// //   });
// // });
/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};typeof t=="object"?i=e.extend(i,t):e.isFunction(n)?i=e.extend(i,{over:t,out:n,selector:r}):i=e.extend(i,{over:t,out:t,selector:n});var s,o,u,a,f=function(e){s=e.pageX,o=e.pageY},l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity)return e(n).off("mousemove.hoverIntent",f),n.hoverIntent_s=1,i.over.apply(n,[t]);u=s,a=o,n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)},c=function(e,t){return t.hoverIntent_t=clearTimeout(t.hoverIntent_t),t.hoverIntent_s=0,i.out.apply(t,[e])},h=function(t){var n=jQuery.extend({},t),r=this;r.hoverIntent_t&&(r.hoverIntent_t=clearTimeout(r.hoverIntent_t)),t.type=="mouseenter"?(u=n.pageX,a=n.pageY,e(r).on("mousemove.hoverIntent",f),r.hoverIntent_s!=1&&(r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval))):(e(r).off("mousemove.hoverIntent",f),r.hoverIntent_s==1&&(r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)))};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery),function(e){function t(){var t=window.innerHeight,n=document.compatMode;if(n||!e.support.boxModel)t=n=="CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight;return t}e(window).scroll(function(){var n=t(),r=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,i=[];e.each(e.cache,function(){this.events&&this.events.inview&&i.push(this.handle.elem)}),i.length&&e(i).each(function(){var t=e(this),i=t.offset().top,s=t.height(),o=t.data("inview")||!1;r>i+s||r+n<i?o&&(t.data("inview",!1),t.trigger("inview",[!1])):r<i+s&&(o||(t.data("inview",!0),t.trigger("inview",[!0])))})}),e(function(){e(window).scroll()})}(jQuery),function(){var e=/(MSIE [7-9]\.|Opera.*Version\/(10\.[5-9]|(11|12)\.)|Chrome\/([1-9]|10)\.|Version\/[2-4][\.0-9]+ Safari\/|Version\/(4\.0\.[4-9]|4\.[1-9]|5\.0)[\.0-9]+? Mobile\/.*Safari\/|Android [1-2]\.|BlackBerry.*WebKit)/.test(navigator.userAgent)&&!/(IEMobile)/.test(navigator.userAgent);if(!e)return;var t={icons:{social:{"five hundred pixels":"",fivehundredpixels:"","five hundred px":"","github octocat":"","stack overflow":"",fivehundredpx:"",githuboctocat:"",stackoverflow:"","google plus":"","app dot net":"",kickstarter:"",googleplus:"",foursquare:"",soundcloud:"",blackberry:"",appdotnet:"",wordpress:"",posterous:"",instagram:"",pinterest:"","thumbs up":"👍",microsoft:"",facebook:"",linkedin:"","google +":"",readmill:"",pinboard:"",dribbble:"",envelope:"✉",thumbsup:"👍",twitter:"","google+":"","app.net":"",blogger:"",youtube:"",dropbox:"",behance:"",octocat:"",spotify:"","last fm":"",approve:"👍",windows:"",android:"",zerply:"",reddit:"",tumblr:"",flickr:"","500 px":"",svpply:"",github:"",paypal:"",lastfm:"",vimeo:"","500px":"",skype:"",email:"✉",share:"",apple:"",yelp:"",rdio:"",mail:"✉",like:"👍",rss:""}},query:function(){if(document.querySelectorAll)return document.querySelectorAll(".ss-icon");var e=new RegExp("(^| )ss-icon( |$)"),t=document.getElementsByTagName("*"),n=[];for(var r=0,i=t.length;r<i;r++)e.test(t[r].className)&&n.push(t[r]);return n},initialize:function(e){var t=this.query();for(var n=0,r=t.length;n<r;n++)this.traverse(t[n])},traverse:function(e){for(var t=0,n=e.childNodes.length;t<n;t++){var r=e.childNodes[t];r.nodeType===3?this.replace(r):this.traverse(r)}},replace:function(e){for(var t in this.icons){if(!this.icons.hasOwnProperty(t))continue;var n=this.icons[t];for(var r in n){if(!n.hasOwnProperty(r))continue;var i=new RegExp(r,"gi");e.nodeValue=e.nodeValue.replace(i,n[r])}}}}.initialize()}();var WA={};WA.burger=function(){function r(){e.slideDown(),t.addClass("active")}function i(n){var r=$(n.relatedTarget);if(r.is(e))return;if(r.is(t))return;if($.contains(e[0],r[0]))return;e.slideUp(),t.removeClass("active")}var e=$("#nav"),t=$(".burger .container a"),n=e.add(t);t.hoverIntent({over:r,interval:60,sensitivity:50}),n.on("mouseout",i)},WA.introductionHeight=function(){var e=$(".home .introduction");$(window).load(function(){$(window).width()<481?e.css():e.css({height:$(window).height()-50+"px"})}),$(window).resize(function(){$(window).width()<481?e.css():e.css({height:$(window).height()-50+"px"})})},WA.fadeInHomePage=function(){var e=$(".home .introduction, .home .introduction p, .page-contact .introduction .container p, #footer, #legals");e.delay(500).fadeIn(300)},$(function(){WA.burger(),WA.introductionHeight(),WA.fadeInHomePage()});