import {Link} from "react-router-dom"
import { Card, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  infoBoxCardTwo: {
    width: "80%",
    margin: "auto",
    marginTop: 40,
    boxShadow: "none",
    border: "1px solid #c0ca33",
    "@media (max-width: 780px)": {
      width: "100%",
    }
  },
  tables: {
    display: "flex",
    justifyContent: "space between",
    flexWrap: "wrap",
  },
  tableTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  tableCard: {
    width: "48%",
    height: "100px",
    marginRight: "0.9rem",
    marginTop: "1rem",
    boxShadow: "none",
    border: "1px solid #c0ca33",
    padding: "5px",
    "@media (max-width: 780px)": {
      width: "100%",
    }
  },
  hidden: {
    display: "none",
  },
}));
export default function UserTables({user, id, username, userTables, handleMyTablesClick, handleDeleteTable}) {
  const classes = useStyles();
  return (
    <Card
      className={classes.infoBoxCardTwo}
      style={{
        border: "none",
        boxShadow: "none",
        background: "#fafafa",
      }}
    >
      <Typography variant="h6">My Tables</Typography>
      <div className={classes.tables}>
        {userTables.length < 1 ? (
          <Typography variant="h5" style={{ padding: "5px" }}>
            {username} Has No Tables Yet!
          </Typography>
        ) : (
          userTables.map((item) => {
            return (
              <Card key={item.id} className={classes.tableCard}>
                <div className={classes.tableTitle}>
                  <Link
                    to="/table"
                    style={{ textDecoration: "none", color: "#0969da" }}
                  >
                    <Typography
                      variant="h6"
                      style={{ padding: "5px" }}
                      onClick={() =>
                        handleMyTablesClick(
                          item.id,
                          item.user_id, 
                          item.title, 
                          item.username, 
                          item.url
                        )
                      }
                    >
                      {item.title}
                    </Typography>
                  </Link>
                  <IconButton
                    className={user.id !== id ? classes.hidden : ""}
                    onClick={() => handleDeleteTable(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>

                <Typography varaiant="subtitle" style={{ padding: "5px" }}>
                  {item.description}
                </Typography>
              </Card>
            );
          })
        )}
      </div>
    </Card>
  );
}
