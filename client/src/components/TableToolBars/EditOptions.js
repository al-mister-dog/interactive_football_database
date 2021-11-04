import {
  FormControlLabel,
  Switch,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useGlobalContext } from "../../context";
import SaveUserTable from "./SaveUserTable";

export default function EditOptions({
  switchValue,
  handleSwitchChangeFilterMany,
}) {
  const { resetExceptFilterToggle } = useGlobalContext();
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={switchValue}
            onChange={handleSwitchChangeFilterMany}
          />
        }
        label={
          <Typography variant="body2" color="textSecondary">
            Filter Many
          </Typography>
        }
      />
      <Tooltip title="refresh">
        <IconButton onClick={resetExceptFilterToggle}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      <SaveUserTable />
    </>
  );
}
