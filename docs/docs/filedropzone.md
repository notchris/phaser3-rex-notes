## Introduction

Create a div element for dropping file(s).

- Author: Rex
- [DOM Game object](domelement.md)

## Live demos

- [Drop text file](https://codepen.io/rexrainbow/pen/oNMGmeX)
- [Drop image file](https://codepen.io/rexrainbow/pen/jOpGRdw)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/filedropzone)

### Install plugin

#### Load minify file

- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },        
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexfiledropzoneplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfiledropzoneplugin.min.js', true);
    ```
- Add file-drop-zone object
    ```javascript
    var fileDropZone = scene.add.rexFileDropZone(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import FileDropZonePlugin from 'phaser3-rex-plugins/plugins/filedropzone-plugin.js';
    var config = {    
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },        
        // ...
        plugins: {
            global: [{
                key: 'rexFileDropZone',
                plugin: FileDropZonePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add file-drop-zone object
    ```javascript
    var fileDropZone = scene.add.rexFileDropZone(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Enable dom element in [configuration of game](game.md#configuration)
    ```javascript
    var config = {
        parent: divId,
        // fullscreenTarget: divId, // For fullscreen
        dom: {
            createContainer: true
        },        
        // ...
    };
    var game = new Phaser.Game(config);
    ```
    - Set `parent` to divId
    - Set `dom.createContainer` to `true`.
- Import class
    ```javascript
    import { FileDropZone } from 'phaser3-rex-plugins/plugins/filedropzone.js';
    ```
- Add file-drop-zone object
    ```javascript
    var fileDropZone = new FileDropZone(config);
    scene.add.existing(fileDropZone);
    ```

### Add file-drop-zone object

```javascript
var fileDropZone = scene.add.rexFileDropZone({
    // style: { },
    
    // filters: { filterType: (file) => boolean }
});
// var fileDropZone = scene.add.rexFileDropZone(x, y, width, height, config);
```

- `style` : CSS style of div element.
- `filters` : Filter methods, optional. For example, image files filter, will fire `'drop.image'` event
    ```javascript
    {
        image: function(file) { 
            return file.name.match(/\.(jpg|jpeg|png|gif)$/i)
        }
    }
    ```

### Custom class

- Define class
    ```javascript
    class MyFileDropZone extends FileDropZone {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config) {
            // ...
            scene.add.existing(this);
        }
        // ...

        // preUpdate(time, delta) {}
    }
    ```
    - `scene.add.existing(gameObject)` : Adds an existing Game Object to this Scene.
        - If the Game Object renders, it will be added to the Display List.
        - If it has a `preUpdate` method, it will be added to the Update List.
- Create instance
    ```javascript
    var fileDropZone = new MyFileDropZone(scene, x, y, width, height, config);
    ```

### Sync

Sync position, size and origin to another game object.

```javascript
fileDropZone.syncTo(gameObject);
```

### Dropped files

```javascript
var files = fileDropZone.files;
```

- `files` : Array of file object.

### Events

- Drop files
    ```javascript
    fileDropZone.on('drop', function(fileDropZone) {
        var files = fileDropZone.files;
    })
    ```
- Drop filtered files
    ```javascript
    fileDropZone.on('drop.' + filterType, function(files) {
    })
    ```
- Drag-enter/drag-leave/drag-over file(s)
    ```javascript
    fileDropZone.on('dragenter', function(fileDropZone) {
    })
    ```
    ```javascript
    fileDropZone.on('dragleave', function(fileDropZone) {
    })
    ```
    ```javascript
    fileDropZone.on('dragover', function(fileDropZone) {
    })
    ```


!!! warning
    Game objects under this file drop zone can't receive touch input events.


### Load file to cache

```javascript
fileDropZone.loadFile(file, loaderType, key);
// fileDropZone.loadFile(file, loaderType, key, cahceType, onComplete);
```

or

```javascript
fileDropZone.loadFilePromise(file, loaderType, key, cahceType)
    .then(function(content) {

    })
```

- `file` : File object, see [Events](filedropzone.md#events)
- `loaderType` : `image`, `text`, `binary`, ... See [Loader](loader.md)
- `key` : Unique string key.
- `cahceType` : 
    - `undefined` : Use default value.
- `onComplete` : Callback invoked when file loaded to cache.
- `content` : Content of file.

### Create object URL

- [Create object url](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
    ```javascript
    var objectURL = URL.createObjectURL(file);
    ```
- [Release object url](https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL)
    ```javascript
    URL.createObjectURL(objectURL);
    ```
