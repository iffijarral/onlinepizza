<?php
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

require APP_ROOT.'app/backend/core/Database.php';
require APP_ROOT.'app/backend/auth/config.php';
require APP_ROOT.'app/backend/core/Helpers.php';

require APP_ROOT.'app/backend/models/User.php';
require APP_ROOT.'app/backend/models/Category.php';
require APP_ROOT.'app/backend/models/SubCategory.php';
require APP_ROOT.'app/backend/models/Product.php';

require APP_ROOT.'app/backend/business/UserOperations.php';



require APP_ROOT.'app/backend/PHPMailer/src/Exception.php';
require APP_ROOT.'app/backend/PHPMailer/src/PHPMailer.php';
require APP_ROOT.'app/backend/PHPMailer/src/SMTP.php';