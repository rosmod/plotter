var remote = require('electron').remote;
var dialog = remote.dialog;

var requirejs = require('requirejs');

requirejs.config({
    baseUrl: __dirname,

    nodeRequire: require,

    paths: {
        'plotly-js': './node_modules/plotly.js/dist/'
    }
});

var _ = require('lodash');
var fs = require('fs');

//window.$ = window.jQuery = require('jquery');

var parser = requirejs('./parser.js');
var userparser = requirejs('./userParser.js');
var plotter = requirejs('./plotter.js');
var d3 = requirejs('d3');
var plotHtml = fs.readFileSync('plot.html');
//var plotly = require('plotly.js/dist/plotly.js');

dialog.showOpenDialog(function (fileNames) {
		if(fileNames === undefined)
				console.log("No file selected");
		else {
        console.log("Opened " + fileNames);
        fs.readFile(fileNames[0], 'utf-8', function(err, data) {
            if (err) {
                alert("Couldn't open the file: " + err.message);
                return;
            }

            // init vars
            var a = fileNames[0],
                datas = {},
	              first_time = undefined,
	              last_time = undefined;

            // Prepare hide plot func
            var hidePlotFunc = function(a) {
		            var active = datas[a].active ? false : true;
		            var opacity = active ? 0 : 1;
		            var visibility = active ? 'hidden' : 'visible';
		            var display = active ? 'none' : 'block';
		            d3.select('#plot_'+a)
		                .style('display', display);
		            datas[a].active = active;
            };

            // parse the log
            datas[a] = parser.getDataFromAttribute(data);
            var aliases = Object.keys(datas[a]);
			      aliases.map((key) => {
				        var d = datas[a][key].data;
				        var first_entry = d[0];
				        var last_entry = d[d.length-1];
				        if ( first_time === undefined || first_time > first_entry[0] ) {
				            first_time = first_entry[0];
				        }
				        if ( last_time === undefined || last_time < last_entry[0] ) {
				            last_time = last_entry[0];
				        }
			      });
            // plot the logs
		        for (var a in datas) {
			          // setup the html
                /*
                console.log($('#main'));
			          $('#main').append(plotHtml);
                 */
			          var container = $('#log');
                console.log(container);
			          $(container).attr('id', 'log_'+a);

			          var title = $(container).find('#title');
			          $(title).attr('id','title_'+a)
			              .on('click', function(_a) {
				                return function() {
				                    hidePlotFunc(_a);
				                };
			              }(a));

			          title.append('<b>'+a+'</b>');

			          var p = $(container).find('#plot');
			          $(p).attr('id',"plot_" + a);

			          var data = datas[a];
			          var offset = first_time;
			          if (!_.isEmpty(data)) {
			              var aliases = Object.keys(data);
			              aliases.map((key) => {
				                data[key].data.push([last_time, 0]);
			              });
			              plotter.plotData('plot_'+a, data, offset);
			          }
			          else
			              $(container).detach();
		        }
        });
		}
});
