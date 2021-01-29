// IMPORT
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { start } = require('repl');
//Create connection
const db = mysql.createConnection({
    host        :   'localhost',
    user        :   'root',
    password    :   'p@ssword',
    port        :   '3306',
    database    :   'covid_dw'
});
//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    else{
        console.log('mySQL connected!');
    }
});
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 
//note: all of this routes will be done like how its done for the node-SQL sample code given

app.get('/', (req, res) => {
    var query = 'SELECT * FROM country_table WHERE country="";';
    db.query(query, (err, result) => {
            if (err) throw err;
            res.render('index.ejs', {
                title:'Home', 
                Data1: result, 
                Data2: result, 
                Data3: result, 
                Data4: result});
    });
});

app.post('/', (req, res) => {
    // get timestamp before running the query
    var pre_query = new Date().getTime();

    var query2 = 'SELECT * FROM country_table WHERE country="";';
    db.query(query2, (err, result2) => {
            if (err) throw err;

    var cases = req.body.cases_table;
    if( cases == 'Roll_Up' ){
        var query = `SELECT
                        month,
                        sum(new_cases) new_cases,
                        sum(total_deaths) total_deaths,
                        sum(new_deaths) new_deaths,
                        sum(total_recovered) total_recovered,
                        sum(new_recovered) new_recovered,
                        sum(active_cases) active_cases
                    FROM 
                        case_table c
                    JOIN 
                        fact_covid f ON c.case_id = f.case_id
                    JOIN 
                        date_table d ON f.date_id = d.date_id
                    GROUP BY 
                        month
                    WITH ROLLUP;`;
        db.query(query, (err, result) => {
                if (err) throw err;
                res.render('index.ejs', {
                    title:'Roll Up Query', 
                    Data1: result, 
                    Data2: result2, 
                    Data3: result2, 
                    Data4: result2
                });
        });
    }
    
    else if( cases == 'Drill_Down' ){
        var query = `SELECT
                        month,
                        day,
                        sum(new_cases) new_cases,
                        sum(total_deaths) total_deaths,
                        sum(new_deaths) new_deaths,
                        sum(total_recovered) total_recovered,
                        sum(new_recovered) new_recovered,
                        sum(active_cases) active_cases
                    FROM
                        case_table c
                    JOIN
                        fact_covid f ON c.case_id = f.case_id
                    JOIN
                        date_table d ON f.date_id = d.date_id
                    GROUP BY
                        day, month`;
        db.query(query, (err, result) => {
                if (err) throw err;
                res.render('index.ejs', {
                    title:'Drill Down Query', 
                    Data1: result2, 
                    Data2: result, 
                    Data3: result2, 
                    Data4: result2
                });
        });
    }

    else if( cases == 'Dice' ){
        var query = `SELECT
                        continent,
                        country,
                        month,
                        sum(new_cases) new_cases,
                        sum(total_deaths) total_deaths,
                        sum(new_deaths) new_deaths,
                        sum(total_recovered) total_recovered,
                        sum(new_recovered) new_recovered,
                        sum(active_cases) active_cases
                    FROM 
                        case_table c
                    JOIN 
                        fact_covid f ON f.case_id = c.case_id
                    JOIN 
                        date_table d ON f.date_id = d.date_id
                    JOIN 
                        country_table ct ON f.country_id = ct.country_id
                    WHERE 
                        continent = "North America" 
                        and month = 7
                    GROUP BY 
                        country`;
        db.query(query, (err, result) => {
                if (err) throw err;
                res.render('index.ejs', {
                    title:'Dice Query', 
                    Data1: result2, 
                    Data2: result2, 
                    Data3: result, 
                    Data4: result2
                });
        });
    }

    else if( cases == 'Slice' ){
        var query = `SELECT
                        month,
                        sum(total_covid_cases) total_covid_cases
                    FROM
                        fact_covid f
                    JOIN
                        date_table d ON f.date_id = d.date_id
                    GROUP BY
                        month`;
        db.query(query, (err, result) => {
                if (err) throw err;
                res.render('index.ejs', {
                    title:'Slice Query', 
                    Data1: result2, 
                    Data2: result2, 
                    Data3: result2, 
                    Data4: result
                });
        });
    }
    else{
        var query = 'SELECT * FROM country_table WHERE country="";';
        db.query(query, (err, result) => {
                if (err) throw err;
                res.render('index.ejs', {
                    title:'Home', 
                    Data1: result, 
                    Data2: result, 
                    Data3: result, 
                    Data4: result});
        });
    }
    });
    
})

app.listen('2000', () => {
    console.log('listening to server at port 2000');
});