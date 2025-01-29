package com.sobalevskaya.fabtrade_backend.services;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final MinioClient minioClient;

    public String uploadPdf(MultipartFile file) throws Exception {
        InputStream pdfStream = file.getInputStream();
        String pdfName = file.getOriginalFilename();
        String bucketName = "fabtrade";

        if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }

        long streamSize = pdfStream.available();

        minioClient.putObject(PutObjectArgs.builder()
                .bucket(bucketName)
                .object(pdfName)
                .stream(pdfStream, streamSize, -1)
                .contentType("application/pdf")
                .build());

        return String.format("http://localhost:9000/%s/%s", bucketName, pdfName);
    }

}
