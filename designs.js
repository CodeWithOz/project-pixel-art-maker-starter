// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

function makeGrid() {
  var rows = $('#inputHeight').val();
  var columns = $('#inputWidth').val();
  var cellColor = $('#colorPicker').val();

  // create the table based on the grid values
    // essentially, I need to define what each row will look like
      // the row will have the selected number of columns
    // then replicate it as many times as the selected number of rows
    // then use event delegation to add necessary event listeners on the parent table element
}
