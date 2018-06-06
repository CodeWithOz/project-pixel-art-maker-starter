$(document).ready(function() {
  var cellColor;

  cellColor = $('#colorPicker').val();
  $('#colorPicker').change(function() {
    cellColor = $( this ).val();
  });

  $('#sizePicker').submit(makeGrid);
  $('#sizePicker').on('reset', function(event) {
    $( 'table td' ).css('backgroundColor', 'white');
  });

  function makeGrid(event) {
    event.preventDefault();
    var rows, columns;

    rows = $('#inputHeight').val();
    columns = $('#inputWidth').val();

    // create the table based on the grid values
    $('table').append('<tbody></tbody>');
    $('tbody').append(createGrid(rows, columns));

    // https://stackoverflow.com/a/20831728/7987987 is the source of this idea
    // drag event consists of mousedown, mousemove, and mouseup
    // so add mousemove and mouseup handlers only after mousedown has fired
    $('table').mousedown(function(event) {
      $('table').on('mousemove mouseup', 'td', function(event) {
        $( this ).css('backgroundColor', cellColor);
      });
    });

    $('table').on('drag mouseleave mouseup', function(event) {
    // for performance as recommended by the jQuery docs, the mousemove and
    // mouseup event handlers need to be detached once they're no longer needed
    // so I remove them when the mouse either
      // (1) leaves the table (mouseleave)
      // (2) completes the drag motion within the table (mouseup)
      // (3) activates the drag event of the Drag and Drop API. This third one
      // was really just an unexpected quirk that I discovered while testing,
      // so I had to try to account for it, and it's still not perfect :'(.
      $('table').off('mousemove mouseup', 'td');
    });
  }

  function createGrid(rows, columns) {
    var grid = '';
    for (var counter = 0; counter < rows; counter++) {
      grid += createTableRow(columns);
    }
    return grid;
  }

  function createTableRow(columns) {
    var tableRow = '<tr>';
    for (var counter = 0; counter < columns; counter++) {
      tableRow += '<td></td>';
    }
    tableRow += '</tr>';
    return tableRow;
  }
});
