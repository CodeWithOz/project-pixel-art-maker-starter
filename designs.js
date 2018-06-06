$(document).ready(function() {
  var cellColor;

  cellColor = $('#colorPicker').val();
  $('#colorPicker').change(function() {
    cellColor = $( this ).val();
  });

  $('#sizePicker').submit(makeGrid);

  function makeGrid(event) {
    var rows, columns;

    rows = $('#inputHeight').val();
    columns = $('#inputWidth').val();

    // create the table based on the grid values
      // no need for a `thead`, go straight to `tbody`
      // <tbody> needs to come before the rows
      // essentially, I need to define what each row will look like
        // the row will have the selected number of columns
      // then replicate it as many times as the selected number of rows
      // then use event delegation to add necessary event listeners on the parent table element
  }
});
