function IconButton({ children, className, onClick, submits = false }) {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      type={submits ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

export default IconButton;
