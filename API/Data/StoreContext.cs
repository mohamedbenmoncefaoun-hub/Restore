using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required  DbSet<Product> Products{ get; set; }
    public required DbSet<Basket> Baskets {get; set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>()
        .HasData(
          new IdentityRole {Id = "76fe60a5-200e-4d79-868f-6bdf5b6c5c39", ConcurrencyStamp="Member",Name = "Member", NormalizedName="MEMBER"},  
          new IdentityRole {Id = "45ffe11d-87d8-4644-8578-ffb4113d0be0",ConcurrencyStamp="Admin",Name = "Admin", NormalizedName="ADMIN"} 
        );
    }

}
