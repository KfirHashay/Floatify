import React from 'react';
import AggregatorProvider, { type AggregatorProviderProps } from '../state/context/aggregatorProvider';

export type FloatifyProps = AggregatorProviderProps;

export { default as AggregatorProvider } from '../state/context/aggregatorProvider';

export default function Floatify(props: FloatifyProps) {
    return <AggregatorProvider {...props} />;
}
