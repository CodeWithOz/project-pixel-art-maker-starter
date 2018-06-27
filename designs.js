$(document).ready(function() {
  let cellColor;

  cellColor = $('#colorPicker').val();
  $('#colorPicker').change(function() {
    cellColor = $( this ).val();
  });

  $('#sizePicker').submit(makeGrid);

  function makeGrid(event) {
    event.preventDefault();

    // add simple instruction for using the grid
    let gridInstructions = 'Click, drag, <span class="font-weight-bold ';
    gridInstructions += 'font-italic">draw!</span>';
    insertIfDoesntExist('instructions', gridInstructions);

    /**
     * @description Inserts an element if it doesn't already exist in the DOM
     * The new element is added before the table element.
     * @param {string} selector - CSS class name for the element
     * @param {string} content
     * @return {undefined}
     */
    function insertIfDoesntExist(selector, content) {
      if ($('.' + selector).length < 1) {
        const paragraph = '<p class="' + selector + '">' + content + '</p>';
        $('table').prev().after(paragraph);
      }
    }

    // add touchscreen warning if none exists
    let warningParagraph = '<small class="text-muted"><span ';
    warningParagraph += 'class="text-danger font-italic">Note:</span> ';
    warningParagraph += 'This grid is currently optimized for mouse ';
    warningParagraph += 'displays - touchscreens may not work as expected';
    warningParagraph += '.</small>';
    insertIfDoesntExist('warning', warningParagraph);

    // remove current grid if one exists
    if ($('tbody').length > 0) {
      $('tbody').remove();
    }

    const rows = $('#inputHeight').val();
    const columns = $('#inputWidth').val();

    // create the table based on the grid values
    $('table').append('<tbody></tbody>');
    $('tbody').append(createGrid(rows, columns));

    function createGrid(rows, columns) {
      let grid = '';
      for (let counter = 0; counter < rows; counter++) {
        grid += createTableRow(columns);
      }
      return grid;
    }

    function createTableRow(columns) {
      let tableRow = '<tr>';
      for (let counter = 0; counter < columns; counter++) {
        tableRow += '<td></td>';
      }
      tableRow += '</tr>';
      return tableRow;
    }

    // https://stackoverflow.com/a/20831728/7987987 is the source of this idea
    // drag event consists of mousedown, mousemove, and mouseup
    // so add mousemove and mouseup handlers only after mousedown has fired
    $('table').mousedown(function(event) {
      $('table').on('mousemove mouseup', 'td', function(event) {
        $( this ).css('backgroundColor', cellColor);
      });
    });

    // for performance as recommended by the jQuery docs, the mousemove and
    // mouseup event handlers need to be detached once they're no longer needed
    // so I remove them when the mouse either
      // (1) leaves the table (mouseleave), or
      // (2) completes the drag motion within the table (mouseup)
    $('table').on('mouseleave mouseup', function(event) {
      $('table').off('mousemove mouseup', 'td');
    });

    // the drag event of the Drag and Drop API will sometimes coincide
    // with (and override) the drag-and-draw effect I want to create, so
    // I also deactivate `dragstart` when it fires
    // see https://stackoverflow.com/a/13745199/7987987
    $('table').on('dragstart', function(event) {
      event.preventDefault();
      return false;
    });

    // scroll to the top of the grid
    scrollToTableTop();
  }

  function scrollToTableTop() {
    $('body, html').animate({
      scrollTop: $('table').prevAll('.canvasSubheading').offset().top
    }, function () {
      // Must change focus!
      // Add tabindex then focus
      $('.canvasSubheading').attr('tabindex', '-1').focus();
    });
  }

  $('#sizePicker').on('reset', function(event) {
    // stop form reset
    event.preventDefault();
    $( 'table td' ).css('backgroundColor', 'white');
    scrollToTableTop();
  });

  $('.expandImg').click(function(event) {
    event.preventDefault();
    $('.modal').modal('show');
  });
});
