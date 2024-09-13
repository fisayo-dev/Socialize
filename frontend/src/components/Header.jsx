import Button from "./Button";

const Header = () => {
  return (
    <div className="fixed top-0 w-full">
    <div className="app-container backdrop-blur-md ">
      <div className="py-10 items-center justify-center flex">
          <h1 className="text-1xl font-bold">Header</h1>
          {/* <Button styles="text-slate-900">Login</Button> */}
      </div>
    </div>
  </div>
  );
};

export default Header;
