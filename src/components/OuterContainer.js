function OuterContainer({ children }) {
  return (
    <div className="bg-blue-800 text-green-100 w-full min-h-full flex flex-col justify-start items-center">
      {children}
    </div>
  );
}

export default OuterContainer;
