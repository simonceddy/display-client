function Navbar({ children }) {
  return (
    <div className="p-2 flex-1 flex flex-row justify-start items-center">
      {children}
    </div>
  );
}

export default Navbar;
