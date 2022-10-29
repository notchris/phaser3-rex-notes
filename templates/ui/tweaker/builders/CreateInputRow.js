import Sizer from '../../sizer/Sizer.js';
import CreateRoundRectangle from './utils/CreateRoundRectangle.js';
import CreateInputTitle from './CreateInputTitle.js';
import CreateInputField from './CreateInputField.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateInputRow = function (scene, config, style, gameObject) {
    if (!gameObject) {


        var titleStyle = GetValue(style, 'title') || {};
        var inputTitle = CreateInputTitle(scene, config, titleStyle);

        var inputTextStyle = GetValue(style, 'inputText') || {};
        var inputText = CreateInputField(scene, config, inputTextStyle);

        var backgroundStyle = GetValue(style, 'background') || {};
        var background = CreateRoundRectangle(scene, config, backgroundStyle);


        var inputSizerconfig = {
            ...config,
            ...style,

            inputTitle: inputTitle,
            inputText: inputText,
            background: background,
        }
        gameObject = new InputRow(scene, inputSizerconfig);
    }

    gameObject.setBindTarget(config.target, config.targetKey);

    return gameObject;
}

class InputRow extends Sizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.InputRow';

        var inputTitle = config.inputTitle;
        var inputText = config.inputText;
        var background = config.background;

        var proportion = GetValue(config, 'proportion.title', 1);
        this.add(
            inputTitle,
            { proportion: proportion, expand: true, }
        );

        var proportion = GetValue(config, 'proportion.inputText', 2);
        this.add(
            inputText,
            { proportion: proportion, expand: true, }
        );

        this.addBackground(background);

        this.addChildrenMap('title', inputTitle);
        this.addChildrenMap('inputText', inputText);
        this.addChildrenMap('background', background);

        this.setupBinding();

    }

    setupBinding() {
        var inputText = this.childrenMap.inputText;
        inputText
            // Set text value to object when closing editor
            .on('close', function () {
                if (!this.bindTarget) {
                    return;
                }
                this.bindTarget[this.bindTargetKey] = inputText.getValue();;
            }, this);

        return this;
    }

    syncTargetValue() {
        if (!this.bindTarget) {
            return this;
        }

        var inputText = this.childrenMap.inputText;
        inputText.setValue(this.bindTarget[this.bindTargetKey]);

        return this;
    }

    setBindTarget(target, key) {
        this.bindTarget = target;
        if (key !== undefined) {
            this.setBindTargetKey(key);
        }
        return this;
    }

    setBindTargetKey(key) {
        this.bindTargetKey = key;
        this.syncTargetValue();
        return this;
    }

}

export default CreateInputRow;