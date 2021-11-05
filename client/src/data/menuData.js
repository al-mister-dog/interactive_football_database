const tabs = [
  {
    menuTitle: "Players",
    items: [
      { title: "All Players" },
      {
        title: "Premier League",
        items: [
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
        title: "Bundesliga",
        items: [
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
        title: "La Liga",
        items: [
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
    ],
  },
  {
    menuTitle: "Teams",
    items: [
      { title: "All Teams" },
      {
        title: "Premier League",
        items: [
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
        title: "Bundesliga",
        items: [
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
        title: "La Liga",
        items: [
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
    ],
  },
  {
    menuTitle: "League Tables",
    items: [
      {
        id: 39,
        title: "Premier League",
      },
      {
        id: 78,
        title: "Bundesliga",
      },
      {
        id: 140,
        title: "La Liga",
      },
      {
        id: 135,
        title: "Serie A",
      },
      {
        id: 61,
        title: "Ligue 1",
      },
    ],
  },
  {
    menuTitle: "Stats",
    items: [
      { title: "My Stats", items: [] },
      { title: "Team Age", stat: "teamAge" },
      { title: "Average Age", stat: "averageAge" },
      { title: "Combined Market Value", stat: "combinedMarketValue" },
      { title: "Home Grown Players", stat: "homeGrownPlayers" },
      { title: "Most Defenders", stat: "mostDefenders" },
      { title: "Most Forwards", stat: "mostForwards" },
    ],
  },
];

export { tabs };
