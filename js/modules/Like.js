import $ from 'jquery';

class Like {
  constructor() {
    this.events();
  }

  events() {
    $('.like-box').on('click', this.clickDispatcher.bind(this));
  }

  clickDispatcher(e) {
    var currentLikeBox = $(e.target).closest('.like-box');

    if (currentLikeBox.data('exists') == 'yes') {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  createLike(currentLikeBox) {
    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/university/v1/like',
      type: 'POST',
      data: {
        professorID: currentLikeBox.data('professor'),
      },
      success: (res) => {
        currentLikeBox.attr('data-exists', 'yes');

        var likeCount = parseInt(currentLikeBox.find('.like-count').html(), 10);

        likeCount++;

        currentLikeBox.find('.like-count').html(likeCount);

        console.log(res);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  deleteLike() {
    $.ajax({
      url: universityData.root_url + '/wp-json/university/v1/like',
      type: 'DELETE',
      success: (res) => {
        console.log(res);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
}

export default Like;
