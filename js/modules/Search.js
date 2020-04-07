import $ from 'jquery';

class Search {
  constructor() {
    this.addSearchHTML();
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

        this.typingTimer = setTimeout(this.getResults.bind(this), 700);
      } else {
        this.resultsDiv.html('');
        this.spinner = false;
      }
    }

    this.previousValue = this.searchField.val();
  }

  getResults() {
    $.getJSON(
      universityData.root_url +
        '/wp-json/university/v1/search?term=' +
        this.searchField.val(),
      (data) => {
        this.resultsDiv.html(`
        <div class="row">

          <div class="one-third">
            <h2 class="search-overlay__section-title">General Information</h2>

            ${
              data.generalInfo.length
                ? '<ul class="link-list min-list">'
                : '<p>No results.</p>'
            }
              ${data.generalInfo
                .map(
                  (item) =>
                    `<li><a href="${item.permalink}">${item.title}</a>${
                      item.postType == 'post' ? ` by ${item.authorName}` : ''
                    }</li>`
                )
                .join('')}
      
              ${data.generalInfo.length ? '</ul>' : ''}

          </div>

          <div class="one-third">
            <h2 class="search-overlay__section-title">Programs</h2>

            ${
              data.programs.length
                ? '<ul class="link-list min-list">'
                : `<p>No results.</p><a href="${universityData.root_url}/programs">View all programs.</a>`
            }
              ${data.programs
                .map(
                  (item) =>
                    `<li>
                      <a href="${item.permalink}">${item.title}</a>
                    </li>`
                )
                .join('')}
      
              ${data.programs.length ? '</ul>' : ''}


            <h2 class="search-overlay__section-title">Professors</h2>

            ${
              data.professors.length
                ? '<ul class="professor-cards">'
                : '<p>No results.</p>'
            }
              ${data.professors
                .map(
                  (item) =>
                    `
                    <li class="professor-card__list-item">
                      <a class="professor-card" href="${item.permalink}">
                        <img class="professor-card__image" src="${item.img}">
                        <span class="professor-card__name">${item.title}</span>
                      </a>
                    </li>
                    `
                )
                .join('')}
      
              ${data.professors.length ? '</ul>' : ''}


          </div>

          <div class="one-third">
            <h2 class="search-overlay__section-title">Campuses</h2>

            ${
              data.campuses.length
                ? '<ul class="link-list min-list">'
                : `<p>No results.</p><a href="${universityData.root_url}/campuses">View all campuses.</a>`
            }
              ${data.campuses
                .map(
                  (item) =>
                    `<li>
                      <a href="${item.permalink}">${item.title}</a>
                    </li>`
                )
                .join('')}
      
              ${data.campuses.length ? '</ul>' : ''}

            <h2 class="search-overlay__section-title">Events</h2>

            ${
              data.events.length
                ? ''
                : `<p>No results.</p><a href="${universityData.root_url}/events">View all events.</a>`
            }
              ${data.events
                .map(
                  (item) =>
                    `
                    <div class="event-summary">
                      <a class="event-summary__date t-center" href="${item.permalink}">
                        <span class="event-summary__month">
                         ${item.month}
                        </span>
                        <span class="event-summary__day">${item.day}</span>
                      </a>
                      <div class="event-summary__content">
                        <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                        <p>
                          ${item.description}
                          <a href="${item.permalink}" class="nu gray">Learn more</a>
                        </p>
                      </div>
                    </div>
                    `
                )
                .join('')}
      
      
          </div>

        </div>
      `);
        this.spinner = false;
      }
    );
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

    this.searchField.val('');

    setTimeout(() => this.searchField.focus(), 301);

    this.overlay = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass('search-overlay--active');
    $('body').removeClass('body-no-scroll');
    this.overlay = false;
  }

  addSearchHTML() {
    $('body').append(`
    <div class="search-overlay">
      <div class="search-overlay__top">
        <div class="container">
          <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
          <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
          <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
        </div>
      </div>
      <div class="container">
        <div id="search-overlay__results">
        </div>
      </div>
    </div>
    `);
  }
}

export default Search;
