<?php
function mailgonder($kimden,$kime,$konu,$mesaj){
         require "class.phpmailer.php";
         $mail = new PHPMailer();   
         $mail->IsSMTP();
         $mail->From     = $kimden;
         $mail->Sender   = $kimden;  
         $mail->FromName = "SnLine";  
         $mail->Host     = "mail.snline.az";
         $mail->SMTPAuth = true;  
         $mail->Username = "mailsystem@snline.az";
         $mail->Password = "snlinemailsystem@#$%"; 
         $mail->Port = "587";
         $mail->CharSet = "utf-8";
         $mail->WordWrap = 50;  
         $mail->IsHTML(true);
         $mail->Subject  = $konu; 
         $body = $mesaj;
         $textBody = strip_tags($mesaj);
         $mail->Body = $body;  
         $mail->AltBody = $textBody;  
         $mail->AddAddress($kime);
         return ($mail->Send())?true:false;      
         $mail->ClearAddresses();  
         $mail->ClearAttachments();
}
?>
<?php
$hmesaji="";
if(isset($_POST["submit"])){
    $ad = (isset($_POST["name"]))?$_POST["name"]:"";
    $eposta = (isset($_POST["email"]))?$_POST["epoct"]:"";
    $mesaj = (isset($_POST["message"]))?$_POST["message"]:"";
    if($ad == "" || $eposta == "" || $mesaj == "")
        $hmesaji = "<p style='text-align: center;'>Xəta! Bütün sahələr düzgün doldurulmalıdır!</p>";
    else
    {
        $mesajk = "<b>$ad</b> sizə veb saytınızdan mesaj göndərdi:<hr />";
        $mesajk .= "<b>Ad Soyad:</b> $ad <br />";
        $mesajk .= "<b>E-mail:</b> $eposta <br />";
        $mesajk .= "<b>Mesaj:</b> $mesaj <hr />";
        $mesajk .= "<span style='font-size:10px;color:#bbbbbb;'>Bu mesaj ". date('H:i:s d.m.Y') ." tarixində göndərildi.</span>";

        if(mailgonder("mailsystem@snline.az","hasanovagunay93@gmail.com","Saytdan mesaj(AZ)",$mesajk))
        {
            $hmesaji =  "<p style='text-align: center;color: #14b137;'>
            Məktub müvəffəqiyyətlə göndərildi. Ən qısa zamanda sizinlə əlaqə saxlanılacaq. Təşəkkür edirik !</p>";
        }
        else
        {
            $hmesaji =  "Göndərilmədi.";
        }
    }
}
echo "<p>$hmesaji</p>";
?>