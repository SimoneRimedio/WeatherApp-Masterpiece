import "rsuite/dist/rsuite.min.css";
import { Loader } from "rsuite";

const LoaderComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
       <img alt="logo" src="/logo.png" className="w-20 h-20"></img>
        <Loader size="md" />
      </div>
    </div>
  );
};

export default LoaderComponent;
