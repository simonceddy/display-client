function Navbar({ children, className = 'justify-start' }) {
  return (
    <div className={`p-2 flex-1 flex flex-row items-center ${className}`}>
      {children}
    </div>
  );
}

export default Navbar;
