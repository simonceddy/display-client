function TransitionOuterContainer({ children, ref }) {
  return (
    <div ref={ref} className="w-full h-full">
      {children}
    </div>
  );
}

export default TransitionOuterContainer;
