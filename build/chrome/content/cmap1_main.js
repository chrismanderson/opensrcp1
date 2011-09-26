/*
 * Shows/hides the song list per album.
 * Uses the jQuery class selector.
 */
$(document).delegate('.albumInfo','click',function() {
	
	// gets the list of songs for the current album
	var list = $(this).parent().siblings(".songs").attr("collapsed");

	// checks to make sure there is a list
	// shows if the list is currently collapsed, collapses otherwise
	if (list == 'true') {
		$(this).parent().siblings(".songs").attr('collapsed','false');
	}
	
	else {
		$(this).parent().siblings(".songs").attr('collapsed','true');
	}
});

/*
 * Basic constructor for a Javascript object.
 * Inserts default values if nothing is entered.
 * Attempted to use this as the model for the UI, but proved quite tricky.
 */
function Album(album,artist,genre,rating,year,sales) {
	this.album = album || "Album Title";
	this.artist = artist || "Album Artist";
	this.genre = genre || "Genre";
	this.songs = new Array(1);
	this.songs[0] = "Track 1";
	this.rating = rating || "1";
	this.year = year || "2000";
	this.sales = sales || "None";
}

/*
 * Launches the edit window to customize album data.
 * Takes the current node as the sole parameter.
 */
function editAlbumWindow(id) {
	
	// stores the actual album node/album data
	var albumToBeEdited = id.parentNode.parentNode.parentNode;
	var albumData = getAlbumInfo(albumToBeEdited);
	
	// creates the album to be returned by the dialog
	var returnAlbum = new Album();
	
	// calls the dialog as a modal dialog, so it appears as a sheet
	// includes parameters to send a JS object back and forth
	window.openDialog("chrome://cmap1/content/editWindow.xul", "newwindow", "modal,chrome",albumData,returnAlbum);
	
	// once the dialog is closed, sets the current album info to the return value
	// return value will be identical if user clicked cancel
	setAlbumInfo(albumToBeEdited,returnAlbum);
}

/*
 * Creates a new album by cloning an existing album
 * and creates default values
 */
function newAlbumBox() {
	
	// copies an album, sets its data to be the default Album() values
	var newBoxAlbum = document.getElementsByClassName("album")[0].cloneNode(true);
	var album1 = new Album();
	setAlbumInfo(newBoxAlbum,album1);

	newBoxAlbum.getElementsByClassName("songs")[0].setAttribute("rows","5");
	
	// apends the album to the DOM
	var container = document.getElementById("albumList");
	container.appendChild(newBoxAlbum);
}

/*
 * Sets the album data. Takes two parameters, the album node and
 * an album object which contains the data. Looked for a more efficient way of doing this step.
 */
function setAlbumInfo(albumUI,albumData) {

	albumUI.getElementsByClassName('genre')[0].setAttribute('value',albumData.genre);
	albumUI.getElementsByClassName('albumName')[0].setAttribute('value',albumData.album);
	albumUI.getElementsByClassName('rating')[0].setAttribute('value',albumData.rating);
	albumUI.getElementsByClassName('albumArtist')[0].setAttribute('value',albumData.artist);
	albumUI.getElementsByClassName('year')[0].setAttribute('value',albumData.year);
	albumUI.getElementsByClassName('sales')[0].setAttribute('value',albumData.sales);
	
	// sets the song list, which needs to be treated differently as it is an array
	setSongList(albumUI,albumData.songs);
}

/*
 * Sets the song list of the supplied album node. Removes all existing songs
 * before adding new ones - probably a better way of accomplishing this step.
 */

function setSongList(albumUI,albumSongs) {
	
	// gets the node that has the song listbox
	var songsNode = albumUI.getElementsByClassName('songs')[0];
	
	// clears the node
	while (songsNode.firstChild) {
	  songsNode.removeChild(songsNode.firstChild);
	}
	
	// loops through each song, appending it to the song listbox
	for (var i = 0; i < albumSongs.length; i++) {
		var song = document.createElement('listitem');
		song.setAttribute('label',albumSongs[i]);
		albumUI.getElementsByClassName('songs')[0].appendChild(song);
	}
}

/*
 * Gets the song list from a given song node.
 * Returns the new array.
 */
function getSongList(songsNode) {
	
	// creates an array for the songs sized to the number of songs
	var songArray = new Array(songsNode.childNodes.length);

	// loops through each song and adds it to the array
	for (var i = 0; i < songArray.length; i++) {
		songArray[i] = songsNode.childNodes[i].label;
	}
	
	return songArray;
}

/*
 * Parses the album data from a given album DOM object.
 * Returns a JS object of the album data.
 */
function getAlbumInfo(albumUI) {
	
	// creates the album to be returned
	var albumData = new Album();
	
	// parses the data based on class selectors
	albumData.artist = albumUI.getElementsByClassName('albumArtist')[0].value;
	albumData.genre = albumUI.getElementsByClassName('genre')[0].value;
	albumData.album = albumUI.getElementsByClassName('albumName')[0].value;
	albumData.rating = parseInt((albumUI.getElementsByClassName('rating')[0].value));
	albumData.year = albumUI.getElementsByClassName('year')[0].value;
	albumData.sales = albumUI.getElementsByClassName('sales')[0].value;

	albumData.songs = getSongList(albumUI.getElementsByClassName('songs')[0]);
	
	return albumData;
}

/*
 * Removes the album in the current node.
 */
function removeAlbum(x) {
	var albumToRemove = x.parentNode.parentNode.parentNode;
	albumToRemove.parentNode.removeChild(albumToRemove);
}


