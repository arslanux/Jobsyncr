import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (type = "info", message) => {
  const config = {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    limit: 3,
  };

  switch (type) {
    case "success":
      toast.success(message, config);
      break;
    case "error":
      toast.error(message, config);
      break;
    case "info":
      toast.info(message, config);
      break;
    default:
      toast(message, config);
  }
};

export default notify;
