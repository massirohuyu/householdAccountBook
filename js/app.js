window.App = {};
App.mediator = _.extend({}, Backbone.Events);
//https://spreadsheets.google.com/feeds/list/0AvEHDjYXNhesdFV2Q1NPOURaRGtMZW5qZXpZMHpYU1E/od5/public/basic?alt=rss

$(function() {

  var actions = new App.Actions();
  var actionsPromise = actions.fetch();

  var sections = new App.SectionsList();
  App.sections = sections;
  var sectionsPromise = sections.fetch();

  var subsections = new App.SubsectionsList();
  App.subsections = subsections;
  var subsectionsPromise = subsections.fetch();

  var accounts = new App.AccountsList();
  App.accounts = accounts;
  var accountsPromise = accounts.fetch();

  var ways = new App.WaysList();
  App.ways = ways;
  var waysPromise = ways.fetch();

  var shops = new App.ShopsList();
  App.shops = shops;
  var shopsPromise = shops.fetch();

  sections.child = subsections;

  var Router = Backbone.Router.extend({
    routes: {
      ':year/:month': 'calendar',
      '*default': 'defaultCase'
    },
    initialize: function() {

      if (sections.models[0]) {
        actions.model.prototype.defaults.section = sections.models[0].id;
        actions.model.prototype.defaults.subsection = subsections.models[0].id;
        actions.model.prototype.defaults.account = accounts.models[0].id;
        actions.model.prototype.defaults.way = ways.models[0].id;
      }

      App.formDialogView = new App.FormDialogView({
        el: '#input-dialog',
        collection: actions
      });
      App.sectionDialogView = new App.SectionDialogView({
        el: '#section-dialog',
        collection: sections
      });
      App.subsectionDialogView = new App.SubsectionDialogView({
        el: '#subsection-dialog',
        collection: subsections
      });
      App.accountDialogView = new App.AccountDialogView({
        el: '#account-dialog',
        collection: accounts
      });
      App.wayDialogView = new App.WayDialogView({
        el: '#way-dialog',
        collection: ways
      });

      App.sectionSelectTagView = new App.FormSelectTagView({
        el: 'select[name="section"]',
        collection: sections
      });
      App.subsectionSelectTagView = new App.FormSelectTagView({
        collection: subsections
      });
      App.accountSelectTagView = new App.FormSelectTagView({
        el: 'select[name="account"]',
        collection: accounts
      });
      App.waySelectTagView = new App.FormSelectTagView({
        el: 'select[name="way"]',
        collection: ways
      });

      App.shopButtonView = new App.ShopButtonView({
        el: '#input-dialog .shopList',
        collection: shops
      });
      App.shopInputView = new App.ShopInputView({
        el: '#input-dialog input[name="shop"]'
      });

      App.calculator = new App.Calculator({
        el: '#calculator'
      });

      this.calendarControlView = new App.CalendarControlView({
        el: '.calendar-control',
        collection: actions
      });
      this.accountControlView = new App.AccountControlView({
        el: '.account-control',
        collection: accounts
      });
      this.calendarView = new App.CalendarView({
        el: '#actionsList',
        collection: actions
      });
      this.sectionListView = new App.SectionListView({
        el: '#sectionsList',
        collection: actions
      });
    },
    defaultCase: function() {
      this.accountControlView.changeAccount();
      App.mediator.trigger('calendar:today');
    },
    calendar: function(year, month) {
      this.accountControlView.changeAccount();
      App.mediator.trigger('calendar:moveTo', year, month);
    }
  });

  $.when(actionsPromise, sectionsPromise, subsectionsPromise, accountsPromise, waysPromise, shopsPromise)
  .then(function() {
    App.router = new Router();
    Backbone.history.start();
  });



//  actions.add([{
//    'amount': 2000,
//    'date': moment('2013-11-16'),
//    'section': '食費',
//    'subsection': '家食',
//    'detail': '',
//    'account': '',
//    'way': '現金',
//    'isIncome': 0
//  },{
//    'amount': 4000,
//    'date': moment('2013-11-30'),
//    'section': '住居費',
//    'subsection': '家電',
//    'detail': '',
//    'account': '',
//    'way': '現金',
//    'isIncome': 0
//  },{
//    'amount': 52500,
//    'date': moment('2013-11-23'),
//    'section': '居住費',
//    'subsection': '家賃',
//    'detail': '',
//    'account': '',
//    'way': '現金',
//    'isIncome': 0
//  },{
//    'amount': 1000,
//    'date': moment('2013-11-2'),
//    'section': '娯楽',
//    'subsection': 'カラオケ',
//    'detail': '',
//    'account': '',
//    'way': '現金',
//    'isIncome': 0
//  }]);

//  var createFormView = new App.CreateFormView({
//    el: '.createForm',
//    collection: actions
//  });


//  $('.filterForm').submit(function(e) {
//    e.preventDefault();
//
//    var date = $('input[name="filterDate"]').val();
//    var results = actions.findByDate(date);
//
//    $('.count').html(results.length + '件の項目があります');
//    $('.list').empty();
//
//    _.each(results, function(model) {
//      var $li = $('<li>').html(
//        model.formatDate('YYYY年MM月DD日') + '：' + model.formatAmount() + '(' + model.get('section') + ')'
//      );
//      $('.list').append($li);
//    });
//  });
//
//  actions.on('add', function(model) {
//    var $p = $('<p>').html(
//      model.formatDate('YYYY年MM月DD日') + '：' + model.formatAmount() + '(' + model.get('section') + ')'
//    );
//    $('body').append($p);
//  });
//

});

//出力関数
//(function localstrageOutput(keys) {
//  console.log('もち');
//  for(var i = 0,keyLeng = keys.length; i < keyLeng; i++) {
//    var idList = localStorage[keys[i]].split(',');
//    var txtData = '';
//    for(var j = 0,idLeng = idList.length; j < idLeng; j++) {
//      txtData += (localStorage[keys[i] + '-' + idList[j]]);
//      txtData += ',';
//    }
//    console.log(txtData);
//  }
//})([
//  'ActionsBook',
//  'sectionsList',
//  'subsectionsList',
//  'accountsList',
//  'waysList',
//  'shopList'
//]);
