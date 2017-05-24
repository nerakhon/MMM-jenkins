# MMM-jenkins
A MagicMirror module that displays informatino about Jenkins build queue length

This code is based on MMM-json-feed module: https://github.com/amcolash/MMM-json-feed

## Configuration
It is very simple to set up this module, a sample configuration looks like this:

```
modules: [
  {
    module: 'MMM-jenkins',
    position: 'bottom_bar',
    config: {
      url: 'http://your.server.here'
    }
  }
]
```

## Configuration Options

| Option               | Description
| -------------------- | -----------
| `title`              | Title to display at the top of the module. <br><br> **Default value:** `JSON Feed`
| `url`                | The address of jenkins server. <br><br> **Default value:** `REQUIRED`
| `updateInterval`     | The time between updates (In milliseconds). / <br><br> **Default value:** `300000 (5 minutes)`
