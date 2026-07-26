function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      {children}
    </div>
  );
}

export default Container;