function Navbar({ children }) {
  return (
    <div className="w-full p-2 flex flex-row justify-start items-center">
      {children}
    </div>
  );
}

export default Navbar;
