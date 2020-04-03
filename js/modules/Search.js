import $ from 'jquery';

class Search {
  constructor() {
    this.resultsDiv = $('#search-overlay__results');
    this.openButton = $('.js-search-trigger');
    this.closeButton = $('.search-overlay__close');
    this.searchOverlay = $('.search-overlay');
    this.overlay = false;
    this.searchField = $('#search-term');
    this.typingTimer;
    this.spinner = false;
    this.previousValue;
    this.events();
  }

  events() {
    this.openButton.on('click', this.openOverlay.bind(this));
    this.closeButton.on('click', this.closeOverlay.bind(this));
    $(document).on('keydown', this.keyPressDispatcher.bind(this));
    this.searchField.on('keyup', this.typingLogic.bind(this));
  }

  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.spinner) {
          this.resultsDiv.html("<div class='spinner-loader'></div>");
          this.spinner = true;
        }

        this.typingTimer = setTimeout(this.getResults.bind(this), 2000);
      } else {
        this.resultsDiv.html('');
        this.spinner = false;
      }
    }

    this.previousValue = this.searchField.val();
  }

  getResults() {
    this.resultsDiv.html('HELLO WORLD!');
    this.spinner = false;
  }

  keyPressDispatcher(e) {
    if (
      e.keyCode === 83 &&
      !this.overlay &&
      !$('input, textarea').is(':focus')
    ) {
      this.openOverlay();
    } else if (e.keyCode === 27 && this.overlay) {
      this.closeOverlay();
    }
  }

  openOverlay() {
    this.searchOverlay.addClass('search-overlay--active');
    $('body').addClass('body-no-scroll');
    this.overlay = true;
  }
  closeOverlay() {
    this.searchOverlay.removeClass('search-overlay--active');
    $('body').removeClass('body-no-scroll');
    this.overlay = false;
  }
}

export default Search;
