// API URLs
var classApiUrl = 'https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=keenufzn5q7n6jnb6yte5acxswu2u9f7';
var raceApiUrl = 'https://us.api.battle.net/wow/data/character/races?locale=en_US&apikey=keenufzn5q7n6jnb6yte5acxswu2u9f7';

// Displays Character's Class
function getClass(toonClass) {
	// Gets Class Data from API
	$.getJSON(classApiUrl, function(classData) {
		// Loops through classData object to find a class id match
		for (i = 0; i < classData.classes.length; i++) {
			if (classData.classes[i].id === toonClass) {
				$('.js-player-class').html(classData.classes[i].name);
				break;
			}
		}
	});
}

// Display's Character's Race
function getRace(toonRace) {
	$.getJSON(raceApiUrl, function(raceData) {
		// Loops through raceData object to find a race id match
		for (var i = 0; i < raceData.races.length; i++) {
			if (raceData.races[i].id === toonRace) {
				$('.js-player-race').html(raceData.races[i].name);
				break;
			}
		}
	});
}

// Displays Character's Profile Image
function getProfileImage(image, race) {
	var imageUrl = 'http://render-us.worldofwarcraft.com/character/' + image.replace('avatar', 'profilemain');
	var noImageUrl = 'http://us.battle.net/wow/static/images/2d/profilemain/race/' + race + '-0.jpg';

	$('.toon-image').css('background-image', 'url("' + imageUrl + '"), url("' + noImageUrl + '")');
}

// Displays Character's Gear

