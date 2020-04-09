import $ from 'jquery';

class Notes {
  constructor() {
    this.events();
  }

  events() {
    $('#my-notes').on('click', '.delete-note', this.delete);
    $('#my-notes').on('click', '.edit-note', this.edit.bind(this));
    $('#my-notes').on('click', '.update-note', this.update.bind(this));
    $('.submit-note').on('click', this.create.bind(this));
  }

  edit(e) {
    var note = $(e.target).parents('li');

    if (note.data('state') == 'editable') {
      this.toggleReadOnly(note);
    } else {
      this.toggleEdit(note);
    }
  }

  toggleEdit(note) {
    note
      .find('.edit-note')
      .html('<i class="fa fa-times" aria-hidden="true"></i> Cancel');

    note
      .find('.note-title-field, .note-body-field')
      .removeAttr('readonly')
      .addClass('note-active-field');

    note.find('.update-note').addClass('update-note--visible');

    note.data('state', 'editable');
  }

  toggleReadOnly(note) {
    note
      .find('.edit-note')
      .html('<i class="fa fa-pencil" aria-hidden="true"></i> Edit');

    note
      .find('.note-title-field, .note-body-field')
      .attr('readonly', 'readonly')
      .removeClass('note-active-field');

    note.find('.update-note').removeClass('update-note--visible');

    note.data('state', 'cancel');
  }

  create(e) {
    var newNote = {
      title: $('.new-note-title').val(),
      content: $('.new-note-body').val(),
      status: 'publish',
    };

    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/',
      type: 'POST',
      data: newNote,
      success: (res) => {
        var newNoteHTML = `
        <li data-id="${res.id}">

          <input readonly class="note-title-field" type="text" value="${res.title.raw}">

          <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
          <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>

          <textarea readonly class="note-body-field">${res.content.raw}</textarea>

          <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i> Save</span>

        </li>
        `;

        $('.new-note-title, .new-note-body').val('');
        $(newNoteHTML).prependTo('#my-notes').hide().slideDown();
        console.log(res);
      },
      error: (res) => {
        if (res.responseText == 'You have reached your note limit.') {
          $('.note-limit-message').addClass('active');
        }
        console.log(res);
      },
    });
  }

  update(e) {
    var note = $(e.target).parents('li');

    var updatedNote = {
      title: note.find('.note-title-field').val(),
      content: note.find('.note-body-field').val(),
    };

    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/' + note.data('id'),
      type: 'POST',
      data: updatedNote,
      success: (res) => {
        this.toggleReadOnly(note);
        console.log(res);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  delete(e) {
    var note = $(e.target).parents('li');

    $.ajax({
      beforeSend: (xhr) => {
        xhr.setRequestHeader('X-WP-Nonce', universityData.nonce);
      },
      url: universityData.root_url + '/wp-json/wp/v2/note/' + note.data('id'),
      type: 'DELETE',
      success: (res) => {
        note.slideUp();
        console.log(res);
        if (res.userNoteCount < 5) {
          $('.note-limit-message').removeClass('active');
        }
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
}

export default Notes;
