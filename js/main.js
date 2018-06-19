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

	

	//Prevent form from submitting
	e.preventDefault();
}