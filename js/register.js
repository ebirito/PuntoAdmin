function GetUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function IsLoggedIn()
{
	// Get the username from the querystring
	var username = GetUrlVars()["username"];
	// If user is not logged in or administrator then return to login page
	var user = new StackMob.User({ username: username });
	if (!user.isLoggedIn())
		Logout();
	else{
		user.fetch({
	    success: function(model) {
	    	if(!model.attributes["isAdministrator"])
	    		Logout();
	    },
	    error: function(model, response) {
	    }
	  });
	}
}

function CreateUser(){
	var temporaryPassword = Math.random().toString(36).slice(-8);
	var user = new StackMob.User({ username: $("#txtEmail").val(), password: temporaryPassword, isAdministrator: false, needPasswordChange: true });
	  user.create({
	    success: function(model) {
	      // Display temporary password
	      $("#txtTemporaryPassword").text(temporaryPassword);
	      // Show success message
	      $("#divForm").hide();
	      $("#divSuccess").show();
	    },
	    error: function(model, response) {
	    	// If the email is in use
	   		if (response.error.indexOf("Duplicate key") != -1){
	   			var validator = $("#frmRegister").validate();
				validator.showErrors({"txtEmail": "Ya existe una cuenta con este e-mail."});
	   		}
	    }
	  });
}

function Logout(){
	window.location.href = 'index.html';
}

function Clear(){
	// Reset the form
	document.getElementById("frmRegister").reset();
	// Show it
	$("#divForm").show();
	$("#divSuccess").hide();
}
