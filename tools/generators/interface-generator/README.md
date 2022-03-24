
# Interface Generator

### TODO
- [ ] Create new generator
- [ ] Add interface to default function
- [ ] Get template files from source folder
- [ ] Get file path to create the interface
- [ ] Create the file
- [ ] Update index.d.ts if needed






### Create
`nx generate @nrwl/workspace:workspace-generator interface-generator`

### Interface
``` javascript
export interface InterfaceGeneratorOptions {
  name: string;
  location?: 'global' | 'local';
  isDto?: boolean;
}
```
### Template files
create the template in `./files` folder.

```javascript
 const srcFolder = joinPathFragments(__dirname, './files');
```

### File path
in this case we asks if this file is Local or Global"
```javascript
const target = options.location === 'global' ? GLOBAL_LOCATION : getCurrentLocation() + '/';
```
the `getCurrentLocation()` is a local function.

### Create the file
```javascript
generateFiles(tree,srcFolder,target, substitutions);
```


### Update if `global` file
```javascript
if (options.location === 'global') {
let updateFile = readFileIfExisting(GLOBAL_INDEX);
if (updateFile !== '') {
    updateFile += `export * from './lib/${substitutions.fileName}.interface';`;
    tree.write(GLOBAL_INDEX, updateFile);
  }
}
```
