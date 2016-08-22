
function getRadioSelection(question){
 var elRadio = document.getElementsByName(question);
  for (i = 0; i < elRadio.length; i++) {
    if (elRadio[i].checked) {
      return elRadio[i].id;
    }
  }
}


function setClassChecked(name) {
  var radioSelection = getRadioSelection(name);
  var elInput = document.getElementById(radioSelection);
  var elInputParent = elInput.parentNode;
  if (!elInputParent.hasAttribute('class')) {
    elInputParent.setAttribute('class', 'checked');
  } else if (elInputParent.hasAttribute('class')) {
    var classAttribute = elInputParent.getAttribute('class');
    elInputParent.setAttribute('class', classAttribute + 'checked')
  }
}
