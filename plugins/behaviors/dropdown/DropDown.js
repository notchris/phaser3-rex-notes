import Transition from '../transition/Transition.js';
import PopUp from '../../popup.js';
import ScaleDown from '../scale/ScaleDown.js';
import SetPosition from './SetPosition.js';
import IsPointInBounds from '../../utils/bounds/IsPointInBounds.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class DropDown extends Transition {
    constructor(gameObject, config) {
        if (config === undefined) {
            config = {};
        }
        if (!config.hasOwnProperty('transitIn')) {
            config.transitIn = PopUp;
        }
        if (!config.hasOwnProperty('transitOut')) {
            config.transitOut = ScaleDown;
        }
        config.manualClose = true;
        config.clickOutsideClose = true;

        super(gameObject, config);
        // this.parent = gameObject;
        // this.scene

        SetPosition(gameObject, config);

        if (gameObject.isRexSizer) {
            gameObject.layout();
        }

        // Close conditions:
        var touchOutsideClose = GetValue(config, 'touchOutsideClose', false);
        var anyTouchClose = GetValue(config, 'anyTouchClose', false);

        if (anyTouchClose) {
            touchOutsideClose = false;
        }

        // Registet touch-close event after opened
        if (anyTouchClose) {
            this.once('open', this.anyTouchClose, this);
        } else if (touchOutsideClose) {
            this.once('open', this.touchOutsideClose, this);
        }

        this.start();
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        // Registered in touchOutsideClose()
        this.scene.input.off('pointerup', this.touchCloseCallback, this);

        super.shutdown(fromScene);
    }

    touchOutsideClose() {
        this.scene.input.on('pointerup', this.touchCloseCallback, this);
        this.clickOutsideTest = true;
        return this;
    }

    anyTouchClose() {
        this.scene.input.once('pointerup', this.touchCloseCallback, this);    
        return this;
    }

    touchCloseCallback(pointer) {
        if (this.clickOutsideTest && IsPointInBounds(this.parent, pointer.worldX, pointer.worldY)) {
            return;
        }
        this.requestClose();
    }

    onOpen() {
        this.emit('open', this.parent, this);
        super.onOpen();
    }

    onClose() {
        this.emit('close', this.parent, this);
        super.onClose();
    }

}

export default DropDown;
