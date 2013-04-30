var urlwidget = $('#widgetscript').attr('urlwidget');

if(urlwidget)
{
	$.get(urlwidget, function(res) {
		width = '800px';
		height = '500px';
		
		if($('#widgetscript').attr('width'))
		{
			width = $('#widgetscript').attr('width');
		}
		
		if($('#widgetscript').attr('height'))
		{
			height = $('#widgetscript').attr('height');
		}
		
		$('<iframe id="iframeId" style="'+'width:'+width+'; height:'+height+'"/>').appendTo($('#iframediv'));
		
		setTimeout(function(){$("#iframeId").contents().find("body").html(res.responseText);},100);
	});
}
