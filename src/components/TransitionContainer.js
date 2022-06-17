/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';

const TransitionContainer = forwardRef((props, ref) => (
  <div ref={ref} {...props} className={`${props.className} w-full h-full`}>
    {props.children}
  </div>
));

export default TransitionContainer;
