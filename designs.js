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
    $('tbody').append(createGrid(rows, columns));
    // then use event delegation to add necessary event listeners on the parent table element
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
