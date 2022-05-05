import { forwardRef } from 'react';

const TransitionContainer = forwardRef((props, ref) => (
  <div ref={ref} className="w-full h-full absolute">
    {props.children}
  </div>
));

export default TransitionContainer;
