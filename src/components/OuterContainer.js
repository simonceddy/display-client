function OuterContainer({ children }) {
  return (
    <div className="bg-blue-700 text-green-100 w-full h-full flex flex-col justify-start items-center">
      {children}
    </div>
  );
}

export default OuterContainer;
