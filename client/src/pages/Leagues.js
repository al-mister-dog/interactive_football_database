import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Typography,
} from "@material-ui/core";

import api from "../api"

const useStyles = makeStyles((theme) => ({
  table: {
    width: "60%",
    margin: "auto",
    "@media (max-width: 780px)": {
      width: "100%",
    },
  },
  container: {
    maxHeight: 440,
  },
  cellColumn: {
    minWidth: "10px",
    maxWidth: "200px",
    "&:hover": {
      cursor: "pointer",
    },
    "@media (max-width: 780px)": {
      margin: 0,
      minWidth: "10px",
      maxWidth: "10px",
    },
  },
  teamCell: {
    minWidth: "10px",
    maxWidth: "200px",
    display: "flex",
    "&:hover": {
      cursor: "pointer",
    },
    "@media (max-width: 780px)": {
      minWidth: "80px",
    },
  },
  teamLogo: {
    width: "30px",
    marginRight: "15px",
  },
  teamLabel: {
    margin: 0,
    padding: 0,
    "@media (max-width: 780px)": {
      fontSize: "0.5rem",
    },
  },
  cellRow: {
    minWidth: "10px",
    maxWidth: "200px",
    "@media (max-width: 780px)": {
      margin: 0,
      minWidth: "10px",
      maxWidth: "10px",
    },
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    padding: "10px",
    "@media (max-width: 780px)": {
      display: "flex",
      flexDirection: "row",
    },
  },
  selectedLogo: {
    "@media (max-width: 780px)": {
      maxWidth: "50px",
      maxHeight: "50px",
    },
  },
  titleAndPosition: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "1rem",
  },
  teamTitle: {},
  positions: {
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 780px)": {
      marginTop: 10,
    },
  },
  position: {
    display: "flex",
    flexDirection: "column",
    padding: "5px",
    "&:nth-child(even)": {
      backgroundColor: "#eee",
    },
  },
}));
const fields = ["Club", "MP", "W", "D", "L", "Pts", "GF", "GA", "GD", "Last 5"];
const toggles = {
  W: false,
  D: false,
  L: false,
  GF: false,
  GA: false,
  GD: false,
  Pts: false,
};
export default function DenseTable() {
  const classes = useStyles();
  const { id } = useParams();
  const [league, setLeague] = useState([]);
  const [sortToggles, setSortToggles] = useState(toggles);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedLogo, setSelectedLogo] = useState("");
  const [positions, setPositions] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSortLeague = (prop) => {
    handleSortToggles(prop);
    sortLeague(prop);
  };

  const handleSortToggles = (prop) => {
    setSortToggles(() => {
      const newSortToggles = { ...sortToggles, [prop]: !sortToggles[prop] };
      return newSortToggles;
    });
  };
  const sortLeague = (prop) => {
    const leagueClone = [...league];
    let newLeague;
    sortToggles[prop]
      ? (newLeague = leagueClone.sort((a, b) => {
          return a[prop] > b[prop] ? -1 : 1;
        }))
      : (newLeague = leagueClone.sort((a, b) => {
          return b[prop] > a[prop] ? -1 : 1;
        }));
    setLeague(newLeague);
  };
  const getTeamFromLeagueTable = async (id, club, logo) => {
    const fields = ["W", "D", "L", "GF", "GA", "GD", "Pts"];
    let positions = [];
    let ordinals = {
      1: "st",
      2: "nd",
      3: "rd",
    };
    fields.forEach((field) => {
      let currentLeague = [...league];
      let sortedLeague = currentLeague.sort((a, b) => {
        return a[field] > b[field] ? -1 : 1;
      });
      let selectedTeamPosition = sortedLeague.findIndex(
        (team) => team.id === id
      );
      let ordinal = ordinals[selectedTeamPosition + 1] || "th";
      positions = [
        ...positions,
        {
          field: field,
          selectedTeamPosition: `${selectedTeamPosition + 1}${ordinal}`,
        },
      ];
    });
    setSelectedTeam(club);
    setSelectedLogo(logo);
    setPositions(positions);
    handleOpen();
  };

  const mapLeague = (league) => {
    const teams = league[0].map((team) => {
      const rows = {
        id: team.team.id,
        Club: team.team.name,
        logo: team.team.logo,
        MP: team.all.played,
        W: team.all.win,
        D: team.all.draw,
        L: team.all.lose,
        Pts: team.points,
        GF: team.all.goals.for,
        GA: team.all.goals.against,
        GD: team.goalsDiff,
        "Last 5": team.form,
      };
      return rows;
    });
    setLeague(teams);
  };

  const getLeagues = async () => {
    const leagueIds = {
      61: "ligue-1",
      39: "premier-league",
      78: "bundesliga",
      135: "serie-a",
      140: "la-liga",
    };
    const leagueId = leagueIds[id];
    const response = await api.leagueApiCall(leagueId);
    const data = await response.json();
    const league = data.response[0].league.standings;
    mapLeague(league);
  };
  useEffect(() => {
    getLeagues();
  }, [id]);
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {fields.map((field, idx) => {
              return (
                <TableCell
                  key={idx}
                  className={classes.cellColumn}
                  onClick={() => onSortLeague(field)}
                >
                  {field}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {league.map((team) => (
            <TableRow key={team.id}>
              <TableCell
                className={classes.teamCell}
                onClick={() =>
                  getTeamFromLeagueTable(team.id, team.Club, team.logo)
                }
              >
                <img
                  src={team.logo}
                  alt={team.Club}
                  className={classes.teamLogo}
                />
                <p className={classes.teamLabel}>{team.Club}</p>
              </TableCell>
              <TableCell className={classes.cellRow}>{team.MP}</TableCell>
              <TableCell className={classes.cellRow}>{team.W}</TableCell>
              <TableCell className={classes.cellRow}>{team.D}</TableCell>
              <TableCell className={classes.cellRow}>{team.L}</TableCell>
              <TableCell className={classes.cellRow}>{team.Pts}</TableCell>
              <TableCell className={classes.cellRow}>{team.GF}</TableCell>
              <TableCell className={classes.cellRow}>{team.GA}</TableCell>
              <TableCell className={classes.cellRow}>{team.GD}</TableCell>

              <TableCell className={classes.cellRow}>
                {team["Last 5"]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modal}>
          <div>
            <img
              className={classes.selectedLogo}
              src={selectedLogo}
              alt={selectedTeam}
            />
          </div>
          <div className={classes.titleAndPosition}>
            <Typography variant="h4">{selectedTeam}</Typography>
            <div className={classes.positions}>
              {positions.map((position) => {
                return (
                  <div className={classes.position}>
                    <Typography>{position.field}</Typography>
                    <Typography>{position.selectedTeamPosition}</Typography>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </Modal>
    </TableContainer>
  );
}
