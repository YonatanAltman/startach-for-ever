import {formatFiles, generateFiles, joinPathFragments, logger, names, Tree} from '@nrwl/devkit';
import {readFileIfExisting} from "@nrwl/workspace/src/core/file-utils";

export interface InterfaceGeneratorOptions {
  name: string;
  location?: 'global' | 'local';
  isDto?: boolean;
}

export const GLOBAL_LOCATION = 'libs/api-interfaces/src/lib';
export const GLOBAL_INDEX = 'libs/api-interfaces/src/index.ts';

export default async function (tree: Tree, options: InterfaceGeneratorOptions) {
  logger.info(`🐵 hey hey`);
  logger.info(`🙈 name: ${options.name}`);
  logger.info(`🙊 location: ${options.location}`);
  // the location where the template files are
  const srcFolder = joinPathFragments(__dirname, './files');

  const target = options.location === 'global' ? GLOBAL_LOCATION : getCurrentLocation() + '/';
  const importFrom = !options.isDto ? '' : options.location === 'global' ?
    `import {DtoObject} from './dto-object.interface';` : `import {DtoObject} from '@global/interfaces';`;
  const _extends = !importFrom ? '' : 'extends DtoObject';
  const substitutions = {
    ...names(options.name),
    isDto: options.isDto,
    template: '',
    _extends: _extends,
    importFrom

  };
  console.log(substitutions);

  generateFiles(tree,
    srcFolder,
    target,
    substitutions
  );

  if (options.location === 'global') {
    let updateFile = readFileIfExisting(GLOBAL_INDEX);
    if (updateFile !== '') {
      updateFile += `export * from './lib/${substitutions.fileName}.interface';`;
      tree.write(GLOBAL_INDEX, updateFile);
    }

  }
  await formatFiles(tree);
  return () => true;

}


function getCurrentLocation(): string {
  let cwd = process.cwd();
  __dirname.split('/').forEach(s => {
    cwd = cwd.replace(`${s}/`, '')
    console.log(cwd);
  }
)
  logger.info(cwd);
  return cwd;
}
