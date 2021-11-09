import * as React from 'react';
import Component from '../../components/table/table';
declare const _default: React.ForwardRefExoticComponent<Partial<Omit<Component, "children">> & {
    onSlEventName?: ((e: Event) => unknown) | undefined;
} & React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
export default _default;
