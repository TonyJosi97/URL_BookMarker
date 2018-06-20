document.getElementById('myForm').addEventListener('submit', saveBookmarks);

function saveBookmarks(e)
{
	//console.log('It works!');

	//Get form values
	var siteFolder = document.getElementById('siteFolder').value;
	var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

    if(!validateForm(siteName, siteURL, siteFolder))
    {
    	return false;
    }

    var bookmarkObject = {
    	folder: siteFolder,
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
		var flag = 0;
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		for(var i = 0; i < bookmarks.length; i++)
		{
			if(bookmarks[i].folder == siteFolder)
			{
				flag = 1;
				bookmarks.splice(i, 0, bookmarkObject);
				console.log("Done");
				break;
			}
		}

		if(flag == 0)
		{
			bookmarks.push(bookmarkObject);
		}

		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	document.getElementById('myForm').reset();

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

	
	if(bookmarks.length > 0)
	{
		prevFolder = bookmarks[0].folder;
	}


	for(var i = 0; i < bookmarks.length; i++)
	{
		var folder = bookmarks[i].folder;
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		if(i == 0)
		{
			bookmarksResults.innerHTML += '<div class="well">'+
										'<h2>'+folder+'<\h2>'+ 
										'</div>';
		}

		if(prevFolder != folder)
		{
			bookmarksResults.innerHTML += '<div class="well">'+
										'<br>'+
										'<h2>'+folder+'<\h2>'+ 
										'<h4>'+name+
										'<a class = "btn btn-default" target="_blank" href="'+url+'" > VISIT SITE </a>'+
										'<a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-danger" href="#">DELETE BOOKMARK</a>'+
										'</h4>'+
										'</div>';
			prevFolder = folder;
		}

		else
		{
			bookmarksResults.innerHTML += '<div class="well">'+
											'<h4>'+name+
											'<a class = "btn btn-default" target="_blank" href="'+url+'" > VISIT SITE </a>'+
											'<a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-danger" href="#">DELETE BOOKMARK</a>'+
											'</h4>'+
											'</div>';
		}

	}

}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl || !siteFolder){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}