const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('seed')) {
	window.history.replaceState({}, '', location.pathname)
}

var randpos = 0

//init
$("#seed").keyup(function () {
	fire();
});


$("#seed").val(
	urlParams.get('seed') || Math.floor(Math.random() * 10000)
);
fire();

function clearboard() {
	document.getElementById("score").innerHTML = ''
	var canvas = document.getElementById('wave');
	var ctx = canvas.getContext("2d");
	var cw = canvas.width;
	var ch = canvas.height;
	ctx.clearRect(0, 0, cw, ch);
}


function fire() {
	clearboard();
	//get seed and set the seed for randomizer
	var seed = document.getElementById("seed").value;
	Math.seedrandom(seed.toLowerCase());
	randpos = Math.random() * 1000

	var randomNumber = Math.floor(Math.random() * data.length);
	var words = data[randomNumber];

	document.getElementById("score").innerHTML = ""

	document.getElementById("word1").textContent = words[0];
	document.getElementById("word2").textContent = words[1];
	
	let colors = [
		"#0C7C70",
		"#C5ABC2",
		"#6E7999",
		"#81BED3",
		"#BCC7CD",
		"#DC622D",
		"#0195D9",
		"#DEAC01"
	].sort(()=> 0.5 - Math.random());

	$("table.word th,td").css({ "background-color": colors[0] });
	$("table.word th:nth-child(even),table.word td:nth-child(even)").css({ "background-color": colors[1] });
}

//enable pressing 'Enter' on seed field
document.getElementById('seed').onkeypress = function (e) {
	if (!e) e = window.event;
	var keyCode = e.keyCode || e.which;
	if (keyCode == '13') {
		// Enter pressed
		fire();
		return false;
	}
}

function copySeedUrl() {
	var seed = document.getElementById("seed").value;
	const seedUrl = `${window.location.origin}${window.location.pathname}?seed=${seed}`;
	copyStringToClipboard(seedUrl);
}

function copyStringToClipboard(str) {
	// Create new element
	var el = document.createElement('textarea');
	// Set value (string to be copied)
	el.value = str;
	// Set non-editable to avoid focus and move outside of view
	el.setAttribute('readonly', '');
	el.style = { position: 'absolute', left: '-9999px' };
	document.body.appendChild(el);
	// Select text inside element
	el.select();
	// Copy text to clipboard
	document.execCommand('copy');
	// Remove temporary element
	document.body.removeChild(el);
}

