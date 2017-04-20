// API URLS
var url = 'https://us.api.battle.net/wow/character/bleeding-hollow/Thelionas';
var classApiUrl = 'https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=keenufzn5q7n6jnb6yte5acxswu2u9f7';

// Empty Objects for Storing API Data
var toonData = {};
var classIds = {};


// Displays Character's Class
function getClass() {

	// Gets Class Data from API
	$.getJSON(classApiUrl, function(classData) {
		classIds = classData;

		// Loops through classIds object to find a class id match
		for (i = 0; i < classIds.classes.length; i++) {
			if (classIds.classes[i].id === toonData.class) {
				$('.js-player-class').html(classIds.classes[i].name);
				break;
			}
		}
	});
}

// Displays Data on Page
function displayData(data) {
	$('.js-character-name').html(data.name);
	$('.js-level').html(data.level);

	getClass();
}



// Runs on Page Load
$(function() {
	var query = {
		locale: 'en_US',
		apikey: 'keenufzn5q7n6jnb6yte5acxswu2u9f7'
	}
	// Gets Character Data from API
	$.getJSON(url, query, function(data) {
  		toonData = data;
  		displayData(toonData);
	});
});










/*
$('#js-search-form').submit(function(e) {
	e.preventDefault();
	var query = {
		locale: 'en_US',
		apikey: 'keenufzn5q7n6jnb6yte5acxswu2u9f7'
	}

	$.getJSON(url, query, function(data) {
  		console.log(data);
	});
});
*/


/*
function displayData(data) {
	if (data.items) {
		data.items.forEach(function(item) {
			$('.js-character-name').html(item.name);
		});
	}
}
*/

/*var classIds = [
	{id:1, name:'Warrior'},
	{id:2, name:'Paladin'},
	{id:3, name:'Hunter'},
	{id:4, name:'Rogue'},
	{id:5, name:'Priest'},
	{id:6, name:'Death Knight'},
	{id:7, name:'Shaman'},
	{id:8, name:'Mage'},
	{id:9, name:'Warlock'},
	{id:10, name:'Monk'},
	{id:11, name:'Druid'},
	{id:12, name:'Demon Hunter'}

];

var raceIds = [
	{id:1, name:''},
	{id:2, name:''},
	{id:3, name:''},
	{id:4, name:''},
	{id:5, name:''},
	{id:6, name:''},
	{id:7, name:''},
	{id:8, name:''},
	{id:9, name:''},
	{id:10, name:'Blood Elf'},
	{id:11, name:''},
	{id:12, name:''},
	{id:13, name:''},
];*/