import { useState } from "react";
import { Button, Menu, MenuItem, Collapse } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useGlobalContext } from "../../../context";
import api from "../../../api";

const leagues = [
  {
    id: 1,
    title: "Premier League",
    teams: [
      { id: 1, title: "Arsenal" },
      { id: 2, title: "Aston Villa" },
      { id: 3, title: "Brentford" },
      { id: 4, title: "Brighton & Hove Albion" },
      { id: 5, title: "Burnley" },
      { id: 6, title: "Chelsea" },
      { id: 7, title: "Crystal Palace" },
      { id: 8, title: "Everton" },
      { id: 9, title: "Leeds United" },
      { id: 10, title: "Leicester City" },
      { id: 11, title: "Liverpool" },
      { id: 12, title: "Manchester City" },
      { id: 13, title: "Manchester United" },
      { id: 14, title: "Newcastle United" },
      { id: 15, title: "Norwich City" },
      { id: 16, title: "Southampton" },
      { id: 17, title: "Tottenham Hotspur" },
      { id: 18, title: "Watford" },
      { id: 19, title: "West Ham United" },
      { id: 20, title: "Wolverhampton Wanderers" },
    ],
  },
  {
    id: 2,
    title: "Bundesliga",
    teams: [
      { id: 21, title: "Arminia Bielefeld" },
      { id: 22, title: "FC Augsburg" },
      { id: 23, title: "Bayer Leverkusen" },
      { id: 24, title: "Bayern Munich" },
      { id: 25, title: "VfL Bochum" },
      { id: 26, title: "Borussia Dortmund" },
      { id: 27, title: "Borussia Mönchengladbach" },
      { id: 28, title: "Eintracht Frankfurt" },
      { id: 29, title: "SC Freiburg" },
      { id: 30, title: "Greuther Fürth" },
      { id: 31, title: "Hertha BSC" },
      { id: 32, title: "1899 Hoffenheim" },
      { id: 33, title: "1. FC Köln" },
      { id: 34, title: "RB Leipzig" },
      { id: 35, title: "Mainz 05" },
      { id: 36, title: "VfB Stuttgart" },
      { id: 37, title: "Union Berlin" },
      { id: 38, title: "VfL Wolfsburg" },
    ],
  },
  {
    id: 3,
    title: "La Liga",
    teams: [
      { id: 39, title: "Alavés" },
      { id: 40, title: "Athletic Bilbao" },
      { id: 41, title: "Atlético Madrid" },
      { id: 42, title: "Barcelona" },
      { id: 43, title: "Cádiz" },
      { id: 44, title: "Celta Vigo" },
      { id: 45, title: "Elche" },
      { id: 46, title: "Espanyol" },
      { id: 47, title: "Getafe" },
      { id: 48, title: "Granada" },
      { id: 49, title: "Levante" },
      { id: 50, title: "Mallorca" },
      { id: 51, title: "Osasuna" },
      { id: 52, title: "Rayo Vallecano" },
      { id: 53, title: "Real Betis" },
      { id: 54, title: "Real Madrid" },
      { id: 55, title: "Real Sociedad" },
      { id: 56, title: "Sevilla" },
      { id: 57, title: "Valencia" },
      { id: 58, title: "Villarreal" },
    ],
  },
];

const ITEM_HEIGHT = 48;

export default function FaveTeamButton({
  teamName,
  faveTeamIds,
  number,
  id,
  getFavouriteTeams,
}) {
  const { user } = useGlobalContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState({});
  const [teamNameBtn, setTeamNameBtn] = useState(teamName);

  async function addTeamToFavourites(teamId) {
    const userId = user.id;
    const num = number;
    try {
      const response = await api.addTeam({ teamId, userId, num });
      if (response.status === 200) {
        getFavouriteTeams(id);
      } else {
        console.log("something went wrong");
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleLeagueItemClick = (id) => {
    setOpen((prevState) => {
      return { ...prevState, [id]: !prevState[id] };
    });
  };

  const handleTeamItemClick = (teamId, title) => {
    setTeamNameBtn(title);
    addTeamToFavourites(teamId);
    setMenuOpen(false);
  };

  return (
    <>
      <Button
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={menuOpen ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        variant="contained"
        color="primary"
      >
        {teamNameBtn}
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {leagues.map((league) => {
          const { id, title, teams } = league;
          const teamsToChoose = teams.filter(
            (team) =>
              team.id !== faveTeamIds[0] &&
              team.id !== faveTeamIds[1] &&
              team.id !== faveTeamIds[2]
          );
          return (
            <>
              <MenuItem
                key={id}
                selected={title}
                onClick={() => handleLeagueItemClick(id)}
              >
                {title}
                {open[id] ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
              <Collapse in={open[id]} timeout="auto" unmountOnExit>
                {teamsToChoose.map((team) => {
                  const { id, title } = team;
                  return (
                    <MenuItem
                      key={id}
                      onClick={() => handleTeamItemClick(id, title)}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
              </Collapse>
            </>
          );
        })}
      </Menu>
    </>
  );
}
