beforeEach ->
  placeholder = $('<div id="graph" style="width: 600px; height: 400px"></div>')
  $('#admin').append(placeholder)

afterEach ->
  $('#admin').empty()
