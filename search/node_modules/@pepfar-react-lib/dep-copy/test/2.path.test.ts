import {PackageName} from "../lib/types/package.type";
import {getLocalPath, getRemotePath} from "../lib/services/path.service";

const example:PackageName = {
    nameSpace: 'pepfar-react-lib',
    localName: 'easytest'
}

test('Local Path',()=>{
    expect(getLocalPath(example)).toBe('node_modules/@pepfar-react-lib/easytest')
})

test('Remote Path',()=>{
    expect(getRemotePath('../npm',example)).toBe('../npm/easytest')
})