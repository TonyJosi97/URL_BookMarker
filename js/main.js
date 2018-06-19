document.getElementById('myForm').addEventListener('submit', saveBookmarks);

function saveBookmarks(e)
{
	//console.log('It works!');

	//Get form values
	var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    var bookmarkObject = {
    	name: siteName,
    	url: siteURL
    }


    /*
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
	*/

	if(localStorage.getItem('bookmarks') === null)
	{
		var bookmarks = [];
		bookmarks.push(bookmarkObject);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	else
	{
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmarkObject);
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	fetchBookmarks();

	//Prevent form from submitting
	e.preventDefault();
}



function deleteBookmark(url)
{
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i = 0; i < bookmarks.length; i++)
	{
		if(bookmarks[i].url == url)
			bookmarks.splice(i, 1);
	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	fetchBookmarks();

}



function fetchBookmarks()
{
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//console.log(bookmarks);

	var bookmarksResults = document.getElementById('bookmarksResults');

	bookmarksResults.innerHTML = "";

	for(var i = 0; i < bookmarks.length; i++)
	{
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>'+name+
										'<a class = "btn btn-default" target="_blank" href="'+url+'">VISIT SITE</a>'+
										'<a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-danger" href="#">DELETE BOOKMARK</a>'+
										'</h3>'+
										'</div>';

	}

}