/*
 * (c) Piet Jonas 2006, all rights reserved
 *     http://piet.jonas.com
 */
var applet = document.GameApplet;
var gravity = null;
var gravityFactor = 2.0;
var gravityOffset = 0.2;

function setup() {
  widgetSetup();
  if (window.widget) {
    if (widget.context) {
      document.getElementById("Widgetop").style.display = "none";
    }
    document.getElementById("back").style.display = "none";
    document.getElementById("Sound").onchange = toggleSound;
    document.getElementById("MovingBasket").onchange = toggleMovingBasket;
    readPrefs();
    widget.onremove = clearPrefs;
    document.getElementById("Game").style.display = "block";
  }
}

function readPrefs() {
  if (window.widget) {
    var value = widget.preferenceForKey(widget.identifier + "-sound");
    if (value != null) {
      value = "true" == value;
    }
    else {
      value = "on" == document.getElementsByName("sound")[0].value;
    }  
    document.getElementById("Sound").checked = value;
    setSound(value);
    
    var value = widget.preferenceForKey(widget.identifier + "-moving");
    if (value == null) {
      value = document.getElementsByName("movingbasket")[0].value
    }
    value = "true" == value;
    document.getElementById("MovingBasket").checked = value;
    setMovingBasket(value);
    
    var value = widget.preferenceForKey(widget.identifier + "-gravity");
    if (value == null) {
      value = document.getElementsByName("gravity")[0].value;
    }
    value = parseFloat(value);
    gravity.setValue((value - gravityOffset) / gravityFactor);
    setGravity(value);
  }
}

function clearPrefs() {
  widget.setPreferenceForKey(null, widget.identifier + "-sound");
  widget.setPreferenceForKey(null, widget.identifier + "-gravity");
}

function toggleSound() {
  var checked = document.getElementById("Sound").checked;
  setSound(checked);
}  

function toggleMovingBasket() {
  var checked = document.getElementById("MovingBasket").checked;
  setMovingBasket(checked);
}  

function setSound(sound) {
  widget.setPreferenceForKey("" + sound, widget.identifier + "-sound");  
  var param = document.getElementsByName("sound");
  if (sound) {
    param[0].value = "on";
  }
  else {
    param[0].value = "off";    
  }
}

function setMovingBasket(moving) {
  widget.setPreferenceForKey("" + moving, widget.identifier + "-moving");  
  document.getElementsByName("movingbasket")[0].value = "" + moving;
}

function gravityChanged() {
  if (gravity) {
    setGravity(gravityOffset + gravity.value * gravityFactor);
  }  
}

function setGravity(value) {
  widget.setPreferenceForKey("" + value, widget.identifier + "-gravity");  
  var param = document.getElementsByName("gravity");
  param[0].value = value;
}

function donate() {
  widget.openURL("https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=piet%40jonas%2ecom&no_shipping=1&return=http%3a%2f%2fpiet%2ejonas%2ecom&cancel_return=http%3a%2f%2fpiet%2ejonas%2ecom&no_note=1&tax=0&currency_code=EUR&lc=DE&bn=PP%2dDonationsBF&charset=UTF%2d8");
}

function widgetSetup() {
  if (window.widget) {
  	var gDoneButton = new AppleGlassButton(document.getElementById("DoneButton"), 
  	                                      "Done", hideBack); 
	  var gInfoButton = new AppleInfoButton(document.getElementById("InfoButton"), 
	                                        document.getElementById("front"), 
	                                        "white", "white", showBack);    
	  gravity = new AppleHorizontalSlider(document.getElementById("Gravity"), gravityChanged); 
  }
}

function showBack() {
    var front = document.getElementById("front");
    var back = document.getElementById("back");
 
    if(window.widget)
        widget.prepareForTransition("ToBack");
 
    front.style.display="none";
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
    front.style.display="block";
 
    if (window.widget)
        setTimeout ('widget.performTransition();', 0);
}
