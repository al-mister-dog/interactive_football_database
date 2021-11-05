# Interactive Database using React, Node, MySQL, AWS and RapidAPI

Footybase is a table-based football data site, with a fully interactive table interface which allows the user to make much more bespoke queries than on any other football site. You can find information such as which German defender has the highest xg, or how who is the youngest player to start every match for Man City, just by clicking around the table!

Users can also save their tables and bookmark other user's tables, as well as choosing their favourite teams.

## How does it work

Footybase uses a REST api to manage various field-value combinations that the user makes, first by configuring the combinations into http queries in React, which then get sent to Node where the combinations are fed into Node's MySQL library and sent back to React in object-array format. The React Table uses the Material UI data table component and acts dynamically to the number of columns and rows in the response. This means that the underlying architecture would be applicable for any SQL database data, as well as noDB data, which has been used in earlier incarnations of footybase.

The user can save tables that they have edited, and they are saved in MySQL as http queries, acting as light-weight Stored Procedures, which can be instantly accessed through the site. The online database is stored in a Clear DB database on the server in Heroku.

To keep the league tables up to date, the server make one scheduled call to rapidAPI each day, saving network overhead. Potentially the player database could make a call to rapidAPI and store the data in MySql, but this is would be a task for the future.

Images are stored in AWS' S3 bucket.

Future features include utilising more advanced methods of making table queries. I hope to be able to make use of SQL's GROUP BY and other aggregated functions, and making them accesible to client-side users.

## Libraries, Dependencies and Hosting
Footybase uses the following libraries, dependencies and platforms:
React
React-Router-Dom
Context-Api
Material-UI
Node-JS
Express
MySql
ClearDB
AWS (Amazon Web Services)
RapidAPI
NodeMailer
NodeMailer-SendGrid
Bcrypt
Node-Crypto
Node-FileSystem
Multer
Git
Heroku
Netlify
