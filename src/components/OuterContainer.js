function OuterContainer({ children }) {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      {children}
    </div>
  );
}

export default OuterContainer;
