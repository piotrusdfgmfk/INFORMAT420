var code = ''; // initialize the code as an empty string

// get all the key elements
var keys = document.querySelectorAll('.key');

// add a click event listener to each key
keys.forEach(function(key) {
  key.addEventListener('click', function() {
    // append the clicked key's text to the code
    code += this.textContent;
    
    // check if the code is correct
    if (code === '1234') {
      // switch to the new site
      window.location.href = './up';
    }
  });
});
