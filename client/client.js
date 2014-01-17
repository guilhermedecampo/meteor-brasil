//Aqui subscrevemos as colecoes publicadas.

Meteor.subscribe("posts");
Meteor.subscribe("admin");

//////////////////////////////////////////////////////////////

Handlebars.registerHelper('mark', function (options) {
      var message = options.fn(this),
        markedMessage = null;
        markedMessage = marked(message);
        markedMessage = markedMessage.replace(/<a href/g, '<a target="_blank" href');
        return markedMessage;
    });


//////////////////////////////////////////////////////////////

//Validacoes
//Campo Vazio
isNotEmpty = function (val) {
  if (!val || val === ''){
    humane.log('Merci de remplir tous les champs.');
    return false;
  }
  return true;
};

//Limpar o campo email.
trimInput = function (val) {
  return val.replace(/^\s*|\s*$/g, "");
};

//Verificar se e um email.
isEmail = function (val) {
  if (val.indexOf('@') !== -1) {
      return true;
    } else {
      humane.log('Merci de rentrer une adresse e-mail valide.');
      return false;
    }
};


isNumber = function (val) {
  if (parseFloat(val) && isFinite(val)) {
      return true;
    } else {
      humane.log('Please enter a valid number!');
      return false;
    }
};

//Verificar se e uma senha valida
isValidPassword = function (val, field) {
  if (val.length >= 6) {
    return true;
  } else {
    humane.log('Votre mot de passe doit contenir 6 caractères minimum.');
    return false;
  }
};

//Verificar se nao existe nenhum post igual (pelo menos o titulo ;)
isNotTheSame = function (val) {
  var user = Meteor.user();
  var email = (user.emails && user.emails[0] && user.emails[0].address);
  Meteor.call('emailTest', val, function (e, r) {
      Session.set('valid',r);
  });
  console.log(Session.get('valid'));
  if (val != email) {
      //
      if (Session.get('valid')) {
        return true;
      } else {
        humane.log('Ooops, adresse e-mail déjà utilisée !');
        return false;
      }
      //
    } else {
      return true;
    }
};

//Timer to save data
myTimer = function(){
    var timer;

    this.set = function(saveFormCB) {
      timer = Meteor.setTimeout(function() {
        saveFormCB();
      }, 3000);
    };

    this.clear = function() {
      Meteor.clearInterval(timer);
    };

    return this;
  }();
