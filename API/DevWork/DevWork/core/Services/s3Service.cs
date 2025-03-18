using Amazon.S3;
using Amazon.S3.Model;
using System.Net;

public interface IS3Service
{
    Task<byte[]> DownloadFileAsync(string fileUrl);
}

public class S3Service : IS3Service
{
    private readonly IAmazonS3 _s3Client;

    public S3Service(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
    }

    public async Task<byte[]> DownloadFileAsync(string fileUrl)
    {
        var uri = new Uri(fileUrl);
        var bucketName = uri.Host.Split('.')[0];
        var key = uri.AbsolutePath.TrimStart('/');

        var request = new GetObjectRequest
        {
            BucketName = bucketName,
            Key = key
        };

        using var response = await _s3Client.GetObjectAsync(request);
        using var memoryStream = new MemoryStream();
        await response.ResponseStream.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }
}
