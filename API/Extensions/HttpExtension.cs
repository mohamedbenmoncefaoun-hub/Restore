using System;
using System.Text.Json;
using System.Text.Json.Schema;
using System.Text.Json.Serialization;
using API.RequestHelpers;
using Microsoft.CodeAnalysis;
using Microsoft.Net.Http.Headers;

namespace API.Extensions;

public static  class HttpExtension
{
public static void AddPaginationHeader(this HttpResponse response,PaginationMetaData metadata)
    {
        var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
          response.Headers.Append("Pagination",JsonSerializer.Serialize(metadata, options));
          response.Headers.Append(HeaderNames.AccessControlExposeHeaders,"Pagination");
    }
}
