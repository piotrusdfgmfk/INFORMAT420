

<?php
echo '<p align="CENTER" style="background: #0000cc; line-height: 100%"><a href="../up"><font color="#ffffff">UPLOAD UPLOAD  </font></a></p>';
echo '<p align="CENTER" style="background: #0000cc; line-height: 100%"><a href="../"><font color="#ffffff">POWRÓT DO STRONY GUWNEJ  </font></a></p>';
echo '<style>
  @media (min-width: 1200px) {
    .column {
      float: left;
      width: 33.33%;
      text-align: center;
    }
    img {
      width: 80%;
      margin: 5vh 0;
    }
  }
  @media (max-width: 1200px) {
    .column {
      width: 100%;
      text-align: center;
    }
    img {
      width: 80vw;
      margin: 5vh 0;
    }
  }
</style>';

  // Set the directory containing the images
  $image_directory = "images/";

  // Scan the directory for image files
  $image_files = scandir($image_directory);

  // Shuffle the list of image files
  shuffle($image_files);

  // Iterate over the list of files
  $i = 0;
  $columns = array(array(), array(), array());
  foreach ($image_files as $file) {
    // Check if the file is an image file
    if (exif_imagetype($image_directory . $file)) {
      // Add the image to a column
      $columns[$i % 3][] = '<img src="' . $image_directory . $file . '" alt="">';
      $i++;
    }
  }

  // Display the columns
  foreach ($columns as $column) {
    echo '<div class="column">';
    foreach ($column as $image) {
      echo $image;
    }
    echo '</div>';
  }
?>