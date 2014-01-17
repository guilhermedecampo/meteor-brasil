Template.revisao.rendered = function () {
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

Template.revisao.helpers({
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

Template.revisao.events({
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
  'keyup #content': function (event, template){
    myTimer.clear();
    myTimer.set(function() {
      NProgress.start();
       Session.set("contentStore", template.find('#content').value);
      NProgress.done();
      });
  },
  'keyup #link': function (event, template){
    NProgress.start();
      Session.set("linkStore", template.find('#link').value);
    NProgress.done();
  },
  'click #submitPost': function (event, template) {
    var title        = template.find('#title').value,
        content      = template.find('#content').value,
        list         = tagsList.findOne(),
        tags         = list.tags,
        slug         = URLify2(title),
        owner        = Meteor.user()._id,
        SortCreated  = new Date(),
        createdAt    = moment().format ('D [de] MMMM [de] YYYY'),
        link   = template.find('#link').value,
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


