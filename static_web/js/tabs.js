$(function(){
		$('.tab-panels .tabs li').on('click', function(){

			var $panel = $(this).closest('.tab-panels');
			//event listener listening for clicks on the tabs panels
			
			//figure out which panel to show

			$panel.find(' .tabs li.active').removeClass('active');

			$(this).addClass('active');

			var clickedPanel = $(this).attr('data-panel-name');

			//hide current panel
			$panel.find('.panel.active').slideUp(300, nextPanel);

			//show new panel
			function nextPanel(){
				$(this).removeClass('active');

				$('#'+clickedPanel).slideDown(300, function(){
					$(this).addClass('active');
				});
			}
		})
	});