function getGear(toonGear) {
	var gearList = '';

	// Goes through each key in the items object, and runs the following function
	$.each(toonGear, function(key, value) {

		// Makes sure to skip the first two keys of the object
		if (key !== 'averageItemLevel' && key !== 'averageItemLevelEquipped') {

			// Checks to make sure bonusLists isn't empty and generates a string of comma separated bonus list ids
			function bl(bonusLists) {
				if (bonusLists.length > 0) {
					var blResult = '?bl=';
					for (var i = 0; i < bonusLists.length; i++) {
						blResult += bonusLists[i] + ',';
					}
					return blResult + '&';
				} else {
					return '?';
				}
			}

			// Generates an API url for the item
			var url = 'https://us.api.battle.net/wow/item/' + value.id + bl(value.bonusLists) + 'apikey=keenufzn5q7n6jnb6yte5acxswu2u9f7';

			// Calls the API for the current item being looped through
			$.getJSON(url, function(itemData) {

				// Compares the itemSubClass id with the list of corresponding values to return the appropriate item material
				function material(itemClass, itemSubClass) {

					// List of subclass ids and their corresponding values
					var subClassList = ['Miscellaneous','Cloth','Leather','Mail','Plate','Bucklers','Shield','Libram','Idol','Totem','Sigil','Relic']
					var subClassWeaponList = ['Axe','Axe','Bow','Gun','One-Handed Mace','Two-Handed Mace','Polearm','One-Handed Sword','Two-Handed Sword','Obsolete','Stave','One-Handed Exotic','Two-Handed Exotic','Fist Weapon','Miscellaneous','Dagger','Thrown','Spear','Crossbow','Wand','Fishing Pole']

					if (itemClass === 4) {
						for (var i = 0; i < subClassList.length; i++) {
							if (itemSubClass === i) {
								return subClassList[i];
								break;
							}
						}
					} else {
						for (var i = 0; i < subClassWeaponList.length; i++) {
							if (itemSubClass === i) {
								return subClassWeaponList[i];
								break;
							}
						}
					}
					
				}

				// Checks to make sure the nameDescription key is not empty, returns nothing if it is
				function nameDesc(nameData) {
					if (nameData !== '') {
						return '<span>' + nameData + '</span><br>'
					} else {
						return '';
					}
				}

				// Checks to make sure the armor key is not empty, returns nothing if it is
				function armor(armorData) {
					if (armorData === 0) {
						return '';
					} else {
						return '<span>' + armorData + ' Armor</span><br>';
					}
				}

				// Makes sure to reformat certain key values if needed
				function keyFormatter(key) {
					switch (key) {
						case 'finger1':
						case 'finger2':
							return 'Finger';
							break;
						case 'trinket1':
						case 'trinket2':
							return 'Trinket';
							break;
						case 'mainHand':
							return 'Main-Hand';
							break;
						case 'offHand':
							return 'Off-Hand';
							break;
						default:
							return key;
					}
				}

				// Goes through the array of stats for the item, and adds HTML for each one to the string
				function gearStats(bonusStats) {

					// List of stat ids and their corresponding values
					var statList = [
						{'id': '-1','stat': 'None'},{'id': '0','stat': 'Mana'},{'id': '1','stat': 'Health'},{'id': '3','stat': 'Agility'},{'id': '4','stat': 'Strength'},
						{'id': '5','stat': 'Intellect'},{'id': '6','stat': 'Spirit'},{'id': '7','stat': 'Stamina'},{'id': '12','stat': 'Defense Skill'},{'id': '13','stat': 'Dodge'},
						{'id': '14','stat': 'Parry'},{'id': '15','stat': 'Block'},{'id': '16','stat': 'Melee Hit'},{'id': '17','stat': 'Ranged Hit'},{'id': '18','stat': 'Spell Hit'},
						{'id': '19','stat': 'Melee Crit'},{'id': '20','stat': 'Ranged Crit'},{'id': '21','stat': 'Spell Crit'},{'id': '22','stat': 'Melee Hit Taken'},
						{'id': '23','stat': 'Ranged Hit Taken'},{'id': '24','stat': 'Spell Hit Taken'},{'id': '25','stat': 'Melee Crit Taken'},{'id': '26','stat': 'Ranged Crit Taken'},
						{'id': '27','stat': 'Spell Crit Taken'},{'id': '28','stat': 'Melee Haste'},{'id': '29','stat': 'Ranged Haste'},{'id': '30','stat': 'Spell Haste'},
						{'id': '31','stat': 'Hit'},{'id': '32','stat': 'Crit'},{'id': '33','stat': 'Hit Taken'},{'id': '34','stat': 'Crit Taken'},{'id': '35','stat': 'Resilience'},
						{'id': '36','stat': 'Haste'},{'id': '37','stat': 'Expertise'},{'id': '38','stat': 'Attack Power'},{'id': '39','stat': 'Ranged Attack Power'},
						{'id': '40','stat': 'Versatility'},{'id': '41','stat': 'Spell Healing Done'},{'id': '42','stat': 'Spell Damage Done'},{'id': '43','stat': 'Mana Regeneration'},
						{'id': '44','stat': 'Armor Penetration'},{'id': '45','stat': 'Spell Power'},{'id': '46','stat': 'Health Regen'},{'id': '47','stat': 'Spell Penetration'},
						{'id': '48','stat': 'Block Value'},{'id': '49','stat': 'Mastery'},{'id': '50','stat': 'Bonus Armor'},{'id': '51','stat': 'Fire Resistance'},
						{'id': '52','stat': 'Frost Resistance'},{'id': '53','stat': 'Holy Resistance'},{'id': '54','stat': 'Shadow Resistance'},{'id': '55','stat': 'Nature Resistance'},
						{'id': '56','stat': 'Arcane Resistance'},{'id': '57','stat': 'PVP Power'},{'id': '58','stat': 'Amplify'},{'id': '66','stat': 'Cleave'},
						{'id': '60','stat': 'Readiness'},{'id': '61','stat': 'Speed'},{'id': '62','stat': 'Leech'},{'id': '63','stat': 'Avoidence'},{'id': '64','stat': 'Indestructible'},
						{'id': '65','stat': 'WOD_5'},{'id': '59','stat': 'Multistrike'},{'id': '73','stat': 'Agility or Intellect'},{'id': '71','stat': 'Strength, Agility or Intellect'},
						{'id': '72','stat': 'Strength or Agility'},{'id': '74','stat': 'Strength or Intellect'},{'id': '45','stat': 'Spell Power'}
					]

					var statResults = '';

					for (var i = 0; i < bonusStats.length; i++) {
						for (var x = 0; x < statList.length; x++) {
							if (bonusStats[i].stat == statList[x].id) {
								statResults += '<span> +' + bonusStats[i].amount + ' ' + statList[x].stat + '</span><br>';
							}
						}
					}

					return statResults;
				}

				// Checks to see if there is any use description or flavor text, and returns it to the string if there is
				function itemBonus(spellData, descData) {

					// Checks to see if there is any flavor text, and returns it in a string
					function flavor(descData) {
						if (descData !== '') {
							return '<p>"' + descData + '"</p>'
						} else {
							return '';
						}
					}

					// Checks to see if there is any use description, and returns it in a string
					function use(spellData) {

						var useResult = '';

						// Reformats the trigger for an item use
						function trigger(trig) {
							switch (trig) {
								case 'ON_EQUIP':
									return 'Equip: '
									break;
								case 'ON_USE':
									return 'Use: '
									break;
								default:
									break;
							}
						}

						for (var i = 0; i < spellData.length; i++) {
							if (spellData[i].spell.description !== '') {
								useResult += '<p>' + trigger(spellData[i].trigger) + spellData[i].spell.description + '</p>';
							}
						}

						return useResult;
					}

					if (use(spellData) === '' && flavor(descData) === '') {
						return '';
					} else {
						return '<div class="row"><div class="col-12">' + use(spellData) + flavor(descData) + '</div></div>';
					}
				}

				function getQuality(quality) {
					var qualityList = ['poor','common','uncommon','rare','epic','legendary','artifact','heirloom','wow-token']

					for (var i = 0; i < qualityList.length; i++) {
						if (quality === i) {
							return qualityList[i];
							break;
						}
					}
				}

				// Adds a string of HTML for each item to the originally empty gearList variable
				gearList += '<li class="' + getQuality(itemData.quality) + '"><div class="row"><div class="col-12"><h4>' + keyFormatter(key) + '</h4></div></div><div class="row"><div class="col-2-5"><div><img src="http://media.blizzard.com/wow/icons/56/'
					+ itemData.icon + '.jpg"></div></div><div class="col-5-5"><div><span>' + itemData.name + '</span><br>'
					+ nameDesc(itemData.nameDescription) + '<span>Item Level ' + itemData.itemLevel + '</span><br><span>' + material(itemData.itemClass, itemData.itemSubClass) + '</span></div></div>'
					+ '<div class="col-4"><div>' + armor(itemData.armor) + gearStats(itemData.bonusStats) + '</div></div></div>' + itemBonus(itemData.itemSpells, itemData.description) + '</li>';

				// Adds the string of HTML for all the gear to the page
				$('.gear-list').html(gearList);
			});
		}
	});
}

