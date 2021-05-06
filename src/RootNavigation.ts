import { createRef, RefObject } from 'react';
import { NavigationContainerRef } from '@react-navigation/core';

interface NavigationParams {
  id?: string;
  tabTitle?: string;
  url?: string;
};

interface OptionsParams {
  title?: string;
};

//interface NavigationRef extends NavigationContainerRef {
//  current?: {
//    navigate: object;
//    setOptions: object;
//  }
//}

export const navigationRef: RefObject<NavigationContainerRef> = createRef();

export function navigate(name: string, params: NavigationParams) {
  navigationRef.current?.navigate(name, params);
}

export function setOptions(options: OptionsParams) {
  navigationRef.current?.setOptions(options);
}

interface RouteParams {
  url?: string;
  id?: string;
  BIN_ID?: string;
}

export interface IRoute {
  params: RouteParams;
  name: string;
}

interface Options {
  title: string;
}

export interface INavigation {
  setOptions(options: Options): null;
  navigate(routeName: string, params?: RouteParams): null;
}
