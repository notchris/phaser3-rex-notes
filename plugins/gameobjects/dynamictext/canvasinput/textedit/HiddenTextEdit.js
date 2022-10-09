import HiddenTextEditBase from '../../../../behaviors/hiddentextedit/HiddenTextEditBase.js';
import NumberInputUpdateCallback from '../../../../behaviors/hiddentextedit/defaultcallbacks/NumberInputUpdateCallback.js';

class HiddenTextEdit extends HiddenTextEditBase {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.onUpdate === 'number') {
            config.onUpdate = NumberInputUpdateCallback;
        }

        super(gameObject, config);
        // this.parent = gameObject;

        gameObject
            // Open editor by 'pointerdown' event
            // Then set cursor position to nearest char
            .on('pointerdown', function (pointer, localX, localY, event) {
                var child = gameObject.getNearestChild(localX, localY);
                var charIndex = gameObject.getCharIndex(child);
                this.setCursorPosition(charIndex);
            }, this)

        this
            .on('open', function () {
                gameObject.emit('open');
            })
            .on('close', function () {
                gameObject.emit('close');
            })
    }

    initText() {
        var textObject = this.parent;
        this.prevCursorPosition = null;
        this.setText(textObject.text);
        return this;
    }

    updateText() {
        var textObject = this.parent;

        var text = this.text;
        if (this.onUpdateCallback) {
            var newText = this.onUpdateCallback(text, textObject, this);
            if (newText != null) {
                text = newText;
            }
        }

        textObject.setText(text);

        var cursorPosition = (this.isOpened) ? this.cursorPosition : null;
        if (this.prevCursorPosition !== cursorPosition) {
            if (this.prevCursorPosition != null) {
                if (this.prevCursorPosition > text.length) {
                    this.prevCursorPosition = null;
                }
            }
            
            if (this.prevCursorPosition != null) {
                var child = textObject.getCharChild(this.prevCursorPosition);
                textObject.emit('cursorout', child, this.prevCursorPosition, textObject);
            }
            if (cursorPosition != null) {
                var child = textObject.getCharChild(cursorPosition);
                textObject.emit('cursorin', child, cursorPosition, textObject);
            }
            textObject.emit('movecursor', cursorPosition, this.prevCursorPosition, textObject);

            this.prevCursorPosition = cursorPosition;
        }

        return this;
    }
}

export default HiddenTextEdit;