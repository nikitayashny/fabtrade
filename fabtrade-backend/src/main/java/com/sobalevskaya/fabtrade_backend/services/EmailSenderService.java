package com.sobalevskaya.fabtrade_backend.services;

import com.sobalevskaya.fabtrade_backend.entities.Tender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("homehuboff@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
    }

    public void sendConfirmationCode(String toEmail, String confirmationCode) {
        String subject = "Ваш код подтверждения";
        String body = "Ваш код подтверждения: " + confirmationCode;

        sendEmail(toEmail, subject, body);
    }

    public void sendInfoToCreator(String toEmail, String name) {
        String subject = "Победитель тендера определён";
        String body = "Добрый день!\n" +
                "Зайдите на сайт чтобы подтвердить победителя " + name + "\n"+
                "http://localhost:3000/";

        sendEmail(toEmail, subject, body);
    }

    public void sendInfoToWinner(String toEmail, Tender tender) {
        String subject = "Вы выиграли в тендере!";
        String body = "Добрый день!\n" +
                "Ваша заявка выиграла в тендере №" + tender.getId() + ". Вы можете ознакомиться с итогами тендера и итоговым протоколом в личном кабинете на площадке FabTrade.\n" +
                "http://localhost:3000/tender/" + tender.getId() + "\n" +
                "С уважением, команда FabTrade!";

        sendEmail(toEmail, subject, body);
    }


}
