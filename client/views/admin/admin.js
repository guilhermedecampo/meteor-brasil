//////////////////////////////////////////////////////////////

////Criacao de helpers para guardar as informacoes dos campos
//Importante para caso alguma merda aconteca tipo: conexao pedida..

Handlebars.registerHelper('titleStore',function(){
  return Session.get("titleStore");
});

Handlebars.registerHelper('descriptionStore',function(){
  return Session.get("descriptionStore");
});

Handlebars.registerHelper('contentStore',function(){
  return Session.get("contentStore");
});

Handlebars.registerHelper('linkStore',function(){
  return Session.get("linkStore");
});


Template.admin.rendered = function () {
  marked.setOptions({
      langPrefix: '',
      breaks: true,
      gfm: true,
      sanitize: true,
      highlight: function(code) {
          return hljs.highlightAuto(code).value;
      }
  });
};


Template.admin.helpers({
  showCreateContent: function () {
    return Session.get('createContent');
  },
  firstName: function () {
    return Meteor.user().profile.first_name;
  },
  list: function () {
    return Posts.find({},{sort: {SortCreated: -1}, limit: 10});
  }
});

///////////////////////////////////////////////////////////

Template.admin.events({
  'click .contentActions': function() {
    if (Session.get('createContent') === true) {
      Session.set('createContent', false);
    } else {
      Session.set('createContent', true);
    }
  },
  //A cada digitacao as letras sao guardadas na variavel reativa Session
  'keyup #title': function (event, template){
    NProgress.start();
      Session.set("titleStore", template.find('#title').value);
    NProgress.done();
  },
  //A cada digitacao as letras sao guardadas na variavel reativa Session
  'keyup #description': function (event, template){
      NProgress.start();
       Session.set("descriptionStore", template.find('#description').value);
      NProgress.done();
  },
  'keyup #link': function (event, template){
      NProgress.start();
       Session.set("linkStore", $('#link').html());
      NProgress.done();
  },
  //A cada digitacao as letras sao guardadas na variavel reativa Session
  'keyup #content': function (event, template){
      NProgress.start();
       Session.set("contentStore", $('#content').val());
      NProgress.done();
  },
  'click #submitPost': function (event, template) {
    var title        = template.find('#title').value,
        content      = $('#content').html(),
        list         = tagsList.findOne(),
        tags         = list.tags,
        slug         = URLify2(title),
        owner        = Meteor.user()._id,
        SortCreated  = new Date(),
        createdAt    = moment().format ('D [de] MMMM [de] YYYY'),
        link         = $('#link').html(),
        category     = template.find('#category').value,
        openCount    = 0;
        NProgress.start();
    if ( isNotEmpty(title)&& isNotEmpty(content))
    {
    Posts.insert({title: title, content: content, tags: tags, slug: slug, owner: owner, SortCreated: SortCreated, createdAt: createdAt, link: link, category: category, openCount: openCount, });
    tagsList.update(list._id, {tags: []});
    //TODO make clean the collection when the user get out of the create page
    Session.set("titleStore", "");
    Session.set("contentStore", "");
    Session.set('linkStore', "");
    Session.set('tags', undefined);
    }
    NProgress.done();

  }
});



////////////////////////////////////////////////////////////Tags Template

Template.createTags.showTag = function () {
  return Session.get("showTag");
};

//Focus Rendered
Template.createTags.rendered = function () {
  var editTag = this.find('#createTag');
  if (Session.get('showTag') === true) {
    editTag.focus();
  }

};



Template.createTags.listTags = function () {

  if (Session.get('tags') === undefined) {
    return _.map([], function (tag) {
      return {tag: tag};
    });
  } else {
    if (Session.get('tags').tags.length > 1) {
    var list = Session.get('tags');
    return _.map(list.tags || [], function (tag) {
      return {tag: tag};
    });
    } else {
      Session.set('tags', tagsList.findOne());
      var list = Session.get('tags');
      return _.map(list.tags || [], function (tag) {
        return {tag: tag};
      });
    }
  }
  };


tagsList = new Meteor.Collection(null);
if (Session.get('tags') === undefined) {
  tagsList.insert( {tags: [] });
}else {
  tagsList.insert( {tags: Session.get('tags').tags});
}


Template.createTags.events({
  'click #addTag': function (event, template) {
    Session.set("showTag", true);

  },
  'focusout #createTag': function (event, template) {
    var tag = template.find('#createTag').value;
    var list = tagsList.findOne();
    if (tag.length > 1) {
    tagsList.update(list._id, {$addToSet: {tags: tag}});
    Session.set('tags', tagsList.findOne());
    }
    Session.set("showTag", false);
  },
  'keypress #createTag': function (event, template) {
    if (event.which === 13) {
    var tag = template.find('#createTag').value;
    var list = tagsList.findOne();
    if (tag.length > 1) {
    tagsList.update(list._id, {$addToSet: {tags: tag}});
    Session.set('tags', tagsList.findOne());
    }
    Session.set("showTag", false);
  }
  },
  //Remove tags
  'click .remove': function (event, template) {
      var list = tagsList.findOne();
      var tag = this.tag;
      var id  = list._id;
      tagsList.update({_id: id }, {$pull: {tags: tag}});
      Session.set('tags', tagsList.findOne() );
    },

});









