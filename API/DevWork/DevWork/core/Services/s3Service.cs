using Amazon.S3;
using Amazon.S3.Model;
using System.Net;

public interface IS3Service
{
    Task<byte[]> DownloadFileAsync(string fileUrl);
     Task<string> GeneratePreSignedUrlAsync(string fileName, HttpVerb verb);
    Task<string> GeneratePreSignedUrlForDownloadAsync(string fileName);

}
public class S3Service : IS3Service
{
    private readonly IAmazonS3 _s3Client;
    public S3Service(string awsAccessKey, string awsSecretKey, Amazon.RegionEndpoint region)
    {
        _s3Client = new AmazonS3Client(awsAccessKey, awsSecretKey, region);
    }
    public S3Service(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
      
    }

    private string SanitizeFileName(string fileName)
    {
        return string.Concat(fileName.Split(Path.GetInvalidFileNameChars()));
    }



    public async Task<byte[]> DownloadFileAsync(string signedFileUrl)
    {
        var uri = new Uri(signedFileUrl);

        var key = Uri.UnescapeDataString(uri.AbsolutePath.TrimStart('/'));
        var fileName = Path.GetFileName(key); 
        fileName = SanitizeFileName(fileName);
   
        var request = new GetObjectRequest
        {
            BucketName = "devwork",
            Key = key
        };

        using var response = await _s3Client.GetObjectAsync(request);
        using var memoryStream = new MemoryStream();
        await response.ResponseStream.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }


    public async Task<string> GeneratePreSignedUrlAsync(string fileName, HttpVerb verb)
    {

        string cleanFileName = fileName.Trim().Replace(" ", "_"); 
        cleanFileName = Uri.EscapeDataString(cleanFileName); 
        var extension = Path.GetExtension(fileName).ToLower();
        var request = new GetPreSignedUrlRequest
        {
            BucketName ="devwork",
            Key = cleanFileName,
            Verb = verb,
            Expires = DateTime.UtcNow.AddDays(7),  

            ContentType = "application/octet-stream"
        };
      
        return _s3Client.GetPreSignedURL(request);
    }

    public async Task<string> GeneratePreSignedUrlForDownloadAsync(string fileName)
    {

        Console.WriteLine("fileName" + fileName);
        var request = new GetPreSignedUrlRequest
        {
            BucketName = "devwork",  
            Key = fileName,        
            Verb = HttpVerb.GET,    
            Expires = DateTime.UtcNow.AddDays(7),
        };

        string presignedUrl = _s3Client.GetPreSignedURL(request);

        return presignedUrl;
    }

}
