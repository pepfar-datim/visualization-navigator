export type PackageName = {
    nameSpace: string;
    localName:string;
};

export type Map = {
    [packageName:string]:string
}

export type PackageJson = {
    name:string;
    dependencies:Map;
    peerDependencies:Map;
}