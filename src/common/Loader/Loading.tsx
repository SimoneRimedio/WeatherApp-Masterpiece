import "rsuite/dist/rsuite.min.css";
import { Loader } from "rsuite";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
       <img alt="logo" src="/logo.png" className="w-20 h-20"></img>
        <Loader size="md" />
      </div>
    </div>
  );
};

export default Loading;
