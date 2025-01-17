import Resize from '../utils/Resize.js';
import SyncTo from '../utils/SyncTo.js';
import LoadFileMethods from '../utils/LoadFileMethods.js';
import { DragDropEvents, ElementEvents } from './FileDropZoneProperties.js';
import RouteEvents from '../utils/RouteEvents.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class FileDropZone extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        }

        if (config === undefined) {
            config = {};
        }

        var element = document.createElement('div');

        var style = GetValue(config, 'style', undefined);
        super(scene, x, y, element, style);
        this.type = 'rexFileDropZone';
        this.resize(width, height);

        this._files = [];
        this.filters = config.filters;

        // Apply events
        RouteEvents(this, element, DragDropEvents, true);
        RouteEvents(this, element, ElementEvents);

        this
            .on('drop', function (gameObject, e) {
                this._files = e.dataTransfer.files;

                if (this._files && this.filters) {
                    for (var filterType in this.filters) {
                        var filterCallback = this.filters[filterType];

                        var filteredFiles = [];
                        for (var i = 0, cnt = this._files.length; i < cnt; i++) {
                            var file = this._files[i];
                            if (filterCallback(file)) {
                                filteredFiles.push(file);
                            }
                        }

                        if (filteredFiles.length > 0) {
                            this.emit(`drop.${filterType}`, filteredFiles);
                        }
                    }
                }
            }, this)
    }

    get files() {
        return this._files;
    }
}

var methods = {
    resize: Resize,
    syncTo: SyncTo,
}

Object.assign(
    FileDropZone.prototype,
    methods,
    LoadFileMethods,
);

export default FileDropZone;