<?php
echo '<center>';
  // Set the directory containing the images
  $image_directory = "images/";

  // Scan the directory for image files
  $image_files = scandir($image_directory);

  // Iterate over the list of files
  foreach ($image_files as $file) {
    // Check if the file is an image file
    if (exif_imagetype($image_directory . $file)) {
      // Display the image on the page
      echo '<img src="' . $image_directory . $file . '" alt="">';
    }
  }
?>
