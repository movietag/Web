<?php
$imageSrc = 'img/circle_user_icon.svg';

if (isset($_SESSION['dados']['foto'])) {
    $base64Img = $_SESSION['dados']['foto'];
    // Check if it's a valid base64 string
    if (base64_decode($base64Img, true)) {
        $imageSrc = 'data:image/jpeg;base64,' . $base64Img;
    }
}
?>