import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UpdateDetails from "./UpdateDetails";

export default function UpdateDetailsWrapper() {
  const navigate = useNavigate();

  return (
    <Dialog open={true} onClose={() => navigate(-1)} maxWidth="sm" fullWidth>
      <UpdateDetails onClose={() => navigate(-1)} />
    </Dialog>
  );
}
