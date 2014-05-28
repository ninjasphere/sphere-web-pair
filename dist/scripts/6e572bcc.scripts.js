"use strict";angular.module("sphereWebPairApp",["ngResource","ngSanitize","ngRoute","hmTouchEvents"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("sphereWebPairApp").value("SERVER",window.location.protocol+"//"+window.location.hostname).value("USER_LOADED","userLoaded").value("LOADED","loaded"),angular.module("sphereWebPairApp").run(["$rootScope","$resource","$timeout","SERVER","LOADED","USER_LOADED",function(a,b,c,d,e,f){var g=function(b){a.$broadcast(e),a.$broadcast(f,b),a.User=b},h=b("/rest/v1/user",{});h.get(function(a){g(a)},function(){window.location.href="/auth/ninja"})}]),angular.module("sphereWebPairApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),function(a){function b(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function c(a,c){this.el=a,this.options=b({},this.options),b(this.options,c),this._init()}c.prototype.options={speedIn:500,easingIn:mina.linear},c.prototype._init=function(){var a=Snap(this.el.querySelector("svg"));this.path=a.select("path"),this.initialPath=this.path.attr("d");var b=this.el.getAttribute("data-opening");if(this.openingSteps=b?b.split(";"):"",this.openingStepsTotal=b?this.openingSteps.length:0,0!==this.openingStepsTotal){var c=this.el.getAttribute("data-closing")?this.el.getAttribute("data-closing"):this.initialPath;this.closingSteps=c?c.split(";"):"",this.closingStepsTotal=c?this.closingSteps.length:0,this.isAnimating=!1,this.options.speedOut||(this.options.speedOut=this.options.speedIn),this.options.easingOut||(this.options.easingOut=this.options.easingIn)}},c.prototype.show=function(){if(this.isAnimating)return!1;this.isAnimating=!0;var a=this,b=function(){classie.addClass(a.el,"pageload-loading")};this._animateSVG("in",b),classie.add(this.el,"show")},c.prototype.hide=function(){var a=this;classie.removeClass(this.el,"pageload-loading"),this._animateSVG("out",function(){a.path.attr("d",a.initialPath),classie.removeClass(a.el,"show"),a.isAnimating=!1})},c.prototype._animateSVG=function(a,b){var c=this,d=0,e="out"===a?this.closingSteps:this.openingSteps,f="out"===a?this.closingStepsTotal:this.openingStepsTotal,g="out"===a?c.options.speedOut:c.options.speedIn,h="out"===a?c.options.easingOut:c.options.easingIn,i=function(a){return a>f-1?void(b&&"function"==typeof b&&b()):(c.path.animate({path:e[a]},g,h,function(){i(a)}),void a++)};i(d)},a.SVGLoader=c}(window),angular.module("sphereWebPairApp").directive("svgLoader",["$rootScope","$timeout","LOADED",function(a,b,c){return{restrict:"A",link:function(d,e){var f=new SVGLoader(e[0],{speedIn:300,easingIn:mina.easeinout}),g=e.find(".loading");a.$on(c,function(){f.show(),g.remove(),b(function(){e.remove(),f=null},400)})}}}]),angular.module("sphereWebPairApp").controller("PairControllerCtrl",["$rootScope","$scope","$resource","SERVER","USER_LOADED",function(a,b,c,d,e){var f=c(d+"/rest/v1/node");a.IsPaired=!1,b.User,b.Node,b.PairSphere=function(){this.formPair.$valid&&f.save({nodeId:b.Serial},function(a){a.node_id&&b.PairSuccess(a)})},b.PairSuccess=function(c){a.IsPaired=!0,b.Node=c},a.$on(e,function(a,c){b.User=c})}]);