function getTalents(toonTalents) {

	function specButton(toonTalents) {
		var specButtonResult = '';
		var specListResult = '';

		for (var i = 0; i < toonTalents.length; i++) {
			if (toonTalents[i].spec !== undefined) {
				specButtonResult += '<button class="button spec-' + i + '"><img src="http://media.blizzard.com/wow/icons/36/' + toonTalents[i].spec.icon
					+ '.jpg"><h3>' + toonTalents[i].spec.name + '</h4><p>(' + toonTalents[i].spec.role + ')</p></button>';

				if (toonTalents[i].selected === true) {
					specListResult += '<ul class="talent-list spec-' + i + '-list">';
				} else {
					specListResult += '<ul class="talent-list spec-' + i + '-list hidden">';
				}

				if (toonTalents[i].talents.length === 0) {
					specListResult += '<li><div class="row"><div class="col-12"><img src="http://media.blizzard.com/wow/icons/56/'
						+ toonTalents[i].spec.icon + '.jpg"><h2>' + toonTalents[i].spec.name + '</h2><p>' + toonTalents[i].spec.description
						+ '</p></div></div></li><li><div class="row"><div class="col-12"><h3>No Talents Selected</h3><br></div></div></li>';
				} else {
					for (var x = 0; x < toonTalents[i].talents.length; x++) {

					if (x === 0) {
						specListResult += '<li><div class="row"><div class="col-12"><img src="http://media.blizzard.com/wow/icons/56/'
							+ toonTalents[i].spec.icon + '.jpg"><h2>' + toonTalents[i].spec.name + '</h2><p>' + toonTalents[i].spec.description
							+ '</p></div></div></li>';
					}

					specListResult += '<li><div class="row"><div class="col-12"><img src="http://media.blizzard.com/wow/icons/36/'
						+ toonTalents[i].talents[x].spell.icon + '.jpg"><h3>' + toonTalents[i].talents[x].spell.name + '</h3><p>' + toonTalents[i].talents[x].spell.castTime
						+ '</p></div></div><div class="row"><div class="col-12"><p>' + toonTalents[i].talents[x].spell.description + '</p></div></div></li>'
					}
				}

				specListResult += '</ul>';
				
			}
		}

		return specButtonResult + '</div>' + specListResult;
	}

	var talentList = '<div class="btn-group">' + specButton(toonTalents);

	$('.spec-buttons').html(talentList);

}

