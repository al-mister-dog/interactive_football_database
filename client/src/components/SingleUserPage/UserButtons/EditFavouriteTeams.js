import { useState } from "react";
import { IconButton, Modal, Box, ButtonGroup } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import FaveTeamButton from "./FaveTeamButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: 24,
    padding: "10px",
    borderRadius: "10px",
  },
}));

export default function EditFavouriteTeams({
  favouriteTeams,
  getFavouriteTeams,
  id,
}) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const btnAmount = 3;
  const remainingButtons = Array.from(
    Array(btnAmount - favouriteTeams.length),
    (el) => (el = { teamName: `choose team` })
  );
  const btnArray = [...favouriteTeams, ...remainingButtons];
  const faveTeamIds = favouriteTeams.map((team) => team.teamId)
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleModalOpen}>
        <EditIcon />
      </IconButton>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box className={classes.modal}>
          <ButtonGroup aria-label="contained button group">
            {btnArray.map((team, index) => {
              return (
                <FaveTeamButton
                  key={index}
                  teamName={team.teamName}
                  teamId={team.teamId}
                  faveTeamIds={faveTeamIds}
                  number={index}
                  id={id}
                  getFavouriteTeams={getFavouriteTeams}
                  handleModalClose={handleModalClose}
                />
              );
            })}
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
}
