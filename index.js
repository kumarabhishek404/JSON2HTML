function getdata() {
  const exap = document.getElementById('transform').value;
  console.log(exap);
  const modified = exap.replace(/'/g, "\"")
  console.log(modified);
  var ob1 = JSON.parse(modified);
  
  var html = JSON2HTML.build(ob1);
  
  $('#container').html(html);
  $('#unbuild').html(JSON.stringify(JSON2HTML.unbuild(html), null, 2));
}