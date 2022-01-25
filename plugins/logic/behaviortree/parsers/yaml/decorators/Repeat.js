import { Repeat } from '../../../nodes';
import IsPlainObject from '../../../../../utils/object/IsPlainObject.js';

/*
```yaml
decorators:
    repeat: 3
```
or
```yaml
repeat: 3
repeat: {maxLoop:3}
```
*/

var CreateRepeatNode = function (data, child) {
    return new Repeat({
        maxLoop: (IsPlainObject(data)) ? data.maxLoop : data,
        child: child
    })
}

export default CreateRepeatNode;