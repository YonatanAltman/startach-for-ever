import {logger, Tree} from '@nrwl/devkit';
import {getAllFunction, getComponentName, getCurrentLocation} from "../utils/tools.utiles";
import {tsquery} from '@phenomnomnominal/tsquery';
import {head} from 'lodash';

export default async function (tree: Tree, options: any) {
  logger.info(`🐵 hey hey`);

  const componentName = getComponentName();
  const target = getCurrentLocation(tree.root);
  logger.info('we are here:' + target);
  logger.info('component is:' + componentName);
  const componentPath = `${target}/${componentName}.component.ts`;
  const componentSpecPath = `${target}/${componentName}.component.spec.ts`;
  const isFileExist = tree.isFile(componentPath);
  const isSpecFileExist = tree.isFile(componentSpecPath);

  if (!isFileExist) {
    logger.error(`🙈 File ${componentName}.component.ts is not found!`)
    return false;
  } else if (!isSpecFileExist) {
    logger.error(`🙈 File ${componentName}.component.spec.ts is not found!`)
    return false;
  } else {

    const str = tree.read(componentPath, 'utf8');
    // logger.info(str);
    const functions = getAllFunction(componentName, str);
    let componentSpec = tree.read(componentSpecPath, 'utf8');
    logger.info(componentSpec);
    let test = '';
    let count = 0;
    functions.forEach(fun => {
      if (!componentSpec.includes(fun)) {
        count++;
        test += `
        describe('${fun}',()=>{
          it('should call ${fun} with correct value', () => {
            const spy = jest.spyOn(component, '${fun}');
            component.${fun}();
            expect(spy).toHaveBeenCalledWith('test');
          });
        })`;
        logger.info(fun +' has been added to test');

      }
    });
    if (!!test) {
      const ast = tsquery.ast(componentSpec);
      const nodes = tsquery(ast, `ArrowFunction`);
      const firstNode = head(nodes);
      const position = firstNode.end - 2;
      componentSpec = [componentSpec.slice(0, position), test, componentSpec.slice(position)].join('');
      tree.write(componentSpecPath, componentSpec);
      logger.info(`${count} has been updated at ${componentName}.component.spec.ts`)
    }


  }


  return () => true;
}

