import { Separator } from "./ui/separator";

const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <Separator/>
          <p className="text-white text-center">
            Made with <span className="text-red-500">&hearts;</span> by Pustak | <a href="https://github.com/PustakP/xvg-online">github</a>
          </p>
        </div>
      </nav>
    );
  };
  
  export default Navbar;