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
      { title: "Most Defenders", stat: "mostDefenders" },
      { title: "Most Forwards", stat: "mostForwards" },
    ],
  },
];

export { tabs };

// Arsenal	London (Holloway)	Emirates Stadium	60,704
// Aston Villa	Birmingham	Villa Park	42,682
// Brentford	London (Brentford)	Brentford Community Stadium	17,250
// Brighton & Hove Albion	Brighton	Falmer Stadium	31,800
// Burnley	Burnley	Turf Moor	21,944
// Chelsea	London (Fulham)	Stamford Bridge	40,834
// Crystal Palace	London (Selhurst)	Selhurst Park	25,486
// Everton	Liverpool (Walton)	Goodison Park	39,414
// Leeds United	Leeds	Elland Road	37,792
// Leicester City	Leicester	King Power Stadium	32,312
// Liverpool	Liverpool (Anfield)	Anfield	53,394
// Manchester City	Manchester (Bradford)	Etihad Stadium	55,017
// Manchester United	Manchester (Old Trafford)	Old Trafford	74,140
// Newcastle United	Newcastle upon Tyne	St James' Park	52,305
// Norwich City	Norwich	Carrow Road	27,244
// Southampton	Southampton	St Mary's Stadium	32,384
// Tottenham Hotspur	London (Tottenham)	Tottenham Hotspur Stadium	62,850
// Watford	Watford	Vicarage Road	22,200
// West Ham United	London (Stratford)	London Stadium	60,000
// Wolverhampton Wanderers	Wolverhampton	Molineux Stadium	32,050

// FC Augsburg	Augsburg	WWK Arena	30,660	[3]
// Hertha BSC	Berlin	Olympiastadion	74,649	[4]
// Union Berlin	Berlin	Stadion An der Alten Försterei	22,012	[5]
// Arminia Bielefeld	Bielefeld	Schüco-Arena	27,300	[6]
// VfL Bochum	Bochum	Vonovia Ruhrstadion	27,599	[7]
// Borussia Dortmund	Dortmund	Signal Iduna Park	81,365	[8]
// Eintracht Frankfurt	Frankfurt	Deutsche Bank Park	51,500	[9]
// SC Freiburg	Freiburg im Breisgau	Dreisamstadion
// Europa-Park Stadion1	24,000, 34,700 [3]
// Greuther Fürth	Fürth	Sportpark Ronhof Thomas Sommer	16,626	[13]
// 1899 Hoffenheim	Sinsheim	PreZero Arena	30,150	[14]
// 1. FC Köln	Cologne	RheinEnergieStadion	49,698	[15]
// RB Leipzig	Leipzig	Red Bull Arena	47,069	[16]
// Bayer Leverkusen	Leverkusen	BayArena	30,210	[17]
// Mainz 05	Mainz	Mewa Arena	34,000	[18]
// Borussia Mönchengladbach	Mönchengladbach	Borussia-Park	54,057	[19]
// Bayern Munich	Munich	Allianz Arena	75,000	[20]
// VfB Stuttgart	Stuttgart	Mercedes-Benz Arena	60,449	[21]
// VfL Wolfsburg	Wolfsburg	Volkswagen Arena	30,000
