$(document).ready(function() {
  var cellColor;

  cellColor = $('#colorPicker').val();
  $('#colorPicker').change(function() {
    cellColor = $( this ).val();
  });

  $('#sizePicker').submit(makeGrid);

  function makeGrid(event) {
    event.preventDefault();
    var rows, columns;

    rows = $('#inputHeight').val();
    columns = $('#inputWidth').val();

    // create the table based on the grid values
    $('table').append('<tbody></tbody>');
      // then replicate it as many times as the selected number of rows
      // then use event delegation to add necessary event listeners on the parent table element
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
