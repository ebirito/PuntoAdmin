function Login()
{
	var stackmobUser = new StackMob.User({ username: $("#txtEmail").val(), password: $("#txtPassword").val() });
	//Makes a call to StackMob to request a login
	stackmobUser.login(false, {
	  success: function(user) {
	   // If user is administrator then proceed
	   if(user.isAdministrator){
	    	alert("Bienvenido administrador!");
	    }
	    // otherwise warn the user
	   else{
	   		var validator = $("#frmLogin").validate();
			validator.showErrors({"txtPassword": "Su cuenta no es de tipo Administrador"});
	   }
	  }, 
	  error: function(user, response) {
	    var validator = $("#frmLogin").validate();
		validator.showErrors({"txtPassword": "E-mail o clave no validos"});
	  }
	});
}

function lnkTermsClick()
{
	$.mobile.changePage('pages/terms.html');
}