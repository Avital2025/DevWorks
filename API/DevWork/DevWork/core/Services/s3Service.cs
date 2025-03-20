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
    private readonly string _bucketName= "devworksbacket" ;
    public S3Service(string awsAccessKey, string awsSecretKey, Amazon.RegionEndpoint region)
    {
        _s3Client = new AmazonS3Client(awsAccessKey, awsSecretKey, region);
    }
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

    public string GeneratePresignedUrl(string fileName, string contentType)
    {
        var request = new GetPreSignedUrlRequest
        {
            BucketName = _bucketName,
            Key = fileName,
            Expires = DateTime.UtcNow.AddMinutes(10),
            Verb = HttpVerb.PUT,
            ContentType = contentType // נשאר כמו שהוא
        };

        return _s3Client.GetPreSignedURL(request);
    }

}
