# ROSMOD Plotter

The [ROSMOD](https://github.com/rosmod) plotter is
an [Electron](https://electron.atom.io) app which
utilizes [Plotly.js](https://plot.ly) and regular expressions to parse the
*Component Logs* generated by ROSMOD components.

ROSMOD Plotter enables plotting logs directly from files recovered or
downloaded without needing to run the ROSMOD WebGME server.

To use ROSMOD Plotter navigate to
[Releases](https://github.com/rosmod/plotter/releases) and download
the latest release for your platform.

Usage:
1. Download and extract the zip according to the platform you're running
2. Go into the extracted folder and execute `ROSMOD Plotter`.
3. *Right Click* and select `Open Log`
4. Navigate to the log file you want to load.
5. Enjoy the plot (and repeat steps 3 and 4 for as many logs as you want to plot.

Controls:
* Hover over plot: shows closest point on closest plot
* Click + drag inside plot to zoom
* Double Click inside plot to reset zoom
* Click on legend item to hide it
* Double click on legend item to toggle showing only it and the previous selection
* Click on the title to toggle hiding the plot altogether
* Click on the camera icon (shown when hovering over the upper right corner of a plot) to download a png of the plot as it is shown in the app (size and current selections etc.).

## Installation

```bash
sudo npm install -g electron
```

## Usage

```bash
electron .
```
