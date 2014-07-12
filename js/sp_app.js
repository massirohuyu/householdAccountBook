window.App = {};
App.mediator = _.extend({}, Backbone.Events);

$(function() {

//各modelを作成

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

//model読み込み後に動かすinitializeと、URLのhashによる表示の制御

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

      //各viewの作成
      // App.sectionDialogView = new App.SectionDialogView({
      //   el: '#section-dialog',
      //   collection: sections
      // });
      // App.subsectionDialogView = new App.SubsectionDialogView({
      //   el: '#subsection-dialog',
      //   collection: subsections
      // });
      // App.accountDialogView = new App.AccountDialogView({
      //   el: '#account-dialog',
      //   collection: accounts
      // });
      // App.wayDialogView = new App.WayDialogView({
      //   el: '#way-dialog',
      //   collection: ways
      // });

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

      // App.shopButtonView = new App.ShopButtonView({
      //   el: '#input-dialog .shopList',
      //   collection: shops
      // });
      // App.shopInputView = new App.ShopInputView({
      //   el: '#input-dialog input[name="shop"]'
      // });

      App.calculator = new App.Calculator({
        el: '#calculator'
      });

      App.formDialogView = new App.FormDialogView({
        el: '#input-record',
        collection: actions
      });
      // this.calendarControlView = new App.CalendarControlView({
      //   el: '.calendar-control',
      //   collection: actions
      // });
      // this.accountControlView = new App.AccountControlView({
      //   el: '.account-control',
      //   collection: accounts
      // });
      // this.calendarView = new App.CalendarView({
      //   el: '#actionsList',
      //   collection: actions
      // });
      // this.sectionListView = new App.SectionListView({
      //   el: '#sectionsList',
      //   collection: actions
      // });
    },
    defaultCase: function() {
      // this.accountControlView.changeAccount();
      App.mediator.trigger('calendar:today');
    },
    calendar: function(year, month) {
      // this.accountControlView.changeAccount();
      App.mediator.trigger('calendar:moveTo', year, month);
    }
  });

//各modelすべての読み込みが終わったら、routerを生成、hash制御？も開始
  $.when(actionsPromise, sectionsPromise, subsectionsPromise, accountsPromise, waysPromise, shopsPromise)
  .then(function() {
    App.router = new Router();
    Backbone.history.start();
  });

});