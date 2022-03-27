import {last} from 'lodash';
import {names} from "@nrwl/devkit";

export const getCurrentLocation = (root: string): string => {
  return process.cwd().replace(root + '/', '');
}

export const getComponentName = (): string => {
  const arr = process.cwd().split('/');
  return last(arr);
}

export const getAllFunction = (componentName: string, file: string): string[] => {
  const component = last(file.split(names(componentName).className + 'Component'));
  const componentCode = component.slice(component.indexOf('{'), component.length - 1);

  let _functions = [];
  const all = componentCode.split('\n');
  all.forEach(f => {
    const index = f.indexOf('(');
    if (index > -1 && [' get ', ' set ', ' private', 'this.', ' constructor('].every(c => !f.includes(c))) {
      _functions.push((f.slice(0, index).replace(' public', '')).trim());
    }

  })
  return _functions;
}