// Displays Data on Page
function displayData(toonData) {

	console.log(toonData.name);

	$('.js-character-name').html(toonData.name);
	$('.js-level').html(toonData.level);
	$('.js-realm').html(toonData.realm);

	getClass(toonData.class);
	getRace(toonData.race);
	getProfileImage(toonData.thumbnail, toonData.race);

	try {
		$('.js-guild').html(toonData.guild.name);
	} catch (err) {
		$('.js-guild').html('');
	}
	
	$('.js-health').html(toonData.stats.health.toLocaleString());
	$('.js-stamina').html(toonData.stats.sta.toLocaleString());
	$('.js-strength').html(toonData.stats.str.toLocaleString());
	$('.js-agility').html(toonData.stats.agi.toLocaleString());
	$('.js-intellect').html(toonData.stats.int.toLocaleString());
	$('.js-crit-rating').html(toonData.stats.critRating.toLocaleString());
	$('.js-crit').html(toonData.stats.crit.toLocaleString());
	$('.js-haste-rating').html(toonData.stats.hasteRating.toLocaleString());
	$('.js-haste').html(toonData.stats.hasteRatingPercent.toLocaleString());
	$('.js-mastery-rating').html(toonData.stats.masteryRating.toLocaleString());
	$('.js-mastery').html(toonData.stats.mastery.toLocaleString());
	$('.js-versatility').html(toonData.stats.versatility.toLocaleString());
	$('.js-versatility-bonus').html(toonData.stats.versatilityDamageDoneBonus.toLocaleString());
	$('.js-leech-rating').html(toonData.stats.leechRating.toLocaleString());
	$('.js-leech').html(toonData.stats.leech.toLocaleString());
	$('.js-avoidance').html(toonData.stats.avoidanceRating.toLocaleString());
	$('.js-avoidance-bonus').html(toonData.stats.avoidanceRatingBonus.toLocaleString());
	$('.js-armor').html(toonData.stats.armor.toLocaleString());
	$('.js-parry-rating').html(toonData.stats.parryRating.toLocaleString());
	$('.js-parry').html(toonData.stats.parry.toLocaleString());
	$('.js-dodge-rating').html(toonData.stats.dodgeRating.toLocaleString());
	$('.js-dodge').html(toonData.stats.dodge.toLocaleString());
	$('.js-block-rating').html(toonData.stats.blockRating.toLocaleString());
	$('.js-block').html(toonData.stats.block.toLocaleString());

	$('.js-item-level').html(toonData.items.averageItemLevel);
	getGear(toonData.items);

	getTalents(toonData.talents);

	$('.home-screen').addClass('hidden');
	$('.character-screen').removeClass('hidden');
}

// Listens for Button Click
$('.js-search-form').submit(function(e) {

	var realm = $(this).find('.js-realm').val();

	function realmFormat(realm) {
		if (realm.indexOf("'") > -1) {
			realm.replace("'", "");
			return realm;
		} else {
			return realm;
		}
	}

	var name = $(this).find('.js-toon').val();

	var query = {
		locale: 'en_US',
		apikey: 'keenufzn5q7n6jnb6yte5acxswu2u9f7',
		fields: 'guild,stats,items,talents'
	}

	var url = 'https://us.api.battle.net/wow/character/' + realmFormat(realm) + '/' + name;
	console.log(url);
	
	$.getJSON(url, query, function(toonData) {
  		displayData(toonData);
	})
		.fail(function() {
			alert('Realm and/or Player Name not found.');
		});

    e.preventDefault();

	
});

// Gets current list of US servers for autocomplete on page load
var realmList = [];

$(function() {
	$.getJSON('https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=keenufzn5q7n6jnb6yte5acxswu2u9f7', function(realmData) {
  		for (var i = 0; i < realmData.realms.length; i++) {
  			realmList.push(realmData.realms[i].name);
  		}

  		$('#realms').autocomplete({
			source: realmList,
			appendTo: '.realm-container'
		});

		$('#realms-again').autocomplete({
			source: realmList,
			appendTo: '.realm-container-again'
		});
	});
});

// Listens for Talent button clicks
$('.spec-buttons').on('click', '.spec-0', function(event) {
	$('.spec-0-list').removeClass('hidden');
	$('.spec-1-list').addClass('hidden');
	$('.spec-2-list').addClass('hidden');
});

$('.spec-buttons').on('click', '.spec-1', function(event) {
	$('.spec-0-list').addClass('hidden');
	$('.spec-1-list').removeClass('hidden');
	$('.spec-2-list').addClass('hidden');
});

$('.spec-buttons').on('click', '.spec-2', function(event) {
	$('.spec-0-list').addClass('hidden');
	$('.spec-1-list').addClass('hidden');
	$('.spec-2-list').removeClass('hidden');
});

// Accordion
var acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}

// Keeps profile image always on the page, despite scroll
$(window).scroll(function(){
  $('.toon-image').toggleClass('scrolling', $(window).scrollTop() > $('.image-scroll').offset().top);
});