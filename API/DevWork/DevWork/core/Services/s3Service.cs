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
    private string SanitizeFileName(string fileName)
    {
        // מנקה תווים לא חוקיים
        return string.Concat(fileName.Split(Path.GetInvalidFileNameChars()));
    }
    public S3Service(string awsAccessKey, string awsSecretKey, Amazon.RegionEndpoint region)
    {
        _s3Client = new AmazonS3Client(awsAccessKey, awsSecretKey, region);
    }
    public S3Service(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
      
    }

    public async Task<byte[]> DownloadFileAsync(string signedFileUrl)
    {
        // שימוש ב-URL חתום (כפי שקיבלת מ-API)
        var uri = new Uri(signedFileUrl);

        var key = Uri.UnescapeDataString(uri.AbsolutePath.TrimStart('/'));
        var fileName = Path.GetFileName(key); // מקבל רק את שם הקובץ, בלי פרמטרי חתימה
        fileName = SanitizeFileName(fileName);
        //Console.WriteLine("File Name: " + fileName);

        //Console.WriteLine($"Decoded Key: {key}");
        //Console.WriteLine($"------------------------- uri: {uri}");

        var request = new GetObjectRequest
        {
            BucketName = "devwork",  // bucket שאת משתמשת בו
            Key = key
        };

        using var response = await _s3Client.GetObjectAsync(request);
        using var memoryStream = new MemoryStream();
        await response.ResponseStream.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }


    public async Task<string> GeneratePreSignedUrlAsync(string fileName, HttpVerb verb)
    {

        Console.WriteLine("2222222222222222222");
        string cleanFileName = fileName.Trim().Replace(" ", "_"); // מחליף רווחים בקו תחתון
        cleanFileName = Uri.EscapeDataString(cleanFileName); // ממיר תווים מיוחדים
        var extension = Path.GetExtension(fileName).ToLower();
        var request = new GetPreSignedUrlRequest
        {
            BucketName ="devwork",
            Key = cleanFileName,
            Verb = verb,
            Expires = DateTime.UtcNow.AddMinutes(15),  
            ContentType = "application/octet-stream"
        };
      
        return _s3Client.GetPreSignedURL(request);
    }

    public async Task<string> GeneratePreSignedUrlForDownloadAsync(string fileName)
    {
        // יצירת בקשה ל-PreSigned URL עבור פעולה של GET
        var request = new GetPreSignedUrlRequest
        {
            BucketName = "devwork",  // שם ה-bucket
            Key = fileName,         // שם הקובץ ב-S3
            Verb = HttpVerb.GET,    // פעולה GET להורדה
            Expires = DateTime.UtcNow.AddMinutes(15),  // תוקף של 15 דקות
        };

        // הפקת ה-PreSigned URL
        string presignedUrl = _s3Client.GetPreSignedURL(request);

        return presignedUrl;
    }

}
