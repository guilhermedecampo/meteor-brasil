//Define qual template sera base onde o iron-router vai renderizar o template.
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  //Router para a area Administrativa
  this.route('admin', {path: '/admin',
    //Antes de renderizar o template verifica se o usuario esta logado. Se nao o rediciona para index a pagina inicial
    before: function () {
      if (Meteor.user()) {
      } else {
        this.redirect('/');
      }
    },
    fastRender: true
  });
  //Router para a pagina inicial com todos os posts e a barra lateral.
  this.route('index', {path: '/',
    data: function () {
      if(Meteor.isClient) {
        Session.set('list', Posts.find({},{sort: {SortCreated: -1}, limit: 10}).fetch());
      }
    },
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });

  this.route('index', {path: '/artigos',
    data: function () {
      if(Meteor.isClient) {
        Session.set('list', Posts.find({category: 'artigo'},{sort: {SortCreated: -1}, limit: 10}).fetch());
      }
      },
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });

  this.route('index', {path: '/videos-tutoriais',
    data: function () {
      if(Meteor.isClient) {
      Session.set('list', Posts.find({category: 'videoTutorial'},{sort: {SortCreated: -1}, limit: 10}).fetch());
      }
    },
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });

  this.route('sobre', {path: '/sobre',
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });
  this.route('membros', {path: '/membros',
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });
  this.route('p&t', {path: '/p&t',
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });
  this.route('projetos', {path: '/projetos',
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });
  this.route('mural', {path: '/mural',
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });
  this.route('revisao', {path: '/rev-versoes',
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });
  //Router para a pagina dos posts.
  //Aqui pegamos o valor da URL e se for uma slug do post renderiza o template post com as informacoes do post
  this.route('post', {path: '/:slug',
    data: function () {
      if(Meteor.isClient) {
      if (Posts.findOne({slug: this.params.slug})) {
        return Posts.findOne({slug: this.params.slug});
      } else {
        this.redirect('/');
      }
      }
    },
    after: function () {
      document.body.scrollTop = 0;
    },
    fastRender: true
  });

});


