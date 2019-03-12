import GridSizer from '../gridsizer/GridSizer.js';
import Buttons from '../buttons/Buttons.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tabs extends GridSizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        // Create sizer
        config.column = 3;
        config.row = 3;
        super(scene, config);
        this.type = 'rexTabs';
        this.eventEmitter = GetValue(config, 'eventEmitter', this);

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var panel = GetValue(config, 'panel', undefined);
        var leftButtons = GetValue(config, 'leftButtons', undefined);
        if (leftButtons && leftButtons.length === 0) {
            leftButtons = undefined;
        }
        var leftButtonsSizer;
        var rightButtons = GetValue(config, 'rightButtons', undefined);
        if (rightButtons && rightButtons.length === 0) {
            rightButtons = undefined;
        }
        var rightButtonsSizer;
        var topButtons = GetValue(config, 'topButtons', undefined);
        if (topButtons && topButtons.length === 0) {
            topButtons = undefined;
        }
        var topButtonsSizer;
        var bottomButtons = GetValue(config, 'bottomButtons', undefined);
        if (bottomButtons && bottomButtons.length === 0) {
            bottomButtons = undefined;
        }
        var bottomButtonsSizer;
        var clickConfig = GetValue(config, 'click', undefined);

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var leftButtonsOffset = GetValue(config, 'space.leftButtonsOffset', 0);
        var rightButtonsOffset = GetValue(config, 'space.rightButtonsOffset', 0);
        var toptButtonsOffset = GetValue(config, 'space.topButtonsOffset', 0);
        var bottomButtonsOffset = GetValue(config, 'space.bottomButtonsOffset', 0);
        var leftButtonSpace = GetValue(config, 'space.leftButton', 0);
        var rightButtonSpace = GetValue(config, 'space.rightButton', 0);
        var topButtonSpace = GetValue(config, 'space.topButton', 0);
        var bottomButtonSpace = GetValue(config, 'space.bottomButton', 0);


        if (background) {
            this.addBackground(background);
        }

        if (panel) {
            var padding = {
                left: (leftButtons) ? 0 : paddingLeft,
                right: (rightButtons) ? 0 : paddingRight,
                top: (topButtons) ? 0 : paddingTop,
                bottom: (bottomButtons) ? 0 : paddingBottom
            };
            this.add(panel, 1, 1, undefined, padding, false);
        }

        if (leftButtons) {
            leftButtonsSizer = new Buttons(scene, {
                groupName: 'left',
                buttons: leftButtons,
                orientation: 1, // Top-Bottom
                space: leftButtonSpace,
                align: GetValue(config, 'align.leftButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                left: paddingLeft,
                top: leftButtonsOffset,
            };
            this.add(leftButtonsSizer, 0, 1, undefined, padding, false);
        }

        if (rightButtons) {
            rightButtonsSizer = new Buttons(scene, {
                groupName: 'right',
                buttons: rightButtons,
                orientation: 1, // Top-Bottom
                space: rightButtonSpace,
                align: GetValue(config, 'align.rightButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                right: paddingRight,
                top: rightButtonsOffset,
            };
            this.add(rightButtonsSizer, 2, 1, undefined, padding, false);
        }

        if (topButtons) {
            topButtonsSizer = new Buttons(scene, {
                groupName: 'top',
                buttons: topButtons,
                orientation: 0, // Left-Right
                space: topButtonSpace,
                align: GetValue(config, 'align.topButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                top: paddingTop,
                left: toptButtonsOffset,
            };
            this.add(topButtonsSizer, 1, 0, undefined, padding, false);
        }

        if (bottomButtons) {
            bottomButtonsSizer = new Buttons(scene, {
                groupName: 'bottom',
                buttons: bottomButtons,
                orientation: 0, // Left-Right
                space: bottomButtonSpace,
                align: GetValue(config, 'align.bottomButtons', undefined),
                click: clickConfig,
                eventEmitter: this.eventEmitter,
            });
            var padding = {
                bottom: paddingBottom,
                left: bottomButtonsOffset,
            };
            this.add(bottomButtonsSizer, 1, 2, undefined, padding, false);
        }


        this.childrenMap = {};
        this.childrenMap.background = background;
        this.childrenMap.panel = panel;
        this.childrenMap.leftButtons = leftButtons;
        this.childrenMap.rightButtons = rightButtons;
        this.childrenMap.topButtons = topButtons;
        this.childrenMap.bottomButtons = bottomButtons;
        this.childrenMap.leftButtonsSizer = leftButtonsSizer;
        this.childrenMap.rightButtonsSizer = rightButtonsSizer;
        this.childrenMap.topButtonsSizer = topButtonsSizer;
        this.childrenMap.bottomButtonsSizer = bottomButtonsSizer;
    }

    emitButtonClick(groupName, index) {
        var buttonsSizer = this.childrenMap[groupName + 'ButtonsSizer'];
        if (!buttonsSizer) {
            return this;
        }
        buttonsSizer.emitButtonClick(index);
        return this;
    }
}

const defaultConfig = {};

export default Tabs;