using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController(StoreContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {

            return await context.Products.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Product>> GetProducts(int id)
        {
            var product = await context.Products.FindAsync(id);
            
            if (product == null) return NotFound();
            return product;
        }
    }
}
