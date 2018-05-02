var Client = require('mariasql');

table = require('./all');

var c = new Client({
	host: 'localhost',
	user: 'James',
	password: 'Comecomp123'
});


c.query('USE cluebot', function(err, rows) {
if (err)
	throw err;
});


c.query('CREATE OR REPLACE TABLE items (id int PRIMARY KEY, '
	+ 'item tinytext NOT NULL, level varchar(6) NOT NULL, ' 
	+ 'rarity varchar(6) NOT NULL, stackable TINYINT(1) NOT NULL)', 
	function(err, rows) {
if (err)
	throw err;
});


for(var i = 0; i < table.length; i++){
	c.query('INSERT INTO items (id, item, level, rarity, stackable) VALUES (:id, :item, :level, :rarity, :stackable)',
		{ 	
			id: table[i].id, 
			item: table[i].item,
			level: table[i].level,
			rarity: table[i].rarity,
			stackable: table[i].stackable
		}, 
		function(err, rows) {
	if (err)
		throw err;
	console.dir(rows);
	});
}

// for(var i = 0; i < table.length; i++){
// 	c.query('INSERT INTO stackables (item_id) VALUES (:item_id)',
// 		{ 	
// 			item_id: table[i].id
// 		}, 
// 		function(err, rows) {
// 	if (err)
// 		throw err;
// 	console.dir(rows);
// 	});
// }




c.end();



