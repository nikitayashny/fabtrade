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
public class ImageService {

    private final MinioClient minioClient;

    public String uploadImage(MultipartFile file) throws Exception {
        InputStream imageStream = file.getInputStream();
        String imageName = file.getOriginalFilename();
        String bucketName = "fabtrade";

        if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }

        long streamSize = imageStream.available();

        minioClient.putObject(PutObjectArgs.builder()
                .bucket(bucketName)
                .object(imageName)
                .stream(imageStream, streamSize, -1)
                .contentType("image/jpeg")
                .build());

        return String.format("http://localhost:9000/%s/%s", bucketName, imageName);
    }
}
