using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : DbContext(options)
{
    public required  DbSet<Product> Products{ get; set; }
    public required DbSet<Basket> Baskets {get; set;}

    internal async Task Include(Func<object, object> value)
    {
        throw new NotImplementedException();
    }
}
