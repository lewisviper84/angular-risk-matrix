(function(){
	/*
	$
		config.likelihoodtitle = 'Probabilidad';
		config.impacttitle = 'Impacto';
		config.minX = 1;
		config.minY = 5;
		config.maxX = 1;
		config.maxY = 5;
	*/
	var riskMatrix = angular.module('riskMatrix', [])

	.directive('riskMatrix', ['$compile',function($compile) {
		return {
			restrict: 'E',
			scope: {
				items: '=data',
				likelihood: '=likelihood',
				impact: '=impact',
				config: '=config',
				template: '=?template'				
			},
			link: function(scope, element, attrs) {
				var createMatrix = function(template){
					var rm = $compile(template)(scope);
					element.empty();
					element.append(rm);
					rm.css('height',(rm[0].clientWidth)+'px'); //make a square grid
					
					var col, posx, poxy, incrposx, incrposy = 0;
					
					//Print legend axis X
					posx=0;
					//100% / Longitud de items
					incrposx=100/scope.config.legendX.length;
					incrposy=100/scope.config.legendY.length;
					
					scope.config.legendX.forEach(function(element) {						
						rm.append('<div class="risk-box rowrisk-titulo" style="left:'+posx+'%;width:'+incrposx+'%;height:'+incrposy+'%;"><span>'+element+'</span></div>');						
						posx+=incrposx;
						col++;
					});
					
					//Print legend axis Y
					row=0;
					posy=100 - incrposy;					
					scope.config.legendY.forEach(function(element) {	
						rm.append('<div class="risk-box colrisk-titulo" style="top:'+posy+'%;width:'+incrposx+'%;height:'+incrposy+'%;"><span>'+element+'</span></div>');												
						posy-=incrposy;
						row++;
					});
					
					//Print grid
					for (col=0;col < scope.config.legendX.length; col++)
					{
						if (col==0)
						{
							posx = 0;
						}
						else
						{
							posx = ((100/scope.config.legendX.length)*col);
						}
							
						for (row=0;row< scope.config.legendY.length ; row++)
						{
							if (row == 0)
							{
								posy = 0;
							}
							else
							{
								posy = ((100/scope.config.legendY.length)*row);
							}
							incrposx=(100/scope.config.legendX.length)-1;
							incposy=(100/scope.config.legendY.length)-1;
							rm.append('<div class="risk-box grid" style="left:'+posx+'%; top:'+posy+'%;width:'+incrposx+'%;height:'+incrposy+'%;"></div>');
						}
					}
					
					col = 0;
					row = 0;
					left = 0;
					top = 0;
					
				};
				if(attrs.template){
					//Not Data
					scope.$watch('template', function(){
						if(scope.template){
						}
							createMatrix('<div class="risk-matrix">'+
									'<div class="left-label">'+scope.config.likelihoodtitle+'</div>'+
									'<div class="bottom-label">'+scope.config.impacttitle+'</div>' +
									'<div style="border-left: solid thin #4d4d33;' +
									'border-bottom: solid thin #4d4d33; '+
									'position:absolute;'+
									'width:99%;'+
									'height:99%;' +
									'background-image: -webkit-gradient(linear,right top,left bottom, color-stop(0.15,#ff4d4d ),color-stop(0.50, #f9f053),color-stop(0.9, #4dff4d)); ' +
									'background-image: -o-linear-gradient(left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);	' +
									'background-image: -moz-linear-gradient(left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);'+
									'background-image: -webkit-linear-gradient(left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);' +
									'background-image: -ms-linear-gradient(left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%); ' + 
									'background-image: linear-gradient(to left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);"> ' +
									'<div risk-matrix-item ng-repeat="item in items" class="risk-matrix-item" style="position:absolute;">'+scope.template+'</div>'+
									'</div></div>');
					});
				}
				else{
					//With Data
					createMatrix('<div class="risk-matrix">'+
						'<div class="left-label">'+scope.config.likelihoodtitle+'</div>'+
						'<div class="bottom-label">'+scope.config.impacttitle+'</div>' +
						'<div style="border-left: solid thin #4d4d33;'+ 
						'border-bottom: solid thin #4d4d33;'+
						'position:absolute;'+
						'width:99%;'+
						'height:99%;'+
						'background-image: -webkit-gradient(linear,right top,left bottom, color-stop(0.15,#ff4d4d ),color-stop(0.50, #f9f053),color-stop(0.9, #4dff4d));'+
						'background-image: -o-linear-gradient(left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);	' +
						'background-image: -moz-linear-gradient(left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);' +
						'background-image: -webkit-linear-gradient(left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);'+
						'background-image: -ms-linear-gradient(left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);'+
						'background-image: linear-gradient(to left bottom, #ff4d4d 15%,  #f9f053 50%, #4dff4d 90%);">'+
						'<div risk-matrix-item ng-repeat="item in items" class="risk-matrix-item" style="position:absolute;">'+
						'<div class="closed">'+
						'<span ng-bind="item.Id"></span>'+
						'</div>'+
						'<div class="open">'+
						'<div class="title" ng-bind="item.title"></div>'+
						'<div clasS="title" ng-bind="item.Id"></div>'+
						'<div ng-bind="\''+ scope.config.likelihoodtitle +': \'+item.RiskLikelihood"></div>'+
						'<div ng-bind="\''+ scope.config.impacttitle +': \'+item.RiskImpact"></div>'+
						'</div>'+
						'</div>'+
						'</div></div>');
				}
			}
		};
	}])
	
	.directive('riskMatrixItem', ['$timeout',function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				//define grid (Creo)
				element.css({left:((Math.random()*90)+5)+'%', bottom:((Math.random()*90)+5)+'%'});
				scope.$watch('item',function(){
					$timeout(
						function(){
							//move item positions
							var posx, posy, incrposx,incrposy,itemwidth, itemheight = 0;
							
							incrposx=100/scope.config.legendX.length;
							incrposy=100/scope.config.legendY.length;
							
							//Ajustar el item a la cuadrilla
							
							minX = (parseInt(scope.item.RiskImpact - 1)) * incrposx;
							maxX = (parseInt(scope.item.RiskImpact)) * incrposx;							
							minY = (parseInt(scope.item.RiskLikelihood) - 1) * incrposy;
							maxY = (parseInt(scope.item.RiskLikelihood)) * incrposy;
							
							itemwidth = element.width;
							itemheight = element.height;
							
							//Luego Centrar y generar un aleatorio para que no queden encima
							
							if (Math.round(Math.random())==0)
							{							
								posx = minX + ((maxX-minX)/2) + (Math.random()*5);
								posy = maxY - ((maxY-minY)/2) + (Math.random()*5);
							}
							else
							{
								posx = minX + ((maxX-minX)/2) - (Math.random()*5);
								posy = maxY - ((maxY-minY)/2) - (Math.random()*5);
							}
							
							element.css({left:(posx)+'%', 
										bottom:(posy)+'%'});
							
							/*
							
							//Codigo Original
							
							element.css({left:(((scope.impact.indexOf(scope.item.RiskImpact))*incrposx)+(Math.random()*10)+5)+'%', 
										bottom:(((scope.likelihood.indexOf(scope.item.RiskLikelihood))*incrposy)+(Math.random()*10)+5)+'%'});
										*/
						},
					500);
				},true);
			}
		};
	}]);
	
})();
