import LogoDevIcon from "@mui/icons-material/LogoDev";
import "rsuite/dist/rsuite.min.css";
import { Loader } from "rsuite";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <LogoDevIcon style={{ fontSize: 64 }} className="text-details" />
        <Loader size="md" />
      </div>
    </div>
  );
};

export default Loading;