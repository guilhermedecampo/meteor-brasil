//Publicamos aqui a colecao Posts
Meteor.publish('posts', function () {
    return Posts.find({});
});

//Publicamos aqui toda a colecao de usuarios que o Meteor cria automaticamente para voce
//Fiz isso para ter controle de quem esta utilizando o sistema e previnir possiveis problemas com posts de zueira.

Meteor.publish('admin', function () {
  if (this.userId) {
  var user = Meteor.users.findOne(this.userId);
  var email = (user.emails && user.emails[0] && user.emails[0].address);
  if (email === "guilherme.decampo@gmail.com") {
    return Meteor.users.find({});
  } else {
    this.ready();
  }
  } else {
    this.ready();
  }
});

//Aqui defini que so eu posso remover usuarios. (hehe =))
Meteor.users.allow({
  remove:function() {
    var user = Meteor.users.findOne(this.userId);
    var email = (user.emails && user.emails[0] && user.emails[0].address);
    if(email === "guilherme.decampo@gmail.com") {
      return true;
    } else {
      return false;
    }
    },
});

//Definicao do quem pode fazer o que com a colecao Posts
Posts.allow({
  insert: function (userId, doc) {
        return  (userId && doc.owner === userId);
  },

  update: function (userId, doc, fields, modifier) {
    var user = Meteor.users.findOne({_id: userId});
    var email = (user.emails && user.emails[0] && user.emails[0].address);
    if (email === "guilherme.decampo@gmail.com") {
      return true;
    } else {
    return doc.owner === userId;
    }
  },

  remove: function (userId, doc) {
    var user = Meteor.users.findOne({_id: userId});
        var email = (user.emails && user.emails[0] && user.emails[0].address);
        if (email === "guilherme.decampo@gmail.com") {
          return true;
        } else {
        return doc.owner === userId;
        }
  }


});
//Adicionar mais informações ao profile do usuario
Accounts.onCreateUser(function (options, user) {
  if (options.profile) { // maintain the default behavior
         user.profile = options.profile;
     }
  var accessToken = user.services.facebook.accessToken,
      result,
      profile;

  result = Meteor.http.get("https://graph.facebook.com/me", {
    params: {
      access_token: accessToken
    }
  });

  if (result.error)
    throw result.error;

  profile = result.data;

  user.profile = profile;

  return user;
});

//Metodos utlizados
//Usamos Meteor.startup para ser a primeira coisa a ser feita quando o sistema e iniciado
Meteor.startup(function () {
    // code to run on server at startup
    Meteor.methods({
      //Conta quantos acessos cada post tem =) legal ver essa metrica =)
      counter: function(slug) {
        if (this.userId) {
          var sedi = Posts.findOne({slug:slug});
          if (sedi !== undefined) {
          var sedi = Posts.findOne({slug:slug});
          var openCount = sedi.openCount;
          var id = sedi._id;
          var openPlus = openCount + 1;
          Posts.update({_id: id}, {$set: {openCount: openPlus}});
          return openCount;
        } else {
          return "";
        }
        }
      },
      //Quantos posts Meteor Brasil tem =)
      stCount: function() {
          var count = Posts.find().count();
          return count;
      },
      //Quantas pessoas contribuem com a cricao de posts
      ttCount: function() {
          var count = Meteor.users.find().count();
          return count;
      },
    });
  });

//Sistema de email aqui/ mas provavelmente nao vou usar isso
Meteor.startup(function () {



  });
