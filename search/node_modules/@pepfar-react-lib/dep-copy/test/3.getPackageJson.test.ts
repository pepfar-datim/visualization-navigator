import {PackageJson, PackageName} from "../lib/types/package.type";
import {getPackageJson} from "../lib/services/getPackageJson.service";

test('3 > getPackageJson',async ()=>{
    let packageJson:PackageJson = await getPackageJson('test/data');
    expect(packageJson.name).toBe('@pepfar-react-lib/easytest');
})