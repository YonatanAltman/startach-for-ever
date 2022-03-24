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

  const srcFolder = joinPathFragments(__dirname, './files');
  console.log(tree.root);
  const target = options.location === 'global' ? GLOBAL_LOCATION : getCurrentLocation(tree.root) + '/';

  const importFrom = !options.isDto ? '' : `import {DtoObject} from '${options.location === 'global' ? './dto-object.interface':'@global/interfaces'}'`;
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


function getCurrentLocation(root:string): string {
  return process.cwd().replace(root+'/','');
}
