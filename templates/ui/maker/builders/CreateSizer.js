/*
type: sizer
name:

# Relace child config by game objct
background:
    - child:
      padding:
          left:
          right:
          top:
          bottom:
children:
    - child:
      proportion:
      align:
      padding:
          left:
          right:
          top:
          bottom:
      expand:
      key:
      minWidth:
      minHeight:
# ----

width:
height:
orientation:
rtl:
space:
    left:
    right:
    top:
    bottom:
    item:
draggable:
*/

import GetConfig from './GetConfig.js';
import Sizer from '../../sizer/Sizer.js';
import CreateChild from './CreateChild.js';

var CreateSizer = function (scene, config, styles, customBuilders) {
    config = GetConfig(config, styles);

    var backgroundConfig = config.background;
    delete config.background;
    if (backgroundConfig) {
        if (!Array.isArray(backgroundConfig)) {
            backgroundConfig = [backgroundConfig];
        }
        for (var i = 0, cnt = backgroundConfig.length; i < cnt; i++) {
            var childConfig = backgroundConfig[i];
            if (!childConfig.child) {
                childConfig = { child: childConfig };
                backgroundConfig[i] = childConfig;
            }
            CreateChild(scene, childConfig, 'child', styles, customBuilders);
        }
    }

    var childrenConfig = config.children;
    delete config.children;
    if (childrenConfig) {
        for (var i = 0, cnt = childrenConfig.length; i < cnt; i++) {
            var childConfig = childrenConfig[i];
            if (!childConfig.child) {
                childConfig = { child: childConfig };
                childrenConfig[i] = childConfig;
            }
            CreateChild(scene, childConfig, 'child', styles, customBuilders);
        }
    }

    var gameObjects = new Sizer(scene, config);
    scene.add.existing(gameObjects);

    if (backgroundConfig) {
        for (var i = 0, cnt = backgroundConfig.length; i < cnt; i++) {
            var childConfig = backgroundConfig[i];
            gameObjects.addBackground(childConfig.child, childConfig.padding);
        }
    }

    if (childrenConfig) {
        for (var i = 0, cnt = childrenConfig.length; i < cnt; i++) {
            var childConfig = childrenConfig[i];
            gameObjects.add(childConfig.child, childConfig);
        }
    }

    return gameObjects;
}

export default CreateSizer;