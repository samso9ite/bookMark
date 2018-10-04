//Listening to form event
document.getElementById('formstyle').addEventListener('submit',savebookmarks);
function savebookmarks(e) {
    var siteName = document.getElementById('site_name').value;
    var siteUrl = document.getElementById('site_url').value;
// Form Validation
    if(!validatingForm(siteName,siteUrl)){
        return false;
    }

    var site = {
        site_name: siteName,
        site_url: siteUrl,
        site_id: ""
    };

    // Inserting into local storage
     if(localStorage.getItem('sites') === null){
         var sites=[];
         sites.push(site);
         localStorage.setItem('sites', JSON.stringify(sites));
     }
     else{
          var sites= JSON.parse(localStorage.getItem('sites'));
         sites.push(site);
         localStorage.setItem('sites', JSON.stringify(sites));
     }
     fetchBookmarks();
    //Clear Form
    document.getElementById('formstyle').reset;

    e.preventDefault();
}
function deleteBookmark(site_url){
   // Getting the bookmarks from the local storage
    var sites = JSON.parse(localStorage.getItem('sites'));
    // looping through the bookmarks
    for(var i=0; i < sites.length; i++){
        if(sites[i].site_url==site_url){
            sites.splice(i,1)
        }
    }
    localStorage.setItem('sites', JSON.stringify(sites));
    //Refetch Bookmarks
    fetchBookmarks();
}

//Building the output
    //fetch bookmarks
    function fetchBookmarks() {
        //Get the input from the local storage
        var sites= JSON.parse(localStorage.getItem('sites'));
        // getting the html ID
        var bookmarksResult = document.getElementById('bookmarksResult');
        // Build Output
        bookmarksResult.innerHTML ='';
        for(var i=0; i < sites.length; i++) {
            var site_name = sites[i].site_name;
            var site_url = sites[i].site_url;
            bookmarksResult.innerHTML += '<div class="well" style="padding:0">'+
                                         '<h3>'+site_name+
                                         '<a class="btn btn-primary" target="_blank" href="'+site_url+'">Visit Site</a>' +
                                         '<a onclick="deleteBookmark(\''+site_url+'\')" class="btn btn-danger"> Delete</a>'+
                                        '</h3>'+
                                        '</div>'
        }
    }
// validating if the user fills in the selected field
    function validatingForm(siteName,siteUrl) {
        if (!siteName || !siteUrl) {
            alert('Please fill in the required field');
            return false;
        }
        // validating if the user url is a valid url
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if (!siteUrl.match(regex)) {
            alert("please input the correct URL");
            return false;
        }
        return true;
    }