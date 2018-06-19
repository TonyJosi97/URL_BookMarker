document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e)
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

	//Prevent form from submitting
	e.preventDefault();
}