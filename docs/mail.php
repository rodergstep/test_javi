<?
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['email'])&&$_POST['email']!="")){ //Validate on empty fields
        $to = 'will@croesusdigitalmarketing.com'; //Receiver
        $subject = 'New Message from Croesus website';
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Name: '.$_POST['name'].'</p>
						            <p>Пошта: '.$_POST['email'].'</p>
                        <p>Message: '.$_POST['formMessage'].'</p>
                    </body>
                </html>'; //We can use HTML tags
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Croesus <info@croesusdigitalmarketing.com>\r\n"; //Sender
        mail($to, $subject, $message, $headers);
}
