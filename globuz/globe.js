var orb;
var latLng = null;
var altitude = null;

function setup() {
  widgetSetup();
  if (window.widget) {
    if (!widget.context) {
      document.getElementById("Widgetop").style.display = "block";
    }
    widget.onremove = clearPrefs;
    orb = widget.preferenceForKey(widget.identifier + "-orb");
    if (!orb) {
      orb = "Map";
    }
    document.getElementById("Orbs").value = orb;
    document.getElementById("Stars").checked = 
      widget.preferenceForKey(widget.identifier + "-stars") != "false";
    loadMap(orb);    
  }
}

function loadMap(orb) {  
  document.getElementById("Map").src = "globeFrame.html?" + orb;
}

function clearPrefs() {
  widget.setPreferenceForKey(null, widget.identifier + "-orb");
  widget.setPreferenceForKey(null, widget.identifier + "-stars");
}

function widgetSetup() {
  if (window.widget) {
  	var gDoneButton = new AppleGlassButton(document.getElementById("DoneButton"), 
  	                                      "Done", hideBack); 
	  var gInfoButton = new AppleInfoButton(document.getElementById("InfoButton"), 
	                                        document.getElementById("front"), 
	                                        "white", "white", showBack);    
  }
}

function toggleStars() {
  widget.setPreferenceForKey(document.getElementById("Stars").checked, 
                             widget.identifier + "-stars");  
}

function showBack() {
    try {
      latLg = frames["Map"].map.getTargetLatLng();
      altitude = frames["Map"].map.getAltitude();
    }
    catch (e) {
      //nothing
    } 
    
    var front = document.getElementById("front");
    var back = document.getElementById("back");
 
    if(window.widget)
        widget.prepareForTransition("ToBack");
 
    front.style.display="none";
    window.resizeTo(220, 290);
    back.style.display="block";
 
    if (window.widget)
        setTimeout ('widget.performTransition();', 0);  
}

function hideBack() {
    var front = document.getElementById("front");
    var back = document.getElementById("back");
 
    if (window.widget)
        widget.prepareForTransition("ToFront");
 
    back.style.display="none";
    window.resizeTo(500, 500);
    front.style.display="block";
    
    if (orb != document.getElementById("Orbs").value) {
      latLng = null;
      altitude = null;
      orb = document.getElementById("Orbs").value;
      widget.setPreferenceForKey(orb, widget.identifier + "-orb");
      loadMap(orb);
    }
 
    if (window.widget)
        setTimeout ('widget.performTransition();', 0);
}
