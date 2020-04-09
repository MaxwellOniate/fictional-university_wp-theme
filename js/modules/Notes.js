import $ from 'jquery';

class Notes {
  constructor() {
    this.events();
  }

  events() {
    $('.delete-note').on('click', this.delete);
    $('.edit-note').on('click', this.edit.bind(this));
    $('.update-note').on('click', this.update.bind(this));
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
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
}

export default Notes